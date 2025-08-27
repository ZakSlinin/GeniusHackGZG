package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/ZakSlinin/GeniusHackGZG/auth/model"
	"github.com/jmoiron/sqlx"
	"strings"
)

type AuthRepository struct {
	db *sqlx.DB
}

func _NewAuthRepository(db *sqlx.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) CreateVolunteer(ctx context.Context, volunteer model.Volunteer) (string, error) {
	query := `INSERT INTO volunteer (username, password, email, events_visited, hours_of_help, history_of_activity, current_activity) VALUES ($1, $2, $3, NULL, NULL, NULL, NULL) RETURNING username`

	var username string
	err := r.db.QueryRowContext(ctx, query,
		volunteer.Username,
		volunteer.Password,
		volunteer.Email,
	).Scan(&username)

	if err != nil {
		return "", fmt.Errorf("failed to create volunteer: %w", err)
	}

	return username, nil
}

func (r *AuthRepository) FindVolunteer(ctx context.Context, username string) (*model.Volunteer, error) {
	_, err := r.db.ExecContext(ctx, "SELECT * FROM volunteer WHERE username = $1", username)

	if err != nil {
		return nil, err
	}

	return &model.Volunteer{Username: username}, nil
}

func (r *AuthRepository) UpdateVolunteer(ctx context.Context, volunteer model.Volunteer) (string, error) {
	// Determine selector: prefer ID, fallback to Username
	var whereClause string
	var whereArgs []interface{}
	argIndex := 1
	if volunteer.ID > 0 {
		whereClause = fmt.Sprintf("id = $%d", argIndex)
		whereArgs = append(whereArgs, volunteer.ID)
		argIndex++
	} else if volunteer.Username != "" {
		whereClause = fmt.Sprintf("username = $%d", argIndex)
		whereArgs = append(whereArgs, volunteer.Username)
		argIndex++
	} else {
		return "", fmt.Errorf("no selector provided: require non-zero id or non-empty username")
	}

	// Build dynamic SET clause only for provided fields
	setParts := make([]string, 0, 6)
	args := make([]interface{}, 0, 6)

	if volunteer.Password != "" {
		setParts = append(setParts, fmt.Sprintf("password = $%d", argIndex))
		args = append(args, volunteer.Password)
		argIndex++
	}
	if volunteer.Email != "" {
		setParts = append(setParts, fmt.Sprintf("email = $%d", argIndex))
		args = append(args, volunteer.Email)
		argIndex++
	}
	if volunteer.EventsVisited != 0 {
		setParts = append(setParts, fmt.Sprintf("events_visited = $%d", argIndex))
		args = append(args, volunteer.EventsVisited)
		argIndex++
	}
	if volunteer.HoursOfHelp != 0 {
		setParts = append(setParts, fmt.Sprintf("hours_of_help = $%d", argIndex))
		args = append(args, volunteer.HoursOfHelp)
		argIndex++
	}
	if len(volunteer.HistoryOfActivity) > 0 {
		b, err := json.Marshal(volunteer.HistoryOfActivity)
		if err != nil {
			return "", fmt.Errorf("marshal history_of_activity: %w", err)
		}
		setParts = append(setParts, fmt.Sprintf("history_of_activity = $%d", argIndex))
		args = append(args, string(b))
		argIndex++
	}
	if len(volunteer.CurrentActivity) > 0 {
		b, err := json.Marshal(volunteer.CurrentActivity)
		if err != nil {
			return "", fmt.Errorf("marshal current_activity: %w", err)
		}
		setParts = append(setParts, fmt.Sprintf("current_activity = $%d", argIndex))
		args = append(args, string(b))
		argIndex++
	}

	if len(setParts) == 0 {
		// Nothing to update
		return "", fmt.Errorf("no fields provided to update")
	}

	query := "UPDATE volunteer SET " + strings.Join(setParts, ", ") + " WHERE " + whereClause + " RETURNING username"
	// Order of args: set args first, then where args
	allArgs := append(args, whereArgs...)

	var updatedUsername string
	if err := r.db.QueryRowContext(ctx, query, allArgs...).Scan(&updatedUsername); err != nil {
		return "", err
	}

	return updatedUsername, nil
}

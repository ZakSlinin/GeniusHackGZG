package repository

import (
	"context"
	"fmt"
	"github.com/ZakSlinin/GeniusHackGZG/event/model"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jmoiron/sqlx"
)

type EventRepository struct {
	db *sqlx.DB
}

func NewEventRepository(db *sqlx.DB) *EventRepository { return &EventRepository{db: db} }

func (r *EventRepository) CreateEvent(ctx context.Context, name, category, createdBy string, date pgtype.Date, timeStart int, timeEnd int, location string, volunteerNeedCount int, shortDescription string, description string, volunteersGroups []interface{}, coordinator []interface{}, number string, email string, telegramUsername string) (string, error) {
	query := `INSERT INTO events (name, category, createdBy,  date, timeStart, timeEnd, location, volunteerNeedCount, shortDescription, description, volunteersGroups, coordinator, number, email, telegramUsername) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING event_id`

	var createdName string
	err := r.db.QueryRowContext(ctx, query, name, category, createdBy).Scan(&createdName)
	if err != nil {
		return "", fmt.Errorf("failed to create %s: %w", createdName, err)
	}

	return createdName, nil
}

func (r *EventRepository) GetEventsByCategory(ctx context.Context, category string) ([]model.Event, error) {
	rows, err := r.db.QueryContext(ctx, "SELECT * FROM events WHERE category = $1", category)
	if err != nil {
		return nil, fmt.Errorf("failed to get events by category %s: %w", category, err)
	}

	defer rows.Close()

	var events []model.Event

	for rows.Next() {
		var e model.Event
		if err := rows.Scan(&e.ID, &e.Name, &e.Category, &e.Date, &e.TimeStart, &e.TimeEnd, &e.Location, &e.VolunteerNeedCount, &e.ShortDescription, &e.Description, &e.VolunteersGroups, &e.Coordinator, &e.Number, &e.Email, &e.Category, &e.TelegramUsername); err != nil {
			return nil, err
		}
		events = append(events, e)
	}

	return events, nil
}

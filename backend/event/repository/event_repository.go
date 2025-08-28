package repository

import (
	"context"
	"fmt"
	"github.com/ZakSlinin/GeniusHackGZG/event/model"
	"github.com/jmoiron/sqlx"
	"time"
)

type EventRepository struct {
	db *sqlx.DB
}

func NewEventRepository(db *sqlx.DB) *EventRepository { return &EventRepository{db: db} }

func (r *EventRepository) CreateEvent(ctx context.Context, name, category, createdBy string, date time.Time, timeStart, timeEnd, location string, volunteerNeedCount int, shortDescription, description string, volunteersGroups, coordinator []byte, number, email, telegramUsername string) (int64, error) {
	query := `
        INSERT INTO events 
        (name, category, created_by, date, time_start, time_end, location, volunteer_need_count, short_description, description, volunteers_groups, coordinator, number, email, telegram_username) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) 
        RETURNING event_id
    `

	var eventID int64
	err := r.db.QueryRowContext(ctx, query,
		name, category, createdBy, date, timeStart, timeEnd, location,
		volunteerNeedCount, shortDescription, description, volunteersGroups,
		coordinator, number, email, telegramUsername,
	).Scan(&eventID)

	if err != nil {
		return 0, fmt.Errorf("failed to create event: %w", err)
	}
	return eventID, nil
}

func (r *EventRepository) GetEventsByCategory(ctx context.Context, category, location string) ([]model.Event, error) {
	var events []model.Event
	query := "SELECT * FROM events WHERE category = $1 AND location = $2"
	if err := r.db.SelectContext(ctx, &events, query, category, location); err != nil {
		return nil, fmt.Errorf("failed to get events by category %s and locate %d: %w", category, err)
	}
	return events, nil
}

func (r *EventRepository) GetAllEvents(ctx context.Context) ([]model.Event, error) {
	var events []model.Event
	query := "SELECT * FROM events"
	if err := r.db.SelectContext(ctx, &events, query); err != nil {
		return nil, fmt.Errorf("failed to get all events: %w", err)
	}
	return events, nil
}

package model

import (
	"database/sql"
	"encoding/json"
)

type Volunteer struct {
	ID                int              `json:"id" db:"id"`
	Username          string           `json:"username" db:"username"`
	Password          string           `json:"-" db:"password"`
	Email             string           `json:"email" db:"email"`
	EventsVisited     sql.NullInt64    `json:"events_visited" db:"events_visited"`
	HoursOfHelp       sql.NullInt64    `json:"hours_of_help" db:"hours_of_help"`
	HistoryOfActivity *json.RawMessage `json:"history_of_activity" db:"history_of_activity"`
	CurrentActivity   *json.RawMessage `json:"current_activity" db:"current_activity"`
}

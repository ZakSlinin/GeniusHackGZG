package model

import (
	"database/sql"
	"encoding/json"
)

type Organization struct {
	ID            int              `json:"id" db:"id"`
	Username      string           `json:"username" db:"username"`
	Password      string           `json:"-" db:"password"`
	Email         string           `json:"email" db:"email"`
	EventsCreated sql.NullInt64    `json:"events_created" db:"events_created"`
	HelpersCount  sql.NullInt64    `json:"helpers_count" db:"helpers_count"`
	HoursOfHelp   sql.NullInt64    `json:"hours_of_help" db:"hours_of_help"`
	Events        *json.RawMessage `json:"events" db:"events"`
}

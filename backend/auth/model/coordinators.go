package model

import (
	"database/sql"
	"encoding/json"
)

type Coordinator struct {
	ID                int              `json:"id" db:"id"`
	Username          string           `json:"username" db:"username"`
	Password          string           `json:"-" db:"password"`
	Email             string           `json:"email" db:"email"`
	EventsCoordinated sql.NullInt64    `json:"events_coordinated" db:"events_coordinated"`
	CurrentCoordinate *json.RawMessage `json:"current_coordinate" db:"current_coordinate"`
}

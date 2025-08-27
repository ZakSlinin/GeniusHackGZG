package model

type Coordinator struct {
	ID                int           `json:"id" db:"id"`
	Username          string        `json:"username" db:"username"`
	Password          string        `json:"-" db:"password"`
	Email             string        `json:"email" db:"email"`
	EventsCoordinated int           `json:"events_coordinated" db:"events_coordinated"`
	CurrentCoordinate []interface{} `json:"current_coordinate" db:"current_coordinate"`
}

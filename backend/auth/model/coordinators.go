package model

type Coordinator struct {
	ID                int           `json:"id"`
	UserID            int           `json:"user_id"`
	Username          string        `json:"username"`
	Password          string        `json:"-"`
	Email             string        `json:"email"`
	EventsCoordinated int           `json:"events_coordinated"`
	CurrentCoordinate []interface{} `json:"current_coordinate"`
}

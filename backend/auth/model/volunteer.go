package model

type Volunteer struct {
	ID                int           `json:"id" db:"id"`
	Username          string        `json:"username" db:"username"`
	Password          string        `json:"-" db:"password"`
	Email             string        `json:"email" db:"email"`
	EventsVisited     int           `json:"events_visited" db:"events_visited"`
	HoursOfHelp       int           `json:"hours_of_help" db:"hours_of_help"`
	HistoryOfActivity []interface{} `json:"history_of_activity" db:"history_of_activity"`
	CurrentActivity   []interface{} `json:"current_activity" db:"current_activity"`
}

package model

type Organization struct {
	ID            int           `json:"id" db:"id"`
	Username      string        `json:"username" db:"username"`
	Password      string        `json:"-" db:"password"`
	Email         string        `json:"email" db:"email"`
	EventsCreated int           `json:"events_created" db:"events_created"`
	HelpersCount  int           `json:"helpers_count" db:"helpers_count"`
	HoursOfHelp   int           `json:"hours_of_help" db:"hours_of_help"`
	Events        []interface{} `json:"events" db:"events"`
}

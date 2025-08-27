package model

type Organization struct {
	ID            int           `json:"id"`
	Password      string        `json:"-"`
	Email         string        `json:"email"`
	EventsCreated int           `json:"events_created"`
	HelpersCount  int           `json:"helpers_count"`
	HoursOfHelp   int           `json:"hours_of_help"`
	Events        []interface{} `json:"events"`
}

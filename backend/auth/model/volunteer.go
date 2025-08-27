package model

type Volunteer struct {
	ID                int           `json:"id"`
	Username          string        `json:"username"`
	Password          string        `json:"-"`
	Email             string        `json:"email"`
	EventsVisited     int           `json:"events_visited"`
	HoursOfHelp       int           `json:"hours_of_help"`
	HistoryOfActivity []interface{} `json:"history_of_activity"`
	CurrentActivity   []interface{} `json:"current_activity"`
}

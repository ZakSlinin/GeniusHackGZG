package model

import "time"

type Event struct {
	ID                 int       `json:"id" db:"id"`
	EventID            string    `json:"event_id" db:"event_id"`
	Name               string    `json:"name" db:"name"`
	Category           string    `json:"category" db:"category"`
	CreatedBy          string    `json:"created_by" db:"created_by"`
	Date               time.Time `json:"date" db:"date"`
	TimeStart          string    `json:"time_start" db:"time_start"`
	TimeEnd            string    `json:"time_end" db:"time_end"`
	Location           string    `json:"location" db:"location"`
	VolunteerNeedCount int       `json:"volunteer_need_count" db:"volunteer_need_count"`
	VolunteerCount     int       `json:"volunteer_count" db:"volunteer_count"`
	ShortDescription   string    `json:"short_description" db:"short_description"`
	Description        string    `json:"description" db:"description"`
	VolunteersGroups   []byte    `json:"volunteers_groups" db:"volunteers_groups"` // JSONB хранится как []byte
	Coordinator        []byte    `json:"coordinator" db:"coordinator"`             // JSONB хранится как []byte
	Number             string    `json:"number" db:"number"`
	Email              string    `json:"email" db:"email"`
	TelegramUsername   string    `json:"telegram_username" db:"telegram_username"`
}

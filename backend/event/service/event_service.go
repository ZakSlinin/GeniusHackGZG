package service

import (
	"context"
	"fmt"

	"github.com/ZakSlinin/GeniusHackGZG/event/model"
	"github.com/ZakSlinin/GeniusHackGZG/event/repository"
)

type EventService struct {
	repo *repository.EventRepository
}

func NewEventService(repo *repository.EventRepository) *EventService {
	return &EventService{repo: repo}
}
func (s *EventService) CreateEvent(ctx context.Context, event model.Event) (model.Event, error) {
	eventID, err := s.repo.CreateEvent(
		ctx,
		event.Name,
		event.Category,
		event.CreatedBy,
		event.Date,
		event.TimeStart,
		event.TimeEnd,
		event.Location,
		event.VolunteerNeedCount,
		event.ShortDescription,
		event.Description,
		event.VolunteersGroups,
		event.Coordinator,
		event.Number,
		event.Email,
		event.TelegramUsername,
	)
	if err != nil {
		return model.Event{}, fmt.Errorf("failed to create event: %w", err)
	}

	// Заполняем ID
	event.ID = int(eventID)
	return event, nil
}

func (s *EventService) GetEventsByCategory(ctx context.Context, category string, locate string) ([]model.Event, error) {
	events, err := s.repo.GetEventsByCategory(ctx, category, locate)
	if err != nil {
		return nil, fmt.Errorf("failed to get events: %w", err)
	}
	return events, nil
}

func (s *EventService) GetAllEvents(ctx context.Context) ([]model.Event, error) {
	events, err := s.repo.GetAllEvents(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get events: %w", err)
	}
	return events, nil
}

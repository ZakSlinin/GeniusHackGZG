package service

import (
	"context"
	"errors"
	"fmt"
	"github.com/ZakSlinin/GeniusHackGZG/auth/model"
	"github.com/ZakSlinin/GeniusHackGZG/auth/repository"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"os"
	"strings"
	"time"
)

type AuthService struct {
	repo *repository.AuthRepository
}

func NewAuthService(repo *repository.AuthRepository) *AuthService { return &AuthService{repo: repo} }

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func (s *AuthService) CreateVolunteer(ctx context.Context, volunteer model.Volunteer) (string, error) {
	newUsername, err := s.repo.CreateUser(ctx, volunteer.Username, volunteer.Password, volunteer.Email, "volunteer")
	if err != nil {
		return "", err
	}

	hashPassword, err := HashPassword(volunteer.Password)
	if err != nil {
		errors.New("failed to hash password")
	}

	volunteer.Password = hashPassword
	if _, err := s.repo.CreateUser(ctx, volunteer.Username, hashPassword, volunteer.Email, "volunteer"); err != nil {
		return "error to create volunteer", err
	}

	return newUsername, nil

	// Генерация JWT

	token, err := GenerateJWT(volunteer)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *AuthService) UpdateVolunteer(ctx context.Context, volunteer model.Volunteer) (string, error) {
	if volunteer.ID == 0 && volunteer.Username == "" {
		return "", fmt.Errorf("either ID or Username must be provided")
	}

	var where string
	var whereArgs []interface{}

	if volunteer.ID > 0 {
		where = "id = $1"
		whereArgs = []interface{}{volunteer.ID}
	} else {
		where = "username = $1"
		whereArgs = []interface{}{volunteer.Username}
	}

	if err := s.validateVolunteerUpdate(volunteer); err != nil {
		return "", err
	}

	username, err := s.repo.UpdateUser(ctx, "volunteer", volunteer, where, whereArgs)
	if err != nil {
		return "", fmt.Errorf("failed to update volunteer: %w", err)
	}

	return username, nil
}

// Валидация бизнес-правил
func (s *AuthService) validateVolunteerUpdate(volunteer model.Volunteer) error {
	// Проверка, что hours_of_help не отрицательное
	if volunteer.HoursOfHelp < 0 {
		return fmt.Errorf("hours_of_help cannot be negative")
	}

	// Проверка, что events_visited не отрицательное
	if volunteer.EventsVisited < 0 {
		return fmt.Errorf("events_visited cannot be negative")
	}

	// Дополнительные бизнес-правила можно добавить здесь
	return nil
}

func (s *AuthService) UpdateCoordinator(ctx context.Context, coordinator model.Coordinator) (string, error) {
	if coordinator.ID == 0 && coordinator.Username == "" {
		return "", fmt.Errorf("either ID or Username must be provided")
	}

	var where string
	var whereArgs []interface{}

	if coordinator.ID > 0 {
		where = "id = $1"
		whereArgs = []interface{}{coordinator.ID}
	} else {
		where = "username = $1"
		whereArgs = []interface{}{coordinator.Username}
	}

	if err := s.validateCoordinatorUpdate(coordinator); err != nil {
		return "", err
	}

	username, err := s.repo.UpdateUser(ctx, "coordinators", coordinator, where, whereArgs)
	if err != nil {
		return "", fmt.Errorf("failed to update coordinator: %w", err)
	}

	return username, nil
}

func (s *AuthService) validateCoordinatorUpdate(coordinator model.Coordinator) error {
	// Проверка, что events_coordinated не отрицательное
	if coordinator.EventsCoordinated < 0 {
		return fmt.Errorf("events_coordinated cannot be negative")
	}

	// Дополнительные проверки для координатора
	if coordinator.Email != "" {
		if !strings.Contains(coordinator.Email, "@") {
			return fmt.Errorf("invalid email format")
		}
	}

	return nil
}

func (s *AuthService) UpdateOrganization(ctx context.Context, organization model.Organization) (string, error) {
	if organization.ID == 0 {
		return "", fmt.Errorf("ID must be provided for organization")
	}

	where := "id = $1"
	whereArgs := []interface{}{organization.ID}

	if err := s.validateOrganizationUpdate(organization); err != nil {
		return "", err
	}

	// Для организации возвращаем email вместо username
	result, err := s.repo.UpdateUser(ctx, "organizations", organization, where, whereArgs)
	if err != nil {
		return "", fmt.Errorf("failed to update organization: %w", err)
	}

	return result, nil
}

func (s *AuthService) validateOrganizationUpdate(organization model.Organization) error {
	// Проверка бизнес-правил для организации
	if organization.EventsCreated < 0 {
		return fmt.Errorf("events_created cannot be negative")
	}

	if organization.HelpersCount < 0 {
		return fmt.Errorf("helpers_count cannot be negative")
	}

	if organization.HoursOfHelp < 0 {
		return fmt.Errorf("hours_of_help cannot be negative")
	}

	// Проверка email
	if organization.Email != "" {
		if !strings.Contains(organization.Email, "@") {
			return fmt.Errorf("invalid email format")
		}
	}

	return nil
}

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func GenerateJWT(volunteer model.Volunteer) (string, error) {
	claims := jwt.MapClaims{
		"username":            volunteer.Username,
		"email":               volunteer.Email,
		"events_visited":      volunteer.EventsVisited,
		"hours_of_help":       volunteer.HoursOfHelp,
		"history_of_activity": volunteer.HistoryOfActivity,
		"current_activity":    volunteer.CurrentActivity,
		"exp":                 time.Now().Add(time.Hour * 24).Unix(), // срок жизни в 24 часа
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func ParseJWT(tokenString string) (*jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) { return jwtSecret, nil })

	if err != nil {
		return nil, err
	}

	claims := token.Claims.(jwt.MapClaims)
	return &claims, nil
}

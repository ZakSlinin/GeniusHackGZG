package service

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/ZakSlinin/GeniusHackGZG/auth/model"
	"github.com/ZakSlinin/GeniusHackGZG/auth/repository"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
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
	// 1) Хешируем пароль
	hashPassword, err := HashPassword(volunteer.Password)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	volunteer.Password = hashPassword

	// 2) Создаём пользователя ОДИН РАЗ
	if _, err := s.repo.CreateUser(ctx, volunteer.Username, volunteer.Password, volunteer.Email, "volunteer"); err != nil {
		return "", err
	}

	// 3) Генерация JWT и возврат
	token, err := GenerateJWTForVolunteer(volunteer)
	if err != nil {
		return "", err
	}
	return token, nil
}

func (s *AuthService) GetUser(ctx context.Context, email, tableName string, userModel interface{}) error {
	// Вызов репозитория с передачей указателя на структуру
	err := s.repo.GetUser(ctx, email, tableName, userModel)
	if err != nil {
		return fmt.Errorf("failed to get user: %w", err)
	}

	return nil
}

func (s *AuthService) CreateCoordinator(ctx context.Context, coordinator model.Coordinator) (string, error) {
	// Хеширование пароля
	hashPassword, err := HashPassword(coordinator.Password)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	coordinator.Password = hashPassword

	// Создание пользователя в базе
	_, err = s.repo.CreateUser(ctx, coordinator.Username, coordinator.Password, coordinator.Email, "coordinators")
	if err != nil {
		return "", fmt.Errorf("failed to create coordinator: %w", err)
	}

	// Генерация JWT
	token, err := GenerateJWTForCoordinators(coordinator)
	if err != nil {
		return "", fmt.Errorf("failed to generate token: %w", err)
	}

	return token, nil
}

func (s *AuthService) CreateOrganization(ctx context.Context, organization model.Organization) (string, error) {
	// Хеширование пароля
	hashPassword, err := HashPassword(organization.Password)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	organization.Password = hashPassword

	// Создание в базе
	_, err = s.repo.CreateUser(ctx, organization.Username, organization.Password, organization.Email, "organizations")
	if err != nil {
		return "", fmt.Errorf("failed to create organization: %w", err)
	}

	// Генерация JWT для организации
	token, err := GenerateJWTForOrganization(organization)
	if err != nil {
		return "", fmt.Errorf("failed to generate token: %w", err)
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
	if volunteer.HoursOfHelp.Valid && volunteer.HoursOfHelp.Int64 < 0 {
		return fmt.Errorf("hours_of_help cannot be negative")
	}

	if volunteer.EventsVisited.Valid && volunteer.EventsVisited.Int64 < 0 {
		return fmt.Errorf("events_visited cannot be negative")
	}

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
	if coordinator.EventsCoordinated.Valid && coordinator.EventsCoordinated.Int64 < 0 {
		return fmt.Errorf("events_coordinated cannot be negative")
	}

	if coordinator.Email != "" && !strings.Contains(coordinator.Email, "@") {
		return fmt.Errorf("invalid email format")
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
	if organization.EventsCreated.Valid && organization.EventsCreated.Int64 < 0 {
		return fmt.Errorf("events_created cannot be negative")
	}

	if organization.HelpersCount.Valid && organization.HelpersCount.Int64 < 0 {
		return fmt.Errorf("helpers_count cannot be negative")
	}

	if organization.HoursOfHelp.Valid && organization.HoursOfHelp.Int64 < 0 {
		return fmt.Errorf("hours_of_help cannot be negative")
	}

	if organization.Email != "" && !strings.Contains(organization.Email, "@") {
		return fmt.Errorf("invalid email format")
	}

	return nil
}

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func GenerateJWTForVolunteer(volunteer model.Volunteer) (string, error) {
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

func GenerateJWTForCoordinators(coordinator model.Coordinator) (string, error) {
	claims := jwt.MapClaims{
		"username":           coordinator.Username,
		"email":              coordinator.Email,
		"events_coordinated": coordinator.EventsCoordinated,
		"current_coordinate": coordinator.CurrentCoordinate,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func GenerateJWTForOrganization(org model.Organization) (string, error) {
	claims := jwt.MapClaims{
		"org_id":   org.ID,
		"username": org.Username,
		"email":    org.Email,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
		"iat":      time.Now().Unix(),
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

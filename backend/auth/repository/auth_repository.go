package repository

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jmoiron/sqlx"
)

type AuthRepository struct {
	db *sqlx.DB
}

var (
	ErrConflict = errors.New("conflict")
)

func NewAuthRepository(db *sqlx.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) CreateUser(ctx context.Context, username, password, email, tableName string) (string, error) {
	var query string

	switch tableName {
	case "coordinators":
		query = `INSERT INTO coordinator (username, password, email, events_coordinated, current_coordinate) VALUES ($1, $2, $3, NULL, NULL) RETURNING username`
	case "volunteer":
		query = `INSERT INTO volunteer (username, password, email, events_visited, hours_of_help, history_of_activity, current_activity) VALUES ($1, $2, $3, NULL, NULL, NULL, NULL) RETURNING username`
	case "organization":
		query = `INSERT INTO organizations (username, password, email, events_created, helpers_count, hours_of_help, events) VALUES ($1, $2, $3, NULL, NULL, NULL, NULL) RETURNING username`
	default:
		return "", fmt.Errorf("unknown table: %s", tableName)
	}

	var createdUsername string
	err := r.db.QueryRowContext(ctx, query, username, password, email).Scan(&createdUsername)

	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			if pgErr.Code == "23505" {
				return "", ErrConflict
			}
		}
		return "", fmt.Errorf("failed to create %s: %w", tableName, err)
	}

	return createdUsername, nil
}

func (r *AuthRepository) GetUser(ctx context.Context, email, tableName string, dest interface{}) error {
	if tableName == "" || strings.ContainsAny(tableName, ";'\"`") {
		return fmt.Errorf("invalid table name provided")
	}

	query := fmt.Sprintf("SELECT * FROM %s WHERE email = $1", tableName)

	if err := r.db.SelectContext(ctx, dest, query, email); err != nil {
		return fmt.Errorf("failed to get user by email %s from table %s: %w", email, tableName, err)
	}

	return nil
}

func (r *AuthRepository) UpdateUser(ctx context.Context, tableName string, model interface{}, where string, whereArgs []interface{}) (string, error) {
	v := reflect.ValueOf(model)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}

	if v.Kind() != reflect.Struct {
		return "", fmt.Errorf("model must be a struct")
	}

	setParts := make([]string, 0)
	args := make([]interface{}, 0)
	argIndex := 1

	t := v.Type()
	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		fieldType := t.Field(i)

		// Пропускаем нулевые/пустые значения
		if isZero(field.Interface()) {
			continue
		}

		// Получаение имя колонки из тега или имени поля
		columnName := getColumnName(fieldType)
		setParts = append(setParts, fmt.Sprintf("%s = $%d", columnName, argIndex))

		// Обработка JSON поля
		if needsJSONMarshal(fieldType) {
			b, err := json.Marshal(field.Interface())
			if err != nil {
				return "", fmt.Errorf("marshal %s: %w", columnName, err)
			}
			args = append(args, string(b))
		} else {
			args = append(args, field.Interface())
		}
		argIndex++
	}

	if len(setParts) == 0 {
		return "", fmt.Errorf("no fields to update")
	}

	query := fmt.Sprintf("UPDATE %s SET %s WHERE %s RETURNING username", tableName, strings.Join(setParts, ", "), where)
	allArgs := append(args, whereArgs...)

	var username string
	err := r.db.QueryRowContext(ctx, query, allArgs...).Scan(&username)
	if err != nil {
		return "", fmt.Errorf("failed to update %s: %w", tableName, err)
	}

	return username, nil
}

// Вспомогательные функции
func isZero(value interface{}) bool {
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.String:
		return v.String() == ""
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int() == 0
	case reflect.Slice, reflect.Array, reflect.Map:
		return v.Len() == 0
	case reflect.Ptr:
		return v.IsNil()
	default:
		return v.IsZero()
	}
}

func getColumnName(field reflect.StructField) string {
	if tag := field.Tag.Get("db"); tag != "" {
		return tag
	}
	return strings.ToLower(field.Name)
}

func needsJSONMarshal(field reflect.StructField) bool {
	return field.Tag.Get("json") != ""
}

package main

import (
	"github.com/ZakSlinin/GeniusHackGZG/auth/middleware"
	handler2 "github.com/ZakSlinin/GeniusHackGZG/event/handler"
	repository2 "github.com/ZakSlinin/GeniusHackGZG/event/repository"
	service2 "github.com/ZakSlinin/GeniusHackGZG/event/service"
	"log"
	"os"

	"github.com/ZakSlinin/GeniusHackGZG/auth/handler"
	"github.com/ZakSlinin/GeniusHackGZG/auth/repository"
	"github.com/ZakSlinin/GeniusHackGZG/auth/service"
	"github.com/gin-gonic/gin"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

func main() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "postgres://postgres:9082@localhost:5432/genius_hack_db?sslmode=disable"
	}
	db, err := sqlx.Connect("pgx", dsn)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err.Error())
	}

	authRepo := repository.NewAuthRepository(db)
	authService := service.NewAuthService(authRepo)
	authHandler := handler.NewAuthHandler(authService)

	eventRepo := repository2.NewEventRepository(db)
	eventService := service2.NewEventService(eventRepo)
	eventHandler := handler2.NewEventHandler(eventService)

	r := gin.Default()

	auth := r.Group("/update")
	auth.Use(middleware.JWTAuthMiddleware)

	r.POST("register/organization", authHandler.RegisterOrganization)
	r.POST("register/volunteer", authHandler.RegisterVolunteer)
	r.POST("register/coordinators", authHandler.RegisterCoordinators)

	r.POST("update/volunteer", authHandler.UpdateVolunteer)
	r.POST("update/coordinators", authHandler.UpdateCoordinator)
	r.POST("update/organization", authHandler.UpdateOrganization)

	// эндпоинты на получение инфы о юзерах
	r.GET("get-user", authHandler.GetUser)

	// эндпоинты на эвенты
	r.POST("create-event", eventHandler.CreateEvent)
	r.GET("get-all-events", eventHandler.GetAllEvents)
	r.GET("events/category", eventHandler.GetEventsByCategory)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

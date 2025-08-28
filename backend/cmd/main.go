package main

import (
	"log"
	"os"

	"github.com/ZakSlinin/GeniusHackGZG/auth/handler"
	"github.com/ZakSlinin/GeniusHackGZG/auth/middleware"
	"github.com/ZakSlinin/GeniusHackGZG/auth/repository"
	"github.com/ZakSlinin/GeniusHackGZG/auth/service"

	handler2 "github.com/ZakSlinin/GeniusHackGZG/event/handler"
	repository2 "github.com/ZakSlinin/GeniusHackGZG/event/repository"
	service2 "github.com/ZakSlinin/GeniusHackGZG/event/service"

	"github.com/gin-contrib/cors"
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

	// --- Настройка CORS ---
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5174", "http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowCredentials = true
	config.MaxAge = 300

	// Применяем CORS мидлвар к нашему роутеру
	r.Use(cors.New(config))
	// --- Конец настройки CORS ---

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

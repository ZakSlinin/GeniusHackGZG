package main

import (
	"github.com/ZakSlinin/GeniusHackGZG/auth/handler"
	"github.com/ZakSlinin/GeniusHackGZG/auth/repository"
	"github.com/ZakSlinin/GeniusHackGZG/auth/service"
	"github.com/gin-gonic/gin"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
	"log"
	"os"
)

func main() {
	db, err := sqlx.Connect("pgx", os.Getenv("postgres://postgres:9082@localhost:5432/genius_hack_db?sslmode=disable"))
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err.Error())
	}

	authRepo := repository.NewAuthRepository(db)
	authService := service.NewAuthService(authRepo)
	authHandler := handler.NewAuthHandler(authService)

	r := gin.Default()
	r.POST("register/organization", authHandler.RegisterOrganization)
	r.POST("register/volunteer", authHandler.RegisterVolunteer)
	r.POST("register/coordinators", authHandler.RegisterCoordinators)

	r.POST("update/volunteer", authHandler.UpdateVolunteer)
	r.POST("update/coordinators", authHandler.UpdateCoordinator)
	r.POST("update/organization", authHandler.UpdateOrganization)

	r.Run(":8080")
}

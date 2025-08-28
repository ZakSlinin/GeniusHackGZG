package handler

import (
	"net/http"

	"github.com/ZakSlinin/GeniusHackGZG/auth/model"
	"github.com/ZakSlinin/GeniusHackGZG/auth/service"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	service *service.AuthService
}

func NewAuthHandler(s *service.AuthService) *AuthHandler { return &AuthHandler{service: s} }

func (h *AuthHandler) RegisterOrganization(c *gin.Context) {
	var org model.Organization
	if err := c.ShouldBindJSON(&org); err != nil {
		c.JSON(http.StatusBadRequest, "Invalid request body")
		return
	}

	token, err := h.service.CreateOrganization(c.Request.Context(), org)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

func (h *AuthHandler) RegisterVolunteer(c *gin.Context) {
	var vol model.Volunteer
	if err := c.ShouldBindJSON(&vol); err != nil {
		c.JSON(http.StatusBadRequest, "Invalid request body")
		return
	}

	token, err := h.service.CreateVolunteer(c.Request.Context(), vol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

func (h *AuthHandler) RegisterCoordinators(c *gin.Context) {
	var coordinator model.Coordinator
	if err := c.ShouldBindJSON(&coordinator); err != nil {
		c.JSON(http.StatusBadRequest, "Invalid request body")
		return
	}

	token, err := h.service.CreateCoordinator(c.Request.Context(), coordinator)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

func (h *AuthHandler) UpdateVolunteer(c *gin.Context) {
	var volunteer model.Volunteer
	if err := c.ShouldBindJSON(&volunteer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	username, err := h.service.UpdateVolunteer(c.Request.Context(), volunteer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Volunteer updated successfully",
		"username": username,
	})
}

func (h *AuthHandler) GetUser(c *gin.Context) {
	email := c.Query("email")
	table := c.Query("tableName")
	if email == "" || table == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email and table query params are required"})
		return
	}

	var userModel interface{}
	switch table {
	case "coordinator":
		userModel = &[]model.Coordinator{}
	case "organization":
		userModel = &[]model.Organization{}
	case "volunteer":
		userModel = &[]model.Volunteer{}
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid table name provided"})
		return
	}

	err := h.service.GetUser(c.Request.Context(), email, table, userModel)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": userModel})
}

func (h *AuthHandler) UpdateCoordinator(c *gin.Context) {
	var coordinator model.Coordinator
	if err := c.ShouldBindJSON(&coordinator); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	username, err := h.service.UpdateCoordinator(c.Request.Context(), coordinator)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Coordinator updated successfully",
		"username": username,
	})
}
func (h *AuthHandler) UpdateOrganization(c *gin.Context) {
	var organization model.Organization
	if err := c.ShouldBindJSON(&organization); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	result, err := h.service.UpdateOrganization(c.Request.Context(), organization)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Organization updated successfully",
		"result":  result,
	})
}

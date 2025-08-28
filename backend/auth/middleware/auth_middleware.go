package middleware

import (
	"net/http"
	"strings"

	"github.com/ZakSlinin/GeniusHackGZG/auth/service"
	"github.com/gin-gonic/gin"
)

func JWTAuthMiddleware(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
		c.Abort()
		return
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		c.Abort()
		return
	}

	claims, err := service.ParseJWT(parts[1])
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		c.Abort()
		return
	}

	if claims != nil {
		c.Set("claims", *claims)
		if userID, ok := (*claims)["user_id"]; ok {
			c.Set("user_id", userID)
		}
	}

	c.Next()
}

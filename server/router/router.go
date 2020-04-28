package router

import (
	"fmt"

	"../middleware"
	"github.com/gorilla/mux"
)

// Router main router for server
func Router() *mux.Router {
	router := mux.NewRouter()

	fmt.Println("Initializing router...")
	router.HandleFunc(
		"/api/users/count",
		middleware.GetUserCount).Methods("GET", "OPTIONS")

	router.HandleFunc(
		"/api/user/{id}/status",
		middleware.GetUserStatus).Methods("GET", "OPTIONS")

	router.HandleFunc(
		"/api/user/{id}/workspace/projects",
		middleware.GetWorkspaceCollection).Methods("GET", "OPTIONS")

	return router
}

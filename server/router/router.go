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

	// router.HandleFunc(
	// 	"/api/user/{id}/status",
	// 	middleware.GetUserStatus).Methods("GET", "OPTIONS")

	router.HandleFunc(
		"/api/user/{id}/workspace/projects",
		middleware.GetWorkspaceCollection).Methods("GET", "OPTIONS")

	router.HandleFunc(
		"/api/user/{id}/persona/skills",
		middleware.GetPersonaSkills).Methods("GET", "OPTIONS")

	router.HandleFunc(
		"/api/user/{id}/learn/resources",
		middleware.GetLearningResources).Methods("GET", "OPTIONS")

	router.HandleFunc(
		"/api/user/{id}/code/submit/{language}",
		middleware.PostCodeSubmission).Methods("POST", "OPTIONS")

	return router
}

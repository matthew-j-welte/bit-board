package router

import (
	"context"
	"net/http"
	"os"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/gorilla/mux"
	"github.com/matthew-j-welte/bit-board/server/middleware"
)

var db *mongo.Database
var ctx context.Context

type handler func(*mongo.Database, http.ResponseWriter, *http.Request)
type route struct {
	URI         string
	RESTMethods []string
	Handler     handler
}

func init() {
	db = middleware.MongoDatabase()
	log.SetOutput(os.Stdout)
}

// Router main router for server
func Router() *mux.Router {
	router := mux.NewRouter()
	log.Info("Initializing router...")

	// User route handlers
	userCountRoute := route{
		URI:         "/api/users/count",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetUserCount}
	handleRoute(router, userCountRoute)

	userLogin := route{
		URI:         "/api/user/login",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.GetUserID}
	handleRoute(router, userLogin)

	userWorkspaceRoute := route{
		URI:         "/api/user/{id}/workspace/projects",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetWorkspaceCollection}
	handleRoute(router, userWorkspaceRoute)

	userSkillsRoute := route{
		URI:         "/api/user/{id}/persona/skills",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetPersonaSkills}
	handleRoute(router, userSkillsRoute)

	userCodeSubmissionRoute := route{
		URI:         "/api/user/{id}/code/submit/{language}",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.PostCodeSubmission}
	handleRoute(router, userCodeSubmissionRoute)

	newUserRoute := route{
		URI:         "/api/user/new",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.UserSubmission}
	handleRoute(router, newUserRoute)

	newProjectRoute := route{
		URI:         "/api/user/{id}/workspace/project/new",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.NewProjectSubmission}
	handleRoute(router, newProjectRoute)

	// Resource route handlers
	resourcesLearningRoute := route{
		URI:         "/api/user/{id}/learn/resources",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetLearningResources}
	handleRoute(router, resourcesLearningRoute)

	newResourceSuggestionRoute := route{
		URI:         "/api/user/{id}/learn/resource/new",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.NewResourceSuggestion}
	handleRoute(router, newResourceSuggestionRoute)

	log.Info("Router Initialized")
	return router
}

func handleRoute(router *mux.Router, routeInfo route) {
	router.HandleFunc(
		routeInfo.URI,
		func(w http.ResponseWriter, r *http.Request) {
			routeInfo.Handler(db, w, r)
		}).Methods(routeInfo.RESTMethods...)
}

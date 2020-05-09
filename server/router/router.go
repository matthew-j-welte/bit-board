package router

import (
	"context"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"

	"../middleware"
	"../middleware/collections"
	"github.com/gorilla/mux"
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
}

// Router main router for server
func Router() *mux.Router {
	router := mux.NewRouter()
	fmt.Println("Initializing router...")

	userCountRoute := route{
		URI:         "/api/users/count",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     collections.GetUserCount}
	handleRoute(router, userCountRoute)

	userWorkspaceRoute := route{
		URI:         "/api/user/{id}/workspace/projects",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     collections.GetWorkspaceCollection}
	handleRoute(router, userWorkspaceRoute)

	userSkillsRoute := route{
		URI:         "/api/user/{id}/persona/skills",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     collections.GetPersonaSkills}
	handleRoute(router, userSkillsRoute)

	userCodeSubmissionRoute := route{
		URI:         "/api/user/{id}/code/submit/{language}",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     collections.PostCodeSubmission}
	handleRoute(router, userCodeSubmissionRoute)

	resourcesLearningRoute := route{
		URI:         "/api/user/{id}/learn/resources",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     collections.GetLearningResources}
	handleRoute(router, resourcesLearningRoute)

	return router
}

func handleRoute(router *mux.Router, routeInfo route) {
	router.HandleFunc(
		routeInfo.URI,
		func(w http.ResponseWriter, r *http.Request) {
			routeInfo.Handler(db, w, r)
		}).Methods(routeInfo.RESTMethods...)
}

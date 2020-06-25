package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/gorilla/mux"
	"github.com/matthew-j-welte/bit-board/server/database/collections"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/mongo"
)

const userCollectionName = "users"

// GetUserCount get the current signed up user count
func GetUserCount(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	contextLogger.Info("Counting available users")

	count, err := collections.CountUsers()
	if err != nil {
		log.WithField("error", err).Error("Error when getting user count")
	}
	contextLogger.WithField("count", count).Info("Retrieved user count")
	json.NewEncoder(w).Encode(count)
}

// GetUserID get the current signed up user count
func GetUserID(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	contextLogger.Info("Retrieving User ID")

	var user = users.User{}
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		contextLogger.WithField("error", err).Error("A Decode error occured")
	}

	id, err := collections.GetUserID(user)
	if err != nil {
		contextLogger.WithField("error", err).Error("DB retrieval error occured")
	}
	contextLogger.WithField("ID", id).Error("Retrieved User ID")
	json.NewEncoder(w).Encode(id)
}

// GetEditorConfigurations get all code editor confs for a user
func GetEditorConfigurations(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)

	params := mux.Vars(r)
	id := params["id"]
	contextLogger = contextLogger.WithField("user", id)
	contextLogger.Info("Getting saved editor configurations for user")

	result, err := collections.GetEditorConfigurations(id)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when retrieving editor configurations")
	}
	json.NewEncoder(w).Encode(result)
}

// GetPersonaSkills collects the persona skill info
func GetPersonaSkills(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)

	params := mux.Vars(r)
	id := params["id"]
	contextLogger = contextLogger.WithField("user", id)
	contextLogger.Info("Retrieving Persona Skills")

	result, err := collections.GetUserSkills(id)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when retrieving skills")
	}
	json.NewEncoder(w).Encode(result)
}

// PostCodeSubmission accepts code and runs it
func PostCodeSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)

	params := mux.Vars(r)
	id := params["id"]
	contextLogger = contextLogger.WithField("user", id)
	contextLogger.Info("Posting code submission")

	var codeContents users.Submission
	_ = json.NewDecoder(r.Body).Decode(&codeContents)
	fmt.Println(codeContents)
	fmt.Println(codeContents.Code["main.py"])
	json.NewEncoder(w).Encode(true)
}

// UserSubmission creates a new user
func UserSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	contextLogger.Info("Creating a new user")

	var user = users.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}

	insertID, err := collections.CreateUser(user)
	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}
	contextLogger.WithField("user", insertID).Info("New user created")
	json.NewEncoder(w).Encode(insertID)
}

// NewEditorConfigSubmission creates a new editor configuration for a user
func NewEditorConfigSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)

	params := mux.Vars(r)
	id := params["id"]
	contextLogger = contextLogger.WithField("user", id)
	contextLogger.Info("Adding new Code editor configuraiton to user document")

	var newEditorConfiguration = users.CodeEditorConfiguration{}
	err := json.NewDecoder(r.Body).Decode(&newEditorConfiguration)

	editorID, err := collections.CreateEditorConfiguration(newEditorConfiguration, id)
	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}
	contextLogger.WithField("editorConfigID", editorID).Info("Successfully created editor configuration")
	json.NewEncoder(w).Encode(editorID)
}

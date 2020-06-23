package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/gorilla/mux"
	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/collections"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const userCollectionName = "users"

// GetUserCount get the current signed up user count
func GetUserCount(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	contextLogger := log.WithFields(log.Fields{"action": "COUNT"})
	contextLogger.Info("Counting available users")

	count, err := database.CountRecords(db.Collection(userCollectionName))
	if err != nil {
		log.WithField("error", err).Error("Error when getting user count")
	}
	contextLogger.WithField("count", count).Info("Retrieved user count")
	json.NewEncoder(w).Encode(count)
}

// GetUserID get the current signed up user count
func GetUserID(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	contextLogger := log.WithFields(log.Fields{"action": "READ"})
	contextLogger.Info("Retrieving User ID")

	var userLogin = users.UserLogin{}
	err := json.NewDecoder(r.Body).Decode(&userLogin)
	if err != nil {
		contextLogger.WithField("error", err).Error("A Decode error occured")
	}

	id, err := database.GetIDFromValue(
		db.Collection(userCollectionName), bson.M{
			"username": userLogin.Username,
			"password": userLogin.Password})

	if err != nil {
		contextLogger.WithField("error", err).Error("DB retrieval error occured")
	}
	contextLogger.WithField("ID", id).Error("Retrieved User ID")
	json.NewEncoder(w).Encode(id)
}

// GetWorkspaceCollection get the collection of projects for a users workspace
func GetWorkspaceCollection(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	contextLogger := log.WithFields(log.Fields{"action": "READ", "user": id})
	contextLogger.Info("Getting project for User Workspace")

	result, err := database.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		id, bson.D{{"_id", 0}, {"projects", 1}})

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when retrieving projects")
	}
	json.NewEncoder(w).Encode(result["projects"])
}

// GetEditorConfigurations get all code editor confs for a user
func GetEditorConfigurations(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	contextLogger := log.WithFields(log.Fields{"action": "READ", "user": id})
	contextLogger.Info("Getting saved editor configurations for user")

	result, err := database.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		id, bson.D{{"_id", 0}, {"editorconfs", 1}})

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when retrieving editor configurations")
	}
	json.NewEncoder(w).Encode(result["editorconfs"])
}

// GetPersonaSkills collects the persona skill info
func GetPersonaSkills(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	contextLogger := log.WithFields(log.Fields{"action": "READ", "user": id})
	contextLogger.Info("Retrieving Persona Skills")

	result, err := database.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		id, bson.D{{"_id", 0}, {"skills", 1}})

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when retrieving skills")
	}

	json.NewEncoder(w).Encode(result["skills"])
}

// PostCodeSubmission accepts code and runs it
func PostCodeSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	// lang := params["language"]
	contextLogger := log.WithFields(log.Fields{"action": "READ", "user": id})
	contextLogger.Info("Posting code submission")

	var codeContents users.Submission
	_ = json.NewDecoder(r.Body).Decode(&codeContents)
	fmt.Println(codeContents)
	fmt.Println(codeContents.Code["main.py"])
	json.NewEncoder(w).Encode(true)
}

// UserSubmission creates a new user
func UserSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	contextLogger := log.WithFields(log.Fields{"action": "CREATE"})
	contextLogger.Info("Creating a new user")

	var userSignup = users.User{}
	err := json.NewDecoder(r.Body).Decode(&userSignup)

	contextLogger.Info(userSignup)
	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}

	objectID, err := collections.CreateUser(userSignup)
	res := map[string]string{
		"_id": objectID}

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
		res["error"] = err.Error()
	} else {
		contextLogger.WithField("user", objectID).Info("New user created")
	}
	json.NewEncoder(w).Encode(res)
}

// NewEditorConfigSubmission creates a new editor configuration for a user
func NewEditorConfigSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	contextLogger := log.WithFields(log.Fields{"action": "UPDATE", "user": id})
	contextLogger.Info("Adding new Code editor configuraiton to user document")
	oid := primitive.NewObjectID()

	var newEditorConfiguration = users.CodeEditorConfiguration{ID: oid}
	err := json.NewDecoder(r.Body).Decode(&newEditorConfiguration)

	success, err := collections.CreateEditorConfiguration(
		db.Collection(userCollectionName),
		newEditorConfiguration, id)

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}
	contextLogger.WithField("editorConfigID", oid.Hex()).Info("Successfully created editor configuration")
	json.NewEncoder(w).Encode(success)
}

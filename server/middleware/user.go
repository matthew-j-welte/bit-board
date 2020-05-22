package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/gorilla/mux"
	"github.com/matthew-j-welte/bit-board/server/middleware/dataaccess"
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

	count, err := dataaccess.CountRecords(db.Collection(userCollectionName))
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
		contextLogger.WithField("error", err).Error("An Error occured")
	}

	id, err := dataaccess.GetIDFromValue(
		db.Collection(userCollectionName), bson.M{
			"username": userLogin.Username,
			"password": userLogin.Password})

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
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

	fmt.Printf("Getting Workspace projects for UserID: %s\n", id)

	result, err := dataaccess.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		id, bson.D{{"_id", 0}, {"projects", 1}})

	if err != nil {
		log.Printf("Error when getting workspace: %s", err)
	}
	json.NewEncoder(w).Encode(result["projects"])
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

	fmt.Printf("Getting Persona Skills for UserID: %s\n", id)

	result, err := dataaccess.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		id, bson.D{{"_id", 0}, {"skills", 1}})

	if err != nil {
		log.Printf("Error when getting user skills: %s", err)
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
	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}

	objectID, err := dataaccess.CreateUser(db.Collection(userCollectionName), userSignup)
	res := map[string]string{
		"_id": objectID}

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
		res["error"] = err.Error()
	} else {
		log.WithField("user", objectID).Info("New user created")
	}
	json.NewEncoder(w).Encode(res)
}

// NewProjectSubmission creates a new project
func NewProjectSubmission(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	contextLogger := log.WithFields(log.Fields{"action": "UPDATE", "user": id})
	contextLogger.Info("Adding new project to user")

	oid := primitive.NewObjectID()
	var newProject = users.Project{ID: oid}
	err := json.NewDecoder(r.Body).Decode(&newProject)

	success, err := dataaccess.CreateProject(
		db.Collection(userCollectionName),
		newProject, id)

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}
	contextLogger.WithField("projID", oid.Hex()).Info("Successfully created project")
	json.NewEncoder(w).Encode(success)
}

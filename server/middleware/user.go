package middleware

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/matthew-j-welte/bit-board/server/dataaccess"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const userCollectionName = "users"

// GetUserCount get the current signed up user count
func GetUserCount(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	count, err := dataaccess.CountRecords(db.Collection(userCollectionName))
	if err != nil {
		log.Printf("Error when getting user count: %s", err)
	}
	json.NewEncoder(w).Encode(count)
}

// GetUserID get the current signed up user count
func GetUserID(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	name := params["name"]

	id, err := dataaccess.GetIDFromValue(
		db.Collection(userCollectionName), bson.D{{"name", name}})

	if err != nil {
		log.Printf("Error when retrieving userId: %s", err)
	}
	json.NewEncoder(w).Encode(id)
}

// GetWorkspaceCollection get the collection of projects for a users workspace
func GetWorkspaceCollection(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
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
	lang := params["language"]

	fmt.Println(id)
	fmt.Println(lang)

	var codeContents users.Submission
	_ = json.NewDecoder(r.Body).Decode(&codeContents)
	fmt.Println(codeContents)
	fmt.Println(codeContents.Code["main.py"])
	json.NewEncoder(w).Encode(true)
}

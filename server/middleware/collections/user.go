package collections

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"../../models/users"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const userCollectionName = "users"

// GetUserCount get the current signed up user count
func GetUserCount(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userCount, err := db.Collection(userCollectionName).CountDocuments(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(userCount)
	json.NewEncoder(w).Encode(userCount)
}

// GetWorkspaceCollection get the collection of projects for a users workspace
func GetWorkspaceCollection(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting status for ID:")
	fmt.Println(id)

	var result bson.M
	err := db.Collection(userCollectionName).FindOne(
		context.Background(),
		bson.D{{"_id", id}},
		options.FindOne().SetProjection(bson.D{{"_id", 0}, {"projects", 1}})).Decode(&result)

	if err != nil {
		log.Fatal(err)
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
	fmt.Println("Getting skills for ID:")
	fmt.Println(id)

	var result bson.M
	err := db.Collection(userCollectionName).FindOne(
		context.Background(),
		bson.D{{"_id", id}},
		options.FindOne().SetProjection(bson.D{{"_id", 0}, {"skills", 1}})).Decode(&result)

	if err != nil {
		log.Fatal(err)
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

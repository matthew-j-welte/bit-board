package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"../models/users"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const mongoURI = "mongodb://localhost:27018"
const dbName = "bitboard-dev"

var userCollection *mongo.Collection
var resourceCollection *mongo.Collection
var ctx context.Context

func init() {
	ctx, _ = context.WithTimeout(context.Background(), 20*time.Second)
	clientOptions := options.Client().ApplyURI(mongoURI)

	// connect to MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")

	userCollection = client.Database(dbName).Collection("users")
	resourceCollection = client.Database(dbName).Collection("resources")
}

// GetUserCount get the current signed up user count
func GetUserCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userCount, err := userCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(userCount)
	json.NewEncoder(w).Encode(userCount)
}

// GetWorkspaceCollection get the collection of projects for a users workspace
func GetWorkspaceCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting status for ID:")
	fmt.Println(id)

	var result bson.M
	err := userCollection.FindOne(
		context.Background(),
		bson.D{{"_id", id}},
		options.FindOne().SetProjection(bson.D{{"_id", 0}, {"projects", 1}})).Decode(&result)

	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(result["projects"])
}

// GetPersonaSkills collects the persona skill info
func GetPersonaSkills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting skills for ID:")
	fmt.Println(id)

	var result bson.M
	err := userCollection.FindOne(
		context.Background(),
		bson.D{{"_id", id}},
		options.FindOne().SetProjection(bson.D{{"_id", 0}, {"skills", 1}})).Decode(&result)

	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(result["skills"])
}

// GetLearningResources collects the persona skill info
func GetLearningResources(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting resources for ID:")
	fmt.Println(id)

	var resources []bson.M

	cur, err := resourceCollection.Find(
		context.Background(), bson.D{})

	if err != nil {
		log.Fatal(err)
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		resources = append(resources, result)

	}

	json.NewEncoder(w).Encode(resources)
}

// PostCodeSubmission accepts code and runs it
func PostCodeSubmission(w http.ResponseWriter, r *http.Request) {
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

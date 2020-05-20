package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/matthew-j-welte/bit-board/server/middleware/dataaccess"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const resourceCollectionName = "resources"

// GetLearningResources collects the persona skill info
func GetLearningResources(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.WriteHeader(http.StatusOK)

	resources, err := getLearningResources(db.Collection(resourceCollectionName))
	if err != nil {
		log.Printf("An error occured: %s", err)
		w.WriteHeader(http.StatusPartialContent)
	}
	json.NewEncoder(w).Encode(resources)
}

// NewResourceSuggestion creates a new suggestion for a learning resource
func NewResourceSuggestion(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	reqBody := map[string]string{}
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	fmt.Println(reqBody)
	fmt.Println(err)
	json.NewEncoder(w).Encode(true)
}

func getLearningResources(coll *mongo.Collection) ([]bson.M, error) {
	cur, err := dataaccess.GetResources(coll)
	defer cur.Close(context.Background())
	if err != nil {
		return nil, cur.Err()
	}

	var resources []bson.M
	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			return resources, cur.Err()
		}
		resources = append(resources, result)
	}
	return resources, cur.Err()
}

package collections

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const resourceCollectionName = "resources"

// GetLearningResources collects the persona skill info
func GetLearningResources(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting resources for ID:")
	fmt.Println(id)

	var resources []bson.M

	cur, err := db.Collection(resourceCollectionName).Find(
		context.Background(),
		bson.D{})

	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		resources = append(resources, result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	defer cur.Close(context.Background())

	json.NewEncoder(w).Encode(resources)
}

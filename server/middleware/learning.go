package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"./dataaccess"
	mwareutils "./utils"
	"github.com/gorilla/mux"
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

	cur, err := dataaccess.GetResources(db.Collection(resourceCollectionName))
	if err != nil {
		log.Fatal(err)
	}

	resources := mwareutils.DecodeAll(cur)
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	defer cur.Close(context.Background())

	json.NewEncoder(w).Encode(resources)
}

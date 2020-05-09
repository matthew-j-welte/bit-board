package middleware

import (
	"context"
	"encoding/json"
	"fmt"
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
	fmt.Printf("Getting Learning Resources for ID: %s\n", id)

	cur := dataaccess.GetResources(db.Collection(resourceCollectionName))
	resources := mwareutils.DecodeAll(cur)
	defer cur.Close(context.Background())

	json.NewEncoder(w).Encode(resources)
}

package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/matthew-j-welte/bit-board/server/middleware/dataaccess"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const resourceCollectionName = "resources"
const suggestedResourceCollectionName = "suggested-resources"

// GetLearningResources collects the persona skill info
func GetLearningResources(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.WriteHeader(http.StatusOK)
	contextLogger := log.WithFields(log.Fields{"action": "READ"})

	resources, err := getLearningResources(db.Collection(resourceCollectionName))
	if err != nil {
		contextLogger.WithField("error", err).Error("An error occured")
		w.WriteHeader(http.StatusPartialContent)
	}
	contextLogger.WithField("retrieved", len(resources)).Info("Successfully retrived resources")
	json.NewEncoder(w).Encode(resources)
}

// NewResourceSuggestion creates a new suggestion for a learning resource
func NewResourceSuggestion(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["userId"]
	contextLogger := log.WithFields(log.Fields{"action": "CREATE", "user": id})
	contextLogger.Info("Creating new resource suggestion")

	oid, err := primitive.ObjectIDFromHex(id)
	var resourceSuggestion = resources.ResourceSuggestion{Poster: oid}
	err = json.NewDecoder(r.Body).Decode(&resourceSuggestion)

	insertID, err := dataaccess.CreateResourceSuggestion(
		db.Collection(suggestedResourceCollectionName),
		resourceSuggestion)

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when posting suggestion")
	}
	contextLogger.WithField("insertId", insertID).Info("Successfully created resource suggestion")
	json.NewEncoder(w).Encode(insertID)
}

// IncrementResourceValue incremements the views associated with a resource
func IncrementResourceValue(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id := params["id"]
	field := params["field"]
	contextLogger := log.WithFields(log.Fields{"action": "INCREMENT", "field": field, "resource": id})
	contextLogger.Info("Incrementing Value")

	updateID, err := dataaccess.IncrementField(db.Collection(resourceCollectionName), id, field)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when incrementing resource value")
	}
	contextLogger.WithField("updateID", updateID).Info("Successfully incremented resource value")
	json.NewEncoder(w).Encode(true)
}

// IncrementResourcePostValue incremements the views associated with a resource
func IncrementResourcePostValue(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	resourceID := params["id"]
	postID := params["postID"]
	field := params["field"]

	contextLogger := log.WithFields(log.Fields{
		"action": "INCREMENT", "field": field, "resource": resourceID, "postID": postID})

	contextLogger.Info("Incrementing Value on Resource Post")
	updateID, err := dataaccess.IncrementFieldInObjectArray(db.Collection(resourceCollectionName), id, field)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when incrementing resource value")
	}
	contextLogger.WithField("updateID", updateID).Info("Successfully incremented resource value")
	json.NewEncoder(w).Encode(true)
}

// NewPostOnResource adds a post to a learning resource
func NewPostOnResource(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)

	resourceID := params["id"]
	var body = make(map[string]string)
	json.NewDecoder(r.Body).Decode(&body)
	userID := body["userID"]
	userOID, err := primitive.ObjectIDFromHex(userID)
	contextLogger := log.WithFields(log.Fields{"action": "NEW-RESOURCE-POST", "submittedBy": userID, "resource": resourceID})
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when decoding body")
	}
	userInfo, err := dataaccess.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		userID,
		bson.D{{"_id", 0}, {"fname", 1}, {"lname", 1}, {"image", 1}})

	fullname := userInfo["fname"].(string) + " " + userInfo["lname"].(string)
	imageURL := userInfo["image"].(string)
	oid := primitive.NewObjectID()

	var post = resources.ResourcePost{
		ID:           oid,
		UserID:       userOID,
		Content:      body["content"],
		Posted:       time.Now().Unix(),
		FullName:     fullname,
		ProfileImage: imageURL}
	contextLogger.Info("Attemting to add post to resource")
	success, err := dataaccess.AddProjectToResource(
		db.Collection(resourceCollectionName), post, resourceID)

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when adding new post to resource")
	}
	contextLogger.WithField("success", success).Info("Successfully added post to resource")
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

package middleware

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/collections"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const resourceCollectionName = "resources"
const suggestedResourceCollectionName = "suggested-resources"

// GetLearningResources collects the persona skill info
func GetLearningResources(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	resources, err := collections.GetResources()
	if err != nil {
		contextLogger.WithField("error", err).Error("An error occured")
	}
	contextLogger.WithField("retrieved", len(resources)).Info("Successfully retrived resources")
	json.NewEncoder(w).Encode(resources)
}

// NewResourceSuggestion creates a new suggestion for a learning resource
func NewResourceSuggestion(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)
	userID := params["userId"]
	contextLogger = contextLogger.WithField("user", userID)
	contextLogger.Info("Creating new resource suggestion")

	var resourceSuggestion = resources.ResourceSuggestion{}
	err := json.NewDecoder(r.Body).Decode(&resourceSuggestion)

	insertID, err := collections.CreateResourceSuggestion(resourceSuggestion, userID)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when posting suggestion")
	}
	contextLogger.WithField("insertId", insertID).Info("Successfully created resource suggestion")
	json.NewEncoder(w).Encode(insertID)
}

// IncrementResourceValue incremements the views associated with a resource
func IncrementResourceValue(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)
	id := params["id"]
	field := params["field"]
	contextLogger = contextLogger.WithFields(log.Fields{"field": field, "resource": id})
	contextLogger.Info("Incrementing Value")

	updateID, err := database.IncrementField(db.Collection(resourceCollectionName), id, field)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when incrementing resource value")
	}
	contextLogger.WithField("updateID", updateID).Info("Successfully incremented resource value")
	json.NewEncoder(w).Encode(true)
}

// IncrementResourcePostValue incremements the views associated with a resource
func IncrementResourcePostValue(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)
	resourceID := params["id"]
	postID := params["postID"]
	field := params["field"]
	action := params["action"]
	incrementValue := 1
	if action == "decrement" {
		incrementValue = -1
	}

	contextLogger = contextLogger.WithFields(log.Fields{
		"field":    field,
		"resource": resourceID,
		"postID":   postID,
	})

	contextLogger.Info("Incrementing Value on Resource Post")
	updateID, err := database.IncrementFieldInObjectArray(
		db.Collection(resourceCollectionName),
		resourceID,
		"posts",
		postID,
		field,
		incrementValue,
	)

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when incrementing resource value")
	}
	contextLogger.WithField("updateID", updateID).Info("Successfully incremented resource value")
	json.NewEncoder(w).Encode(true)
}

// NewPostOnResource adds a post to a learning resource
func NewPostOnResource(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)

	resourceID := params["id"]
	var body = make(map[string]string)
	json.NewDecoder(r.Body).Decode(&body)
	userID := body["userID"]
	userOID, err := primitive.ObjectIDFromHex(userID)
	contextLogger = contextLogger.WithFields(log.Fields{"submittedBy": userID, "resource": resourceID})
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when decoding body")
	}
	userInfo, err := database.FindOneRecordWithProjection(
		db.Collection(userCollectionName),
		userID,
		bson.D{{"_id", 0}, {"fname", 1}, {"lname", 1}, {"image", 1}})

	fullname := userInfo["fname"].(string) + " " + userInfo["lname"].(string)
	imageURL := userInfo["image"].(string)

	var post = resources.ResourcePost{
		UserID:       userOID,
		Content:      body["content"],
		Posted:       time.Now().Unix(),
		FullName:     fullname,
		ProfileImage: imageURL}
	contextLogger.Info("Attemting to add post to resource")
	success, err := collections.AddPostToResource(post, resourceID)

	if err != nil {
		contextLogger.WithField("error", err).Error("Error when adding new post to resource")
	}
	contextLogger.WithField("success", success).Info("Successfully added post to resource")
	contextLogger.Info(post)
	json.NewEncoder(w).Encode(true)
}

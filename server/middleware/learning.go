package middleware

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourceCollectionName = "resources"
const suggestedResourceCollectionName = "suggested-resources"

// GetLearningResources collects the persona skill info
func GetLearningResources(db *database.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	resources, err := db.Learning.GetAll()
	if err != nil {
		contextLogger.WithField("error", err).Error("An error occured")
	}
	contextLogger.WithField("retrieved", len(resources)).Info("Successfully retrived resources")
	json.NewEncoder(w).Encode(resources)
}

// NewResourceSuggestion creates a new suggestion for a learning resource
func NewResourceSuggestion(db *database.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)
	userID := params["userId"]
	contextLogger = contextLogger.WithField("user", userID)
	contextLogger.Info("Creating new resource suggestion")

	var resourceSuggestion = resources.ResourceSuggestion{}
	err := json.NewDecoder(r.Body).Decode(&resourceSuggestion)

	insertID, err := db.LearningSuggestions.Create(resourceSuggestion, userID)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when posting suggestion")
	}
	contextLogger.WithField("insertId", insertID).Info("Successfully created resource suggestion")
	json.NewEncoder(w).Encode(insertID)
}

// HandleResourceView incremements the views associated with a resource
func HandleResourceView(db *database.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)
	id := params["id"]
	field := params["field"]
	contextLogger = contextLogger.WithFields(log.Fields{"field": field, "resource": id})

	contextLogger.Info("Incrementing Value")
	currentCount, err := db.Learning.IncrementResourceViews(id)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when incrementing resource value")
	}
	contextLogger.WithField("currentValue", currentCount).Info("Successfully handled resource view")
	json.NewEncoder(w).Encode(err == nil)
}

// HandleResourcePostActionByUser handles a post on a resource being interacted with by a user
func HandleResourcePostActionByUser(db *database.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)
	resourceID := params["id"]
	postID := params["postID"]
	field := params["field"]
	action := params["action"]
	contextLogger = contextLogger.WithFields(log.Fields{
		"field":    field,
		"resource": resourceID,
		"postID":   postID,
	})
	contextLogger.Info("Incrementing Value on Resource Post")
	currentCount, err := resourceFieldIncrementDecider(action, field, resourceID, postID, db)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when incrementing value")
	}
	contextLogger.WithField("currentValue", currentCount).Info("Successfully handled value increment")
	json.NewEncoder(w).Encode(true)
}

func resourceFieldIncrementDecider(action string, fieldName string, resourceID string, postID string, db *database.Database) (int, error) {
	if fieldName == "reports" {
		if action == "increment" {
			return db.Learning.IncrementResourcePostReportCount(resourceID, postID)
		}
		return db.Learning.DecrementResourcePostReportCount(resourceID, postID)
	}
	if fieldName == "likes" {
		if action == "increment" {
			return db.Learning.IncrementResourcePostLikeCount(resourceID, postID)
		}
		return db.Learning.DecrementResourcePostLikeCount(resourceID, postID)
	}
	return 0, errors.New("Invalid value passed in - could not increment")
}

// NewPostOnResource adds a post to a learning resource
func NewPostOnResource(db *database.Database, w http.ResponseWriter, r *http.Request) {
	contextLogger := RouteSetup(w, r)
	params := mux.Vars(r)

	resourceID := params["id"]
	var body = make(map[string]string)
	json.NewDecoder(r.Body).Decode(&body)
	userID := body["userID"]
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when decoding body")
	}
	userSummary, err := db.Users.GetUserSummary(userID)
	fullname := userSummary.FName + " " + userSummary.LName
	imageURL := userSummary.Image

	var post = resources.ResourcePost{
		UserID:       userOID,
		Content:      body["content"],
		Posted:       time.Now().Unix(),
		FullName:     fullname,
		ProfileImage: imageURL}
	contextLogger.Info("Attemting to add post to resource")
	postID, err := db.Learning.AddPostToResource(post, resourceID)
	if err != nil {
		contextLogger.WithField("error", err).Error("Error when adding new post to resource")
	}
	contextLogger.WithField("postID", postID).Info("Successfully added post to resource")
	json.NewEncoder(w).Encode(postID)
}

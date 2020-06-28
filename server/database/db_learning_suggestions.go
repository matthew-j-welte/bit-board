package database

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourceSuggestionDB = "suggested-resources"

type LearningSuggestionAccessor interface {
	Create(db *Database, resource resources.ResourceSuggestion, userID string) (string, error)
}

type LearningSuggestionDB struct {
	*Database
}

// CreateResourceSuggestion creates a learning resource suggestion in the db
func (db *LearningSuggestionDB) Create(resource resources.ResourceSuggestion, userID string) (string, error) {
	return createResourceSuggestion(db.GetCollection(resourceSuggestionDB), resource, userID)
}

func createResourceSuggestion(collectionHelper CollectionHelper, resource resources.ResourceSuggestion, userID string) (string, error) {
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return "", nil
	}

	resource.Poster = userOID
	result, err := collectionHelper.InsertOne(context.Background(), resource)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

package collections

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourceSuggestionDB = "suggested-resources"

// CreateResourceSuggestion creates a learning resource suggestion in the db
func CreateResourceSuggestion(resource resources.ResourceSuggestion, userID string) (string, error) {
	return createResourceSuggestion(getCollection(resourceSuggestionDB), resource, userID)
}

func createResourceSuggestion(collectionHelper database.CollectionHelper, resource resources.ResourceSuggestion, userID string) (string, error) {
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

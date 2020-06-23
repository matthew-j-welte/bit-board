package collections

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
)

const resourceSuggestionDB = "suggested-resources"

// CreateResourceSuggestion creates a learning resource suggestion in the db
func CreateResourceSuggestion(resource resources.ResourceSuggestion) (string, error) {
	return createResourceSuggestion(getCollection(resourceSuggestionDB), resource)
}

func createResourceSuggestion(collectionHelper database.CollectionHelper, resource resources.ResourceSuggestion) {
	result, err := collectionHelper.InsertOne(context.Background(), resource)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

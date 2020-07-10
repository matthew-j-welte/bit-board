package database

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourceSuggestionDB = "suggested-resources"

type LearningSuggestionDB interface {
	Create(resource resources.ResourceSuggestion, userID string) (string, error)
}

type learningSuggestionDB struct {
	db DBHelper
}

func NewLearningSuggestionDB(db DBHelper) LearningSuggestionDB {
	return &learningSuggestionDB{
		db: db,
	}
}

// CreateResourceSuggestion creates a learning resource suggestion in the db
func (learningSuggestion *learningSuggestionDB) Create(resource resources.ResourceSuggestion, userID string) (string, error) {
	collectionHelper := learningSuggestion.db.GetCollection(resourceSuggestionDB)
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

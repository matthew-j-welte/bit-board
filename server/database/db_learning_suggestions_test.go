package database

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"github.com/matthew-j-welte/bit-board/server/testutils"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/stretchr/testify/assert"
)

func TestCreateResourceSuggestionSuccess(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)
	userID := primitive.NewObjectID().Hex()
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, nil)
	mockCollectionHelper.On("GetInsertID", testutils.MockArgs(1)...).Return("100")

	result, err := createResourceSuggestion(mockCollectionHelper, resources.ResourceSuggestion{}, userID)
	assert.Equal(t, result, "100")
	assert.Nil(t, err)
}

func TestCreateResourceSuggestionError(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)
	userID := primitive.NewObjectID().Hex()
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, errors.New("err"))

	_, err := createResourceSuggestion(mockCollectionHelper, resources.ResourceSuggestion{}, userID)
	assert.NotNil(t, err)
}

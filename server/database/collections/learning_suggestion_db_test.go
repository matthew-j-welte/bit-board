package collections

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"github.com/matthew-j-welte/bit-board/server/testutils"

	"github.com/stretchr/testify/assert"
)

func TestCreateResourceSuggestionSuccess(t *testing.T) {
	mockCollectionHelper := new(database.MockCollectionHelper)
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, nil)
	mockCollectionHelper.On("GetInsertID", testutils.MockArgs(1)...).Return("100")

	result, err := createResourceSuggestion(mockCollectionHelper, resources.ResourceSuggestion{})
	assert.Equal(t, result, "100")
	assert.Nil(t, err)
}

func TestCreateResourceSuggestionError(t *testing.T) {
	mockCollectionHelper := new(database.MockCollectionHelper)
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, errors.New("err"))

	_, err := createResourceSuggestion(mockCollectionHelper, resources.ResourceSuggestion{})
	assert.NotNil(t, err)
}

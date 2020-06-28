package database

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"github.com/matthew-j-welte/bit-board/server/testutils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/stretchr/testify/assert"
)

// getResources tests

func TestGetResourcesSuccess(t *testing.T) {
	expected := []bson.M{{"test": 1}, {"test": 2}}
	mockCollectionHelper := new(MockCollectionHelper)
	mockManyResultHelper := new(MockManyResultsHelper)

	mockManyResultHelper.On("Decode").Return(expected, nil)
	mockCollectionHelper.On("Find", testutils.MockArgs(3)...).Return(mockManyResultHelper, nil)

	res, err := getResources(mockCollectionHelper)
	assert.Equal(t, expected, res)
	assert.Nil(t, err)
}

func TestGetResourcesFailure(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)

	mockCollectionHelper.On("Find", testutils.MockArgs(3)...).Return(nil, errors.New("Some Error"))

	res, err := getResources(mockCollectionHelper)
	assert.Nil(t, res)
	assert.NotNil(t, err)
}

func TestGetResourcesWithNilCursor(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)

	mockCollectionHelper.On("Find", testutils.MockArgs(3)...).Return(nil, nil)

	res, err := getResources(mockCollectionHelper)
	assert.Nil(t, res)
	assert.NotNil(t, err)
}

// addPostToResource tests

func TestAddPostWithObjectID(t *testing.T) {
	var modifiedCount int64 = 1
	postID := primitive.NewObjectID()
	resourceIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addPostToResource(mockCollectionHelper, resources.ResourcePost{ID: postID}, resourceIDHex)
	assert.Equal(t, res, postID.Hex())
	assert.Nil(t, err)
}

func TestAddPostWithoutObjectID(t *testing.T) {
	var modifiedCount int64 = 1
	resourceIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addPostToResource(mockCollectionHelper, resources.ResourcePost{}, resourceIDHex)
	assert.NotEqual(t, res, primitive.NilObjectID)
	assert.Nil(t, err)
}

func TestAddPostWithErrorOnUpdate(t *testing.T) {
	resourceIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, errors.New("err"))

	res, err := addPostToResource(mockCollectionHelper, resources.ResourcePost{}, resourceIDHex)
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

func TestAddPostWithNoRecordsModified(t *testing.T) {
	var modifiedCount int64 = 0
	resourceIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addPostToResource(mockCollectionHelper, resources.ResourcePost{}, resourceIDHex)
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

// Increment functions

func TestIncrementFunctions(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)
	val := 1
	mockCollectionHelper.On("IncrementField", testutils.MockArgs(2)...).Return(val, nil)
	mockCollectionHelper.On("IncrementFieldInObjectArray", testutils.MockArgs(4)...).Return(val, nil)
	mockCollectionHelper.On("DecrementFieldInObjectArray", testutils.MockArgs(4)...).Return(val, nil)
	mockCollectionHelper.On("IncrementFieldInObjectArray", testutils.MockArgs(4)...).Return(val, nil)
	mockCollectionHelper.On("DecrementFieldInObjectArray", testutils.MockArgs(4)...).Return(val, nil)

	res, err := incrementResourceViews(mockCollectionHelper, "id")
	assert.Equal(t, res, val)
	assert.Nil(t, err)

	res, err = incrementResourcePostLikeCount(mockCollectionHelper, "id", "id")
	assert.Equal(t, res, val)
	assert.Nil(t, err)

	res, err = decrementResourcePostLikeCount(mockCollectionHelper, "id", "id")
	assert.Equal(t, res, val)
	assert.Nil(t, err)

	res, err = incrementResourcePostReportCount(mockCollectionHelper, "id", "id")
	assert.Equal(t, res, val)
	assert.Nil(t, err)

	res, err = decrementResourcePostReportCount(mockCollectionHelper, "id", "id")
	assert.Equal(t, res, val)
	assert.Nil(t, err)
}

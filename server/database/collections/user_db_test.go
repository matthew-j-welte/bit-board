package collections

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"github.com/matthew-j-welte/bit-board/server/testutils"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/stretchr/testify/assert"
)

func TestCreateNewUserSuccess(t *testing.T) {
	mockCollectionHelper := new(database.MockCollectionHelper)
	mockCollectionHelper.On("GetInsertID", testutils.MockArgs(1)...).Return("100")
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, nil)

	result, err := createUser(mockCollectionHelper, users.User{})
	assert.Equal(t, result, "100")
	assert.Nil(t, err)
}

func TestCreateNewUserError(t *testing.T) {
	mockCollectionHelper := new(database.MockCollectionHelper)
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, errors.New("Somee error"))

	result, err := createUser(mockCollectionHelper, users.User{})
	assert.Equal(t, result, "")
	assert.NotNil(t, err)
}

func TestAddEditorConfigurationWithObjectID(t *testing.T) {
	var modifiedCount int64 = 1
	editorConfID := primitive.NewObjectID()
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(database.MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{ID: editorConfID}, documentIDHex)
	assert.Equal(t, res, editorConfID.Hex())
	assert.Nil(t, err)
}

func TestAddEditorConfigurationWithoutObjectID(t *testing.T) {
	var modifiedCount int64 = 1
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(database.MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{}, documentIDHex)
	assert.NotEqual(t, res, primitive.NilObjectID)
	assert.Nil(t, err)
}

func TestAddEditorConfigurationWithErrorOnUpdate(t *testing.T) {
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(database.MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, errors.New("err"))

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{}, documentIDHex)
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

func TestAddEditorConfiguratoinWithNoRecordsModified(t *testing.T) {
	var modifiedCount int64 = 0
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(database.MockCollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{}, documentIDHex)
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

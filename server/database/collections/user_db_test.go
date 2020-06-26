package collections

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database/mocks"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"github.com/matthew-j-welte/bit-board/server/testutils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// createUser tests

func TestCreateNewUserSuccess(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)
	mockCollectionHelper.On("GetInsertID", testutils.MockArgs(1)...).Return("100")
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, nil)

	result, err := createUser(mockCollectionHelper, users.User{})
	assert.Equal(t, result, "100")
	assert.Nil(t, err)
}

func TestCreateNewUserError(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, errors.New("Somee error"))

	result, err := createUser(mockCollectionHelper, users.User{})
	assert.Equal(t, result, "")
	assert.NotNil(t, err)
}

// getUserID tests

func TestGetUserID(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)

	mockCollectionHelper.On("GetObjectIDFromFilter", testutils.MockArgs(1)...).Return("id", nil)
	res, err := getUserID(mockCollectionHelper, users.User{Username: "uname", Password: "pword"})
	assert.Equal(t, res, "id")
	assert.Nil(t, err)
}

func TestGetUserIDError(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)
	mockCollectionHelper.On("GetObjectIDFromFilter", testutils.MockArgs(1)...).Return("", errors.New("err"))

	res, err := getUserID(mockCollectionHelper, users.User{Username: "uname", Password: "pword"})
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

// getUserSummary tests

func TestGetUserSummaryBadHexID(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)
	res, err := getUserSummary(mockCollectionHelper, "Not HEX")
	assert.Equal(t, res, users.User{})
	assert.NotNil(t, err)
}

func TestGetUserSummarySuccess(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)
	mockSingleResult := new(mocks.SingleResultHelper)
	mockSingleResult.On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arg["fname"] = "Matt"
		arg["lname"] = "Welte"
		arg["image"] = "google.com"
	})
	mockCollectionHelper.On("FindOne", testutils.MockArgs(3)...).Return(mockSingleResult)

	res, err := getUserSummary(mockCollectionHelper, primitive.NewObjectID().Hex())
	assert.Equal(t, res, users.User{
		FName: "Matt",
		LName: "Welte",
		Image: "google.com",
	})
	assert.Nil(t, err)
}

func TestGetUserSummaryFailure(t *testing.T) {
	mockCollectionHelper := new(mocks.CollectionHelper)
	mockSingleResult := new(mocks.SingleResultHelper)
	mockSingleResult.On("Decode", mock.Anything).Return(errors.New("err")).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arg["fname"] = "Matt"
		arg["lname"] = "Welte"
		arg["image"] = "google.com"
	})
	mockCollectionHelper.On("FindOne", testutils.MockArgs(3)...).Return(mockSingleResult)

	res, err := getUserSummary(mockCollectionHelper, primitive.NewObjectID().Hex())
	assert.Equal(t, res, users.User{})
	assert.NotNil(t, err)
}

// addEditorConfigurationToUser tests

func TestAddEditorConfigurationWithObjectID(t *testing.T) {
	var modifiedCount int64 = 1
	editorConfID := primitive.NewObjectID()
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(mocks.CollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{ID: editorConfID}, documentIDHex)
	assert.Equal(t, res, editorConfID.Hex())
	assert.Nil(t, err)
}

func TestAddEditorConfigurationWithoutObjectID(t *testing.T) {
	var modifiedCount int64 = 1
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(mocks.CollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{}, documentIDHex)
	assert.NotEqual(t, res, primitive.NilObjectID)
	assert.Nil(t, err)
}

func TestAddEditorConfigurationWithErrorOnUpdate(t *testing.T) {
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(mocks.CollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, errors.New("err"))

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{}, documentIDHex)
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

func TestAddEditorConfiguratoinWithNoRecordsModified(t *testing.T) {
	var modifiedCount int64 = 0
	documentIDHex := primitive.NewObjectID().Hex()
	mockCollectionHelper := new(mocks.CollectionHelper)

	mockCollectionHelper.On("PushToArray", testutils.MockArgs(3)...).Return(nil, nil)
	mockCollectionHelper.On("GetModifiedCount", testutils.MockArgs(1)...).Return(modifiedCount)

	res, err := addEditorConfigurationToUser(mockCollectionHelper, users.CodeEditorConfiguration{}, documentIDHex)
	assert.Equal(t, res, "")
	assert.NotNil(t, err)
}

package collections

import (
	"context"
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/users"

	"github.com/stretchr/testify/assert"
)

// Could be cool to follow the pattern of some mock functionality map. Meaning

var findOneResult database.SingleResultHelper
var insertOneResult interface{}
var insertOneError error
var deleteOneResult int64
var deleteOneError error
var extractInsertIDResult string

type mockCollectionHelper struct{}

func (mockCollection mockCollectionHelper) FindOne(context.Context, interface{}) database.SingleResultHelper {
	return findOneResult
}

func (mockCollection mockCollectionHelper) InsertOne(context.Context, interface{}) (interface{}, error) {
	return insertOneResult, insertOneError
}

func (mockCollection mockCollectionHelper) DeleteOne(ctx context.Context, filter interface{}) (int64, error) {
	return deleteOneResult, deleteOneError
}

func (mockCollection mockCollectionHelper) ExtractInsertID(result interface{}) string {
	return extractInsertIDResult
}

var collectionHelper database.CollectionHelper = mockCollectionHelper{}

func TestCreateNewUserSuccess(t *testing.T) {
	extractInsertIDResult = "100"
	result, err := createUser(collectionHelper, users.User{})
	assert.Equal(t, result, extractInsertIDResult)
	assert.Nil(t, err)
}

func TestCreateNewUserError(t *testing.T) {
	insertOneError = errors.New("some error")
	result, err := createUser(collectionHelper, users.User{})
	assert.Equal(t, result, "")
	assert.NotNil(t, err)
}

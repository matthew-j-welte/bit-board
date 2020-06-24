package collections

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/users"

	"github.com/stretchr/testify/assert"
)

func TestCreateNewUserSuccess(t *testing.T) {
	database.MockGetInsertIDR1 = "100"
	result, err := createUser(database.MockCollectionHelper, users.User{})
	assert.Equal(t, result, "100")
	assert.Nil(t, err)
}

func TestCreateNewUserError(t *testing.T) {
	database.MockInsertOneR1 = ""
	database.MockInsertOneR2 = errors.New("Some Error")
	result, err := createUser(database.MockCollectionHelper, users.User{})
	assert.Equal(t, result, "")
	assert.NotNil(t, err)
}

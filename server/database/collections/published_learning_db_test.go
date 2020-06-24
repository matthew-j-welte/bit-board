package collections

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"

	"github.com/stretchr/testify/assert"
)

func TestGetResourcesFailure(t *testing.T) {
	database.MockFindR1 = nil
	database.MockFindR2 = errors.New("Some Error")

	_, err := getResources(database.MockCollectionHelper)
	assert.NotNil(t, err)
}

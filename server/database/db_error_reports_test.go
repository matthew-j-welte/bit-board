package database

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/models/reports"
	"github.com/matthew-j-welte/bit-board/server/testutils"

	"github.com/stretchr/testify/assert"
)

func TestCreateErrorReport(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, nil)
	mockCollectionHelper.On("GetInsertID", testutils.MockArgs(1)...).Return("100")

	result, err := createErrorReport(mockCollectionHelper, reports.ErrorReport{})
	assert.Equal(t, result, "100")
	assert.Nil(t, err)
}

func TestCreateErrorReportError(t *testing.T) {
	mockCollectionHelper := new(MockCollectionHelper)
	mockCollectionHelper.On("InsertOne", testutils.MockArgs(2)...).Return(nil, errors.New("err"))

	_, err := createErrorReport(mockCollectionHelper, reports.ErrorReport{})
	assert.NotNil(t, err)
}

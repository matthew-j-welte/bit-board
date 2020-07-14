package database_test

// import (
// 	"errors"
// 	"testing"

// 	"github.com/matthew-j-welte/bit-board/server/database/mocks"
// 	"github.com/matthew-j-welte/bit-board/server/testing"
// 	"go.mongodb.org/mongo-driver/bson"

// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// )

// func TestDecodeEmptyCursorSuccess(t *testing.T) {
// 	mockCursor := new(mocks.MongoCursor)
// 	mockCursor.On("Close", testing.MockArgs(1)...).Return(nil)
// 	mockCursor.On("Next", testing.MockArgs(1)...).Return(false)
// 	mockCursor.On("Err").Return(nil)

// 	var empty []bson.M
// 	result, err := decodeCursor(mockCursor)
// 	assert.Equal(t, empty, result)
// 	assert.Nil(t, err)
// }

// func TestDecodeCursorSuccess(t *testing.T) {
// 	mockCursor := new(mocks.MongoCursor)
// 	mockCursor.On("Close", testing.MockArgs(1)...).Return(nil)
// 	mockCursor.On("Next", testing.MockArgs(1)...).Return(true).Once()
// 	mockCursor.On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
// 		arg := args.Get(0).(bson.M)
// 		arg["hi"] = "there"
// 	}).Once()
// 	mockCursor.On("Next", testing.MockArgs(1)...).Return(true).Once()
// 	mockCursor.On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
// 		arg := args.Get(0).(bson.M)
// 		arg["whats"] = "up"
// 	}).Once()
// 	mockCursor.On("Next", testing.MockArgs(1)...).Return(false).Once()
// 	mockCursor.On("Err").Return(nil)

// 	sample := []bson.M{{"hi": "there"}, {"whats": "up"}}
// 	res, err := decodeCursor(mockCursor)
// 	assert.Equal(t, sample, res)
// 	assert.Nil(t, err)
// }

// func TestDecodeError(t *testing.T) {
// 	mockCursor := new(mocks.MongoCursor)
// 	mockCursor.On("Close", testing.MockArgs(1)...).Return(nil)
// 	mockCursor.On("Next", testing.MockArgs(1)...).Return(true).Once()
// 	mockCursor.On("Decode", mock.Anything).Return(errors.New("err"))
// 	mockCursor.On("Next", testing.MockArgs(1)...).Return(false).Once()
// 	mockCursor.On("Err").Return(errors.New("err"))

// 	res, err := decodeCursor(mockCursor)
// 	assert.Nil(t, res)
// 	assert.NotNil(t, err)
// }

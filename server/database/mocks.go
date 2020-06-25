package database

import (
	"context"

	"github.com/stretchr/testify/mock"
	"go.mongodb.org/mongo-driver/bson"
)

type MockCollectionHelper struct {
	mock.Mock
}

type MockManyResultHelper struct {
	mock.Mock
}

type MockSingleResultHelper struct {
	mock.Mock
}

// // MockCollectionHelper mocks out the collection helper interface
// var MockCollectionHelper CollectionHelper = mHelper{}

// // MockManyResultHelper mocks out the many result helper
// var MockManyResultHelper ManyResultsHelper = mockManyResultHelper{}

// Collection Helper mocks

func (m *MockCollectionHelper) FindOne(ctx context.Context, filter interface{}) SingleResultHelper {
	args := m.Called(ctx, filter)
	r1 := args.Get(0)
	if r1 == nil {
		return nil
	}
	return r1.(*MockSingleResultHelper)
}

func (m *MockCollectionHelper) Find(ctx context.Context, filter interface{}, projection interface{}) (ManyResultsHelper, error) {
	args := m.Called(ctx, filter, projection)
	r1 := args.Get(0)
	r2 := args.Error(1)
	if r1 == nil {
		return nil, r2
	}
	return r1.(*MockManyResultHelper), r2
}

func (m *MockCollectionHelper) InsertOne(ctx context.Context, payload interface{}) (interface{}, error) {
	args := m.Called(ctx, payload)
	return args.Get(0), args.Error(1)
}

func (m *MockCollectionHelper) DeleteOne(ctx context.Context, filter interface{}) (int64, error) {
	args := m.Called(ctx, filter)
	return args.Get(0).(int64), args.Error(1)
}

func (m *MockCollectionHelper) UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error) {
	args := m.Called(ctx, filter, projection)
	return args.Get(0), args.Error(1)
}

func (m *MockCollectionHelper) GetInsertID(result interface{}) string {
	args := m.Called(result)
	return args.String(0)
}

func (m *MockCollectionHelper) GetModifiedCount(result interface{}) int64 {
	args := m.Called(result)
	return args.Get(0).(int64)
}

func (m *MockCollectionHelper) GetSubArray(primaryID string, arrayName string) (interface{}, error) {
	args := m.Called(primaryID, arrayName)
	return args.Get(0), args.Error(1)
}

func (m *MockCollectionHelper) PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error) {
	args := m.Called(primaryID, arrayName, payload)
	return args.Get(0), args.Error(1)
}

// CountAllRecords returns the amount of documents in a table
func (m *MockCollectionHelper) CountAllRecords() (int64, error) {
	args := m.Called()
	return args.Get(0).(int64), args.Error(1)
}

// CountRecords returns the amount of documents in a table
func (m *MockCollectionHelper) CountRecords(filter interface{}) (int64, error) {
	args := m.Called(filter)
	return args.Get(0).(int64), args.Error(1)
}

func (m *MockCollectionHelper) GetObjectIDFromFilter(identifier bson.M) (string, error) {
	args := m.Called(identifier)
	return args.String(0), args.Error(1)
}

// Single Result Mocks

func (m *MockSingleResultHelper) Decode(result interface{}) error {
	args := m.Called(result)
	return args.Error(0)
}

// Many Result Mocks

func (m *MockManyResultHelper) Decode() ([]bson.M, error) {
	args := m.Called()
	r1 := args.Get(0)
	r2 := args.Error(1)
	if r1 == nil {
		return nil, r2
	}
	return r1.([]bson.M), r2
}

package database

import (
	"context"
)

var MockFindOneR1 SingleResultHelper
var MockFindR1 ManyResultsHelper
var MockFindR2 error
var MockInsertOneR1 interface{}
var MockInsertOneR2 error
var MockDeleteOneR1 int64
var MockDeleteOneR2 error
var MockUpdateOneR1 interface{}
var MockUpdateOneR2 error
var MockGetInsertIDR1 string
var MockGetGetModifiedCountR1 int64

type mockCollectionHelper struct{}

func (mockCollection mockCollectionHelper) FindOne(context.Context, interface{}) SingleResultHelper {
	return MockFindOneR1
}

func (mockCollection mockCollectionHelper) Find(ctx context.Context, filter interface{}, projection interface{}) (ManyResultsHelper, error) {
	return MockFindR1, MockFindR2
}

func (mockCollection mockCollectionHelper) InsertOne(context.Context, interface{}) (interface{}, error) {
	return MockInsertOneR1, MockInsertOneR2
}

func (mockCollection mockCollectionHelper) DeleteOne(ctx context.Context, filter interface{}) (int64, error) {
	return MockDeleteOneR1, MockDeleteOneR2
}

func (mockCollection mockCollectionHelper) UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error) {
	return MockUpdateOneR1, MockUpdateOneR2
}

func (mockCollection mockCollectionHelper) GetInsertID(result interface{}) string {
	return MockGetInsertIDR1
}

func (mockCollection mockCollectionHelper) GetModifiedCount(result interface{}) int64 {
	return MockGetGetModifiedCountR1
}

// MockCollectionHelper mocks out the collection helper interface
var MockCollectionHelper CollectionHelper = mockCollectionHelper{}

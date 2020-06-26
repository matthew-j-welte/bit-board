package database

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type SingleResultHelper interface {
	Decode(v interface{}) error
}

// ManyResultsHelper wrapper around the mongo-driver Cursor type
type ManyResultsHelper interface {
	Decode() ([]bson.M, error)
}

type mongoSingleResult struct {
	dbSingleResult *mongo.SingleResult
}

type mongoManyResult struct {
	mongoCursor *mongo.Cursor
}

func (wrapper *mongoSingleResult) Decode(payload interface{}) error {
	return wrapper.dbSingleResult.Decode(payload)
}

func (wrapper *mongoManyResult) Decode() ([]bson.M, error) {
	var payload []bson.M
	defer wrapper.mongoCursor.Close(context.Background())
	for wrapper.mongoCursor.Next(context.Background()) {
		var result bson.M
		err := wrapper.mongoCursor.Decode(&result)
		if err != nil {
			return nil, wrapper.mongoCursor.Err()
		}
		payload = append(payload, result)
	}
	return payload, wrapper.mongoCursor.Err()
}

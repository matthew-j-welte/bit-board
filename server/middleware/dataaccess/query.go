package dataaccess

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetResources get all learning resources
func GetResources(coll *mongo.Collection) (*mongo.Cursor, error) {
	return coll.Find(context.Background(), bson.D{})
}

// GetIDFromValue returns an id based on a passed in identifier
func GetIDFromValue(coll *mongo.Collection, identifier bson.M) (string, error) {
	result, err := FindOneRecordWithProjectionCustomQuery(
		coll, identifier, bson.D{{"_id", 1}})
	return result["_id"].(primitive.ObjectID).Hex(), err
}

// CountRecords returns the amount of documents in a table
func CountRecords(coll *mongo.Collection) (int64, error) {
	return coll.CountDocuments(context.Background(), bson.M{})
}

// FindOneRecord query a single record in the db
func FindOneRecord(coll *mongo.Collection, id string) (bson.M, error) {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		bson.D{{"_id", id}}).Decode(&result)
	return result, err
}

// FindOneRecordWithProjection query a single record in the db with a projection expr
func FindOneRecordWithProjection(coll *mongo.Collection, id string, projection bson.D) (bson.M, error) {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		bson.D{{"_id", id}},
		options.FindOne().SetProjection(projection)).Decode(&result)
	return result, err
}

// FindOneRecordWithProjectionCustomQuery query a single record in the db with a projection expr and custom identifier
func FindOneRecordWithProjectionCustomQuery(coll *mongo.Collection, query bson.M, projection bson.D) (bson.M, error) {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		query,
		options.FindOne().SetProjection(projection)).Decode(&result)
	return result, err
}

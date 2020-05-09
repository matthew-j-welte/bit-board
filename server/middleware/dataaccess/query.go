package dataaccess

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetResources get all learning resources
func GetResources(coll *mongo.Collection) *mongo.Cursor {
	cur, err := coll.Find(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	return cur
}

// CountRecords returns the amount of documents in a table
func CountRecords(coll *mongo.Collection) int64 {
	recCount, err := coll.CountDocuments(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	return recCount
}

// FindOneRecordWithProjection query a single record in the db
func FindOneRecord(coll *mongo.Collection, id string) bson.M {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		bson.D{{"_id", id}}).Decode(&result)

	if err != nil {
		log.Fatal(err)
	}
	return result
}

// FindOneRecordWithProjection query a single record in the db with a projection expr
func FindOneRecordWithProjection(coll *mongo.Collection, id string, projection bson.D) bson.M {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		bson.D{{"_id", id}},
		options.FindOne().SetProjection(projection)).Decode(&result)

	if err != nil {
		log.Fatal(err)
	}
	return result
}

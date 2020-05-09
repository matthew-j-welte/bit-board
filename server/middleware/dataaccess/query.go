package dataaccess

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetResources get all learning resources
func GetResources(coll *mongo.Collection) (*mongo.Cursor, error) {
	return coll.Find(
		context.Background(),
		bson.D{})
}

package dataaccess

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateUser creates a new user in the database
func CreateUser(coll *mongo.Collection, user users.NewUser) (string, error) {
	result, err := coll.InsertOne(context.Background(), user)
	if err != nil {
		return "", err
	}
	oid := result.InsertedID.(primitive.ObjectID)
	return oid.Hex(), err
}

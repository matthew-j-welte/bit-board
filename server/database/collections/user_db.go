package collections

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const userDB = "users"

// CreateUser creates a new user in the database
func CreateUser(user users.User) (string, error) {
	return createUser(getCollection(userDB), user)
}

// CreateEditorConfiguration creates a new editor configuration for a user
func CreateEditorConfiguration(coll *mongo.Collection, editorConfig users.CodeEditorConfiguration, documentID string) (bool, error) {
	return database.CreateSubResource(
		coll,
		documentID,
		bson.D{{"$push", bson.D{{"editorconfs", editorConfig}}}},
	)
}

func createUser(collectionHelper database.CollectionHelper, user users.User) (string, error) {
	result, err := collectionHelper.InsertOne(context.Background(), user)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

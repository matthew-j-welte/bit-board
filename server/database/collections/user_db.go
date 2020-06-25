package collections

import (
	"context"
	"errors"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const userDB = "users"

// CreateUser creates a new user in the database
func CountUsers() (int64, error) {
	return countUsers(getCollection(userDB))
}

// CreateUser creates a new user in the database
func CreateUser(user users.User) (string, error) {
	return createUser(getCollection(userDB), user)
}

// CreateUser creates a new user in the database
func GetUserID(user users.User) (string, error) {
	return getUserID(getCollection(userDB), user)
}

// CreateEditorConfiguration creates a new editor configuration for a user
func CreateEditorConfiguration(editorConfig users.CodeEditorConfiguration, documentID string) (string, error) {
	return addEditorConfigurationToUser(getCollection(userDB), editorConfig, documentID)
}

func countUsers(collectionHelper database.CollectionHelper) (int64, error) {
	return collectionHelper.CountAllRecords()
}

func createUser(collectionHelper database.CollectionHelper, user users.User) (string, error) {
	result, err := collectionHelper.InsertOne(context.Background(), user)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

func getUserID(collectionHelper database.CollectionHelper, user users.User) (string, error) {
	return collectionHelper.GetObjectIDFromFilter(
		bson.M{
			"username": user.Username,
			"password": user.Password},
	)
}

func addEditorConfigurationToUser(collectionHelper database.CollectionHelper, editorConf users.CodeEditorConfiguration, documentID string) (string, error) {
	if editorConf.ID == primitive.NilObjectID {
		editorConf.ID = primitive.NewObjectID()
	}

	result, err := collectionHelper.PushToArray(documentID, "editorconfs", editorConf)
	if err != nil {
		return "", err
	}

	if collectionHelper.GetModifiedCount(result) == 0 {
		return "", errors.New("Failed to save editor configuration - No documents were modified")
	}
	return editorConf.ID.Hex(), nil
}

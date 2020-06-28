package database

import (
	"context"
	"errors"

	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const userDB = "users"

type UserAccessor interface {
	CountUsers() (int64, error)
	CreateUser(user users.User) (string, error)
	GetUserID(user users.User) (string, error)
	GetUserSummary(userID string) (users.User, error)
	GetEditorConfigurations(userID string) (interface{}, error)
	CreateEditorConfiguration(editorConfig users.CodeEditorConfiguration, documentID string) (string, error)
	GetUserSkills(userID string) (interface{}, error)
}

type UserDB struct {
	*Database
}

// CountUsers counts all users
func (db *UserDB) CountUsers() (int64, error) {
	return countUsers(db.GetCollection(userDB))
}

// CreateUser creates a new user in the database
func (db *UserDB) CreateUser(user users.User) (string, error) {
	return createUser(db.GetCollection(userDB), user)
}

// GetUserID gets the users ID based on a subsection of the user model
func (db *UserDB) GetUserID(user users.User) (string, error) {
	return getUserID(db.GetCollection(userDB), user)
}

// GetUserSummary gets the name and profile photo of a user
func (db *UserDB) GetUserSummary(userID string) (users.User, error) {
	return getUserSummary(db.GetCollection(userDB), userID)
}

// GetEditorConfigurations retrieve all saved editor configurations for a user
func (db *UserDB) GetEditorConfigurations(userID string) (interface{}, error) {
	return getEditorConfigurations(db.GetCollection(userDB), userID)
}

// CreateEditorConfiguration creates a new editor configuration for a user
func (db *UserDB) CreateEditorConfiguration(editorConfig users.CodeEditorConfiguration, documentID string) (string, error) {
	return addEditorConfigurationToUser(db.GetCollection(userDB), editorConfig, documentID)
}

// GetUserSkills retrieve all saved editor configurations for a user
func (db *UserDB) GetUserSkills(userID string) (interface{}, error) {
	return getUserSkills(db.GetCollection(userDB), userID)
}

func countUsers(collectionHelper CollectionHelper) (int64, error) {
	return collectionHelper.CountAllRecords()
}

func createUser(collectionHelper CollectionHelper, user users.User) (string, error) {
	result, err := collectionHelper.InsertOne(context.Background(), user)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

func getUserID(collectionHelper CollectionHelper, user users.User) (string, error) {
	return collectionHelper.GetObjectIDFromFilter(
		bson.M{
			"username": user.Username,
			"password": user.Password},
	)
}

func getUserSummary(collectionHelper CollectionHelper, userID string) (users.User, error) {
	usrSummary := bson.M{}
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return users.User{}, err
	}
	err = collectionHelper.FindOne(
		context.Background(),
		bson.M{"_id": userOID},
		bson.M{"_id": 0, "fname": 1, "lname": 1, "image": 1},
	).Decode(usrSummary)
	if err != nil {
		return users.User{}, err
	}

	return users.User{
		FName: usrSummary["fname"].(string),
		LName: usrSummary["lname"].(string),
		Image: usrSummary["image"].(string),
	}, nil
}

func getEditorConfigurations(collectionHelper CollectionHelper, userID string) (interface{}, error) {
	return collectionHelper.GetSubArray(userID, "editorconfs")
}

func getUserSkills(collectionHelper CollectionHelper, userID string) (interface{}, error) {
	return collectionHelper.GetSubArray(userID, "skills")
}

func addEditorConfigurationToUser(collectionHelper CollectionHelper, editorConf users.CodeEditorConfiguration, documentID string) (string, error) {
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

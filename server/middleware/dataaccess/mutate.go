package dataaccess

import (
	"context"
	"errors"
	"log"

	"github.com/matthew-j-welte/bit-board/server/models/reports"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateUser creates a new user in the database
func CreateUser(coll *mongo.Collection, user users.User) (string, error) {
	result, err := coll.InsertOne(context.Background(), user)
	if err != nil {
		return "", err
	}
	oid := result.InsertedID.(primitive.ObjectID)
	return oid.Hex(), err
}

// CreateProject creates a new project for a user
func CreateProject(coll *mongo.Collection, project users.Project, hexOid string) (bool, error) {
	userOid, err := primitive.ObjectIDFromHex(hexOid)
	result, err := coll.UpdateOne(
		context.Background(),
		bson.M{"_id": userOid},
		bson.D{
			{"$push", bson.D{{"projects", project}}}})

	if err != nil {
		return false, err
	}
	if result.ModifiedCount == 0 {
		log.Println("[ERROR] No user associated with this userId")
		return false, errors.New("Failed to add project")
	}
	if result.ModifiedCount > 1 {
		log.Printf("[WARNING] More than one user record found for ID: %s\n", hexOid)
	}
	return true, nil
}

// CreateResourceSuggestion creates a learning resource suggestion in the db
func CreateResourceSuggestion(coll *mongo.Collection, resource resources.ResourceSuggestion) (string, error) {
	result, err := coll.InsertOne(context.Background(), resource)
	if err != nil {
		return "", err
	}
	oid := result.InsertedID.(primitive.ObjectID)
	return oid.Hex(), err
}

// CreateErrorReport creates a new erorr report in db
func CreateErrorReport(coll *mongo.Collection, report reports.ErrorReport) (string, error) {
	result, err := coll.InsertOne(context.Background(), report)
	if err != nil {
		return "", err
	}
	oid := result.InsertedID.(primitive.ObjectID)
	return oid.Hex(), err
}

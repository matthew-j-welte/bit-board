package collections

import (
	"context"
	"errors"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const resourcesDB = "resources"

// GetResources get all learning resources
func GetResources(coll *mongo.Collection) (*mongo.Cursor, error) {
	return coll.Find(context.Background(), bson.D{})
}

// AddPostToResource adds a post to a learning resource
func AddPostToResource(post resources.ResourcePost, resourceID string) (bool, error) {
	addPost(getCollection(resourcesDB), post, resourceID)
}

func addPost(collectionHelper database.CollectionHelper, post resources.ResourcePost, resourceID string) (bool, error) {
	resourceOID, err := primitive.ObjectIDFromHex(resourceID)
	filter := bson.M{"_id": resourceOID}
	projection := bson.D{{"$push", bson.D{{"posts", post}}}}

	result, err := collectionHelper.UpdateOne(context.Background(), filter, projection)
	if err != nil {
		return false, err
	}

	if collectionHelper.GetModifiedCount(result) == 0 {
		return false, errors.New("Failed to add post to resource - No documents modified")
	}
	return collectionHelper.GetUpsertedID(result), nil
}

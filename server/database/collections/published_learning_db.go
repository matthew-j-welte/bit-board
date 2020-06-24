package collections

import (
	"context"
	"errors"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourcesDB = "resources"

// GetResources get all learning resources
func GetResources() ([]bson.M, error) {
	return getResources(getCollection(resourcesDB))
}

// AddPostToResource adds a post to a learning resource
func AddPostToResource(post resources.ResourcePost, resourceID string) (string, error) {
	return addPost(getCollection(resourcesDB), post, resourceID)
}

func getResources(collectionHelper database.CollectionHelper) ([]bson.M, error) {
	var resources []bson.M
	cursor, err := collectionHelper.Find(context.Background(), bson.D{}, nil)
	if err != nil {
		return nil, err
	}
	resources, err = cursor.DecodeCursor(resources)
	if err != nil {
		return nil, err
	}
	return resources, nil
}

func addPost(collectionHelper database.CollectionHelper, post resources.ResourcePost, resourceID string) (string, error) {
	// TODO: move this ?
	resourceOID, err := primitive.ObjectIDFromHex(resourceID)
	filter := bson.M{"_id": resourceOID}
	projection := bson.D{{"$push", bson.D{{"posts", post}}}}

	result, err := collectionHelper.UpdateOne(context.Background(), filter, projection)
	if err != nil {
		return "", err
	}

	if collectionHelper.GetModifiedCount(result) == 0 {
		return "", errors.New("Failed to add post to resource - No documents modified")
	}
	return post.ID.Hex(), nil
}

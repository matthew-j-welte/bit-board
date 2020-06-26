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
	return addPostToResource(getCollection(resourcesDB), post, resourceID)
}

// IncrementResourceViews increments the views on a resource
func IncrementResourceViews(resourceID string) (int, error) {
	return incrementResourceViews(getCollection(resourcesDB), resourceID)
}

// IncrementResourcePostLikeCount increments the likes on a resources post
func IncrementResourcePostLikeCount(resourceID string, postID string) (int, error) {
	return incrementResourcePostLikeCount(getCollection(resourcesDB), resourceID, postID)
}

// DecrementResourcePostLikeCount decrements the likes on a resources post
func DecrementResourcePostLikeCount(resourceID string, postID string) (int, error) {
	return decrementResourcePostLikeCount(getCollection(resourcesDB), resourceID, postID)
}

// IncrementResourcePostReportCount increments the likes on a resources post
func IncrementResourcePostReportCount(resourceID string, postID string) (int, error) {
	return incrementResourcePostReportCount(getCollection(resourcesDB), resourceID, postID)
}

// DecrementResourcePostReportCount decrements the likes on a resources post
func DecrementResourcePostReportCount(resourceID string, postID string) (int, error) {
	return decrementResourcePostReportCount(getCollection(resourcesDB), resourceID, postID)
}

func getResources(collectionHelper database.CollectionHelper) ([]bson.M, error) {
	var resources []bson.M
	cursor, err := collectionHelper.Find(context.Background(), bson.D{}, nil)
	if err != nil {
		return nil, err
	}

	if cursor == nil {
		return nil, errors.New("No cursor returned from the Find query")
	}

	resources, err = cursor.Decode()
	if err != nil {
		return nil, err
	}
	return resources, nil
}

func addPostToResource(collectionHelper database.CollectionHelper, post resources.ResourcePost, resourceID string) (string, error) {
	if post.ID == primitive.NilObjectID {
		post.ID = primitive.NewObjectID()
	}

	result, err := collectionHelper.PushToArray(resourceID, "posts", post)
	if err != nil {
		return "", err
	}

	if collectionHelper.GetModifiedCount(result) == 0 {
		return "", errors.New("Failed to add post to resource - No documents modified")
	}
	return post.ID.Hex(), nil
}

func incrementResourceViews(collectionHelper database.CollectionHelper, resourceID string) (int, error) {
	return collectionHelper.IncrementField(resourceID, "viewers")
}

func incrementResourcePostLikeCount(collectionHelper database.CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.IncrementFieldInObjectArray(resourceID, "posts", postID, "likes")
}

func decrementResourcePostLikeCount(collectionHelper database.CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.DecrementFieldInObjectArray(resourceID, "posts", postID, "likes")
}

func incrementResourcePostReportCount(collectionHelper database.CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.IncrementFieldInObjectArray(resourceID, "posts", postID, "reports")
}

func decrementResourcePostReportCount(collectionHelper database.CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.DecrementFieldInObjectArray(resourceID, "posts", postID, "reports")
}

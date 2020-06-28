package database

import (
	"context"
	"errors"

	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourcesDB = "resources"

type LearningAccessor interface {
	GetAll() ([]bson.M, error)
	AddPostToResource(post resources.ResourcePost, resourceID string) (string, error)
	IncrementResourceViews(resourceID string) (int, error)
	IncrementResourcePostLikeCount(resourceID string, postID string) (int, error)
	DecrementResourcePostLikeCount(resourceID string, postID string) (int, error)
	IncrementResourcePostReportCount(resourceID string, postID string) (int, error)
	DecrementResourcePostReportCount(resourceID string, postID string) (int, error)
}

type LearningDB struct {
	*Database
}

// GetResources get all learning resources
func (db *LearningDB) GetAll() ([]bson.M, error) {
	return getResources(db.GetCollection(resourcesDB))
}

// AddPostToResource adds a post to a learning resource
func (db *LearningDB) AddPostToResource(post resources.ResourcePost, resourceID string) (string, error) {
	return addPostToResource(db.GetCollection(resourcesDB), post, resourceID)
}

// IncrementResourceViews increments the views on a resource
func (db *LearningDB) IncrementResourceViews(resourceID string) (int, error) {
	return incrementResourceViews(db.GetCollection(resourcesDB), resourceID)
}

// IncrementResourcePostLikeCount increments the likes on a resources post
func (db *LearningDB) IncrementResourcePostLikeCount(resourceID string, postID string) (int, error) {
	return incrementResourcePostLikeCount(db.GetCollection(resourcesDB), resourceID, postID)
}

// DecrementResourcePostLikeCount decrements the likes on a resources post
func (db *LearningDB) DecrementResourcePostLikeCount(resourceID string, postID string) (int, error) {
	return decrementResourcePostLikeCount(db.GetCollection(resourcesDB), resourceID, postID)
}

// IncrementResourcePostReportCount increments the likes on a resources post
func (db *LearningDB) IncrementResourcePostReportCount(resourceID string, postID string) (int, error) {
	return incrementResourcePostReportCount(db.GetCollection(resourcesDB), resourceID, postID)
}

// DecrementResourcePostReportCount decrements the likes on a resources post
func (db *LearningDB) DecrementResourcePostReportCount(resourceID string, postID string) (int, error) {
	return decrementResourcePostReportCount(db.GetCollection(resourcesDB), resourceID, postID)
}

func getResources(collectionHelper CollectionHelper) ([]bson.M, error) {
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

func addPostToResource(collectionHelper CollectionHelper, post resources.ResourcePost, resourceID string) (string, error) {
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

func incrementResourceViews(collectionHelper CollectionHelper, resourceID string) (int, error) {
	return collectionHelper.IncrementField(resourceID, "viewers")
}

func incrementResourcePostLikeCount(collectionHelper CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.IncrementFieldInObjectArray(resourceID, "posts", postID, "likes")
}

func decrementResourcePostLikeCount(collectionHelper CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.DecrementFieldInObjectArray(resourceID, "posts", postID, "likes")
}

func incrementResourcePostReportCount(collectionHelper CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.IncrementFieldInObjectArray(resourceID, "posts", postID, "reports")
}

func decrementResourcePostReportCount(collectionHelper CollectionHelper, resourceID string, postID string) (int, error) {
	return collectionHelper.DecrementFieldInObjectArray(resourceID, "posts", postID, "reports")
}

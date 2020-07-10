package database

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoCollection coll around the mongo-driver collection struct
type MongoCollection interface {
	FindOne(filter interface{}, opts ...*options.FindOneOptions) *mongo.SingleResult
	Find(filter interface{}, opts ...*options.FindOptions) (*mongo.Cursor, error)
	InsertOne(interface{}) (*mongo.InsertOneResult, error)
	DeleteOne(filter interface{}) (*mongo.DeleteResult, error)
	CountDocuments(filter interface{}, opts ...*options.CountOptions) (int64, error)
	UpdateOne(filter interface{}, projection interface{}) (*mongo.UpdateResult, error)
	FindOneAndUpdate(filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) *mongo.SingleResult
}

// The last thing to do would be to find a way to interchangably

type mongoAccessor struct {
	dbCollection *mongo.Collection
}

func (accessor *mongoAccessor) FindOne(filter interface{}, opts ...*options.FindOneOptions) *mongo.SingleResult {
	return accessor.dbCollection.FindOne(context.Background(), filter, opts...)
}

func (accessor *mongoAccessor) InsertOne(document interface{}) (*mongo.InsertOneResult, error) {
	return accessor.dbCollection.InsertOne(context.Background(), document)
}

func (accessor *mongoAccessor) DeleteOne(filter interface{}) (*mongo.DeleteResult, error) {
	return accessor.dbCollection.DeleteOne(context.Background(), filter)
}

func (accessor *mongoAccessor) UpdateOne(filter interface{}, projection interface{}) (*mongo.UpdateResult, error) {
	return accessor.dbCollection.UpdateOne(context.Background(), filter, projection)
}

func (accessor *mongoAccessor) Find(filter interface{}, opts ...*options.FindOptions) (*mongo.Cursor, error) {
	return accessor.dbCollection.Find(context.Background(), filter, opts...)
}

func (accessor *mongoAccessor) CountDocuments(filter interface{}, opts ...*options.CountOptions) (int64, error) {
	return accessor.dbCollection.CountDocuments(context.Background(), filter, opts...)
}

func (accessor *mongoAccessor) FindOneAndUpdate(filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) *mongo.SingleResult {
	return accessor.dbCollection.FindOneAndUpdate(context.Background(), filter, update, opts...)
}

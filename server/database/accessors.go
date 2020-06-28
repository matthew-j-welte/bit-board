package database

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CollectionHelper wrapper around the mongo-driver Collection type
type CollectionHelper interface {
	FindOne(context.Context, interface{}, interface{}) SingleResultHelper
	Find(context.Context, interface{}, interface{}) (ManyResultsHelper, error)
	InsertOne(context.Context, interface{}) (interface{}, error)
	DeleteOne(ctx context.Context, filter interface{}) (int64, error)
	GetInsertID(result interface{}) string
	GetModifiedCount(result interface{}) int64
	UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error)
	PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error)
	CountRecords(filter interface{}) (int64, error)
	CountAllRecords() (int64, error)
	GetObjectIDFromFilter(identifier bson.M) (string, error)
	GetSubArray(primaryID string, arrayName string) (interface{}, error)
	IncrementField(primaryID string, fieldName string) (int, error)
	DecrementField(primaryID string, fieldName string) (int, error)
	UpdateFieldCount(primaryID string, fieldName string, amount int) (int, error)
	IncrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error)
	DecrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error)
	UpdateCountFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string, val int) (int, error)
}

type mongoCollection struct {
	dbCollection *mongo.Collection
}

// CountAllRecords returns the amount of documents in a table
func (wrapper *mongoCollection) CountAllRecords() (int64, error) {
	return wrapper.CountRecords(bson.M{})
}

// CountRecords returns the amount of documents in a table
func (wrapper *mongoCollection) CountRecords(filter interface{}) (int64, error) {
	return wrapper.dbCollection.CountDocuments(context.Background(), filter)
}

func (wrapper *mongoCollection) FindOne(ctx context.Context, filter interface{}, opts interface{}) SingleResultHelper {
	var singleResult *mongo.SingleResult
	if opts != nil {
		singleResult = wrapper.dbCollection.FindOne(ctx, filter, options.FindOne().SetProjection(opts))
	} else {
		singleResult = wrapper.dbCollection.FindOne(ctx, filter)
	}
	return &mongoSingleResult{dbSingleResult: singleResult}
}

func (wrapper *mongoCollection) InsertOne(ctx context.Context, document interface{}) (interface{}, error) {
	id, err := wrapper.dbCollection.InsertOne(ctx, document)
	return id.InsertedID, err
}

func (wrapper *mongoCollection) DeleteOne(ctx context.Context, filter interface{}) (int64, error) {
	count, err := wrapper.dbCollection.DeleteOne(ctx, filter)
	return count.DeletedCount, err
}

func (wrapper *mongoCollection) GetInsertID(result interface{}) string {
	insertID := result.(primitive.ObjectID)
	return insertID.Hex()
}

func (wrapper *mongoCollection) UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error) {
	return wrapper.dbCollection.UpdateOne(ctx, filter, projection)
}

func (wrapper *mongoCollection) GetModifiedCount(result interface{}) int64 {
	return result.(*mongo.UpdateResult).ModifiedCount
}

// IncrementField increments a value on a document by one
func (wrapper *mongoCollection) IncrementField(primaryID string, fieldName string) (int, error) {
	return wrapper.UpdateFieldCount(primaryID, fieldName, 1)
}

// IncrementField decrements a value on a document by one
func (wrapper *mongoCollection) DecrementField(primaryID string, fieldName string) (int, error) {
	return wrapper.UpdateFieldCount(primaryID, fieldName, -1)
}

// UpdateFieldCount increment/decrements an int value in a document by value passed in
func (wrapper *mongoCollection) UpdateFieldCount(primaryID string, fieldName string, val int) (int, error) {
	objectID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return 0, err
	}

	filter := bson.M{"_id": objectID}
	projection := bson.M{fieldName: val}
	updateExpr := bson.M{"$inc": projection}
	result := wrapper.updateAndReturnValue(filter, updateExpr, projection)
	if result.Err() != nil {
		return 0, result.Err()
	}

	document := bson.M{}
	result.Decode(document)
	updatedVal := int(document[fieldName].(int32)) + val
	return updatedVal, nil
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (wrapper *mongoCollection) IncrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	return wrapper.UpdateCountFieldInObjectArray(primaryID, arrName, arrayElementID, arrayObjectField, 1)
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (wrapper *mongoCollection) DecrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	return wrapper.UpdateCountFieldInObjectArray(primaryID, arrName, arrayElementID, arrayObjectField, -1)
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (wrapper *mongoCollection) UpdateCountFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string, val int) (int, error) {
	objectID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return 0, nil
	}
	arrObjectID, err := primitive.ObjectIDFromHex(arrayElementID)
	if err != nil {
		return 0, nil
	}

	filterExpr := bson.M{
		"_id":            objectID,
		arrName + "._id": arrObjectID,
	}
	projection := bson.M{
		arrName + ".$." + arrayObjectField: val,
	}
	updateExpr := bson.M{"$inc": projection}

	result := wrapper.updateAndReturnValue(filterExpr, updateExpr, projection)
	if result.Err() != nil {
		return 0, result.Err()
	}
	document := bson.M{}
	result.Decode(document)
	updatedVal := int(document[arrName].(bson.A)[0].(bson.M)[arrayObjectField].(int32)) + val
	return updatedVal, nil
}

func (wrapper *mongoCollection) updateAndReturnValue(filter bson.M, updateExpr bson.M, returnProjection bson.M) *mongo.SingleResult {
	ctx := context.Background()
	// after := options.After
	findOpts := options.FindOneAndUpdateOptions{
		// ReturnDocument: &after,
		Projection: returnProjection,
	}
	return wrapper.dbCollection.FindOneAndUpdate(ctx, filter, updateExpr, &findOpts)
}

func (wrapper *mongoCollection) GetObjectIDFromFilter(identifier bson.M) (string, error) {
	var result bson.M
	wrapper.dbCollection.FindOne(
		context.Background(),
		identifier,
		options.FindOne().SetProjection(bson.M{"_id": 1}),
	).Decode(&result)
	if oid, ok := result["_id"]; ok {
		return oid.(primitive.ObjectID).Hex(), nil
	}

	return "", errors.New("Could not retrieve document ID")
}

func (wrapper *mongoCollection) Find(ctx context.Context, filter interface{}, projection interface{}) (ManyResultsHelper, error) {
	var cursor *mongo.Cursor
	var err error

	if projection != nil {
		cursor, err = wrapper.dbCollection.Find(ctx, filter, projection.(*options.FindOptions))
	} else {
		cursor, err = wrapper.dbCollection.Find(ctx, filter)
	}

	if err != nil {
		return nil, err
	}
	return &mongoManyResult{mongoCursor: cursor}, nil
}

func (wrapper *mongoCollection) GetSubArray(primaryID string, arrayName string) (interface{}, error) {
	documentOID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return nil, err
	}
	var result bson.M
	filter := bson.M{"_id": documentOID}
	projection := bson.M{"_id": 0, arrayName: 1}
	options := options.FindOne().SetProjection(projection)

	wrapper.dbCollection.FindOne(context.Background(), filter, options).Decode(&result)
	return result[arrayName], nil
}

func (wrapper *mongoCollection) PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error) {
	documentOID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": documentOID}
	projection := bson.M{"$push": bson.M{arrayName: payload}}
	return wrapper.UpdateOne(context.Background(), filter, projection)
}

package database

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CollectionHelper Helper functions for completing common collection CRUD
type CollectionHelper interface {
	FindOne(filter interface{}, opts ...*options.FindOneOptions) SingleResultHelper
	Find(interface{}, interface{}) (ManyResultsHelper, error)
	InsertOne(interface{}) (interface{}, error)
	DeleteOne(filter interface{}) (int64, error)
	CountDocuments(filter interface{}, opts ...*options.CountOptions) (int64, error)
	UpdateOne(filter interface{}, projection interface{}) (interface{}, error)
	FindOneAndUpdate(filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) SingleResultHelper
	GetInsertID(result interface{}) string
	GetModifiedCount(result interface{}) int64
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
	accessor MongoCollection
}

func GetAccessor(accessor MongoCollection) CollectionHelper {
	return &mongoCollection{
		accessor: accessor,
	}
}

// CountAllRecords returns the amount of documents in a table
func (coll *mongoCollection) CountAllRecords() (int64, error) {
	return coll.accessor.CountDocuments(bson.M{})
}

// CountRecords returns the amount of documents in a table
func (coll *mongoCollection) CountRecords(filter interface{}) (int64, error) {
	return coll.accessor.CountDocuments(filter)
}

func (coll *mongoCollection) FindOne(filter interface{}, opts ...*options.FindOneOptions) SingleResultHelper {
	var singleResult *mongo.SingleResult
	singleResult = coll.accessor.FindOne(filter, opts...)
	return &mongoSingleResult{dbSingleResult: singleResult}
}

func (coll *mongoCollection) InsertOne(document interface{}) (interface{}, error) {
	id, err := coll.accessor.InsertOne(document)
	return id.InsertedID, err
}

func (coll *mongoCollection) DeleteOne(filter interface{}) (int64, error) {
	count, err := coll.accessor.DeleteOne(filter)
	return count.DeletedCount, err
}

func (coll *mongoCollection) GetInsertID(result interface{}) string {
	insertID := result.(primitive.ObjectID)
	return insertID.Hex()
}

func (coll *mongoCollection) UpdateOne(filter interface{}, projection interface{}) (interface{}, error) {
	return coll.accessor.UpdateOne(filter, projection)
}

func (coll *mongoCollection) GetModifiedCount(result interface{}) int64 {
	return result.(*mongo.UpdateResult).ModifiedCount
}

// IncrementField increments a value on a document by one
func (coll *mongoCollection) IncrementField(primaryID string, fieldName string) (int, error) {
	return coll.UpdateFieldCount(primaryID, fieldName, 1)
}

// IncrementField decrements a value on a document by one
func (coll *mongoCollection) DecrementField(primaryID string, fieldName string) (int, error) {
	return coll.UpdateFieldCount(primaryID, fieldName, -1)
}

// UpdateFieldCount increment/decrements an int value in a document by value passed in
func (coll *mongoCollection) UpdateFieldCount(primaryID string, fieldName string, val int) (int, error) {
	objectID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return 0, err
	}

	filter := bson.M{"_id": objectID}
	projection := bson.M{fieldName: val}
	updateExpr := bson.M{"$inc": projection}
	result := coll.updateAndReturnValue(filter, updateExpr, projection)
	if result.Err() != nil {
		return 0, result.Err()
	}

	document := bson.M{}
	result.Decode(document)
	updatedVal := int(document[fieldName].(int32)) + val
	return updatedVal, nil
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (coll *mongoCollection) IncrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	return coll.UpdateCountFieldInObjectArray(primaryID, arrName, arrayElementID, arrayObjectField, 1)
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (coll *mongoCollection) DecrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	return coll.UpdateCountFieldInObjectArray(primaryID, arrName, arrayElementID, arrayObjectField, -1)
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (coll *mongoCollection) UpdateCountFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string, val int) (int, error) {
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

	result := coll.updateAndReturnValue(filterExpr, updateExpr, projection)
	if result.Err() != nil {
		return 0, result.Err()
	}
	document := bson.M{}
	result.Decode(document)
	updatedVal := int(document[arrName].(bson.A)[0].(bson.M)[arrayObjectField].(int32)) + val
	return updatedVal, nil
}

func (coll *mongoCollection) updateAndReturnValue(filter bson.M, updateExpr bson.M, returnProjection bson.M) *mongo.SingleResult {
	findOpts := options.FindOneAndUpdateOptions{
		Projection: returnProjection,
	}
	return coll.accessor.FindOneAndUpdate(filter, updateExpr, &findOpts)
}

func (coll *mongoCollection) GetObjectIDFromFilter(identifier bson.M) (string, error) {
	var result bson.M
	coll.accessor.FindOne(
		identifier,
		options.FindOne().SetProjection(bson.M{"_id": 1}),
	).Decode(&result)
	if oid, ok := result["_id"]; ok {
		return oid.(primitive.ObjectID).Hex(), nil
	}

	return "", errors.New("Could not retrieve document ID")
}

func (coll *mongoCollection) Find(filter interface{}, projection interface{}) (ManyResultsHelper, error) {
	var cursor *mongo.Cursor
	var err error

	if projection != nil {
		cursor, err = coll.accessor.Find(filter, projection.(*options.FindOptions))
	} else {
		cursor, err = coll.accessor.Find(filter)
	}

	if err != nil {
		return nil, err
	}
	return &mongoManyResult{mongoCursor: cursor}, nil
}

func (coll *mongoCollection) GetSubArray(primaryID string, arrayName string) (interface{}, error) {
	documentOID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return nil, err
	}
	var result bson.M
	filter := bson.M{"_id": documentOID}
	projection := bson.M{"_id": 0, arrayName: 1}
	options := options.FindOne().SetProjection(projection)

	coll.accessor.FindOne(filter, options).Decode(&result)
	return result[arrayName], nil
}

func (coll *mongoCollection) PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error) {
	documentOID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": documentOID}
	projection := bson.M{"$push": bson.M{arrayName: payload}}
	return coll.accessor.UpdateOne(filter, projection)
}

func (coll *mongoCollection) CountDocuments(filter interface{}, opts ...*options.CountOptions) (int64, error) {
	return coll.accessor.CountDocuments(filter, opts...)
}

func (coll *mongoCollection) FindOneAndUpdate(filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) SingleResultHelper {
	return coll.accessor.FindOneAndUpdate(filter, update, opts...)
}

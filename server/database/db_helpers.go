package database

import (
	"context"
	"errors"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetIDFromValue returns an id based on a passed in identifier
func GetIDFromValue(coll *mongo.Collection, identifier bson.M) (string, error) {
	result, err := FindOneRecordWithProjectionCustomQuery(
		coll, identifier, bson.D{{"_id", 1}})
	return result["_id"].(primitive.ObjectID).Hex(), err
}

// CountRecords returns the amount of documents in a table
func CountRecords(coll *mongo.Collection) (int64, error) {
	return coll.CountDocuments(context.Background(), bson.M{})
}

// FindOneRecord query a single record in the db
func FindOneRecord(coll *mongo.Collection, id string) (bson.M, error) {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		bson.D{{"_id", id}}).Decode(&result)
	return result, err
}

// FindOneRecordWithProjection query a single record in the db with a projection expr
func FindOneRecordWithProjection(coll *mongo.Collection, id string, projection bson.D) (bson.M, error) {
	userOid, err := primitive.ObjectIDFromHex(id)
	var result bson.M
	err = coll.FindOne(
		context.Background(),
		bson.D{{"_id", userOid}},
		options.FindOne().SetProjection(projection)).Decode(&result)
	return result, err
}

// FindOneRecordWithProjectionCustomQuery query a single record in the db with a projection expr and custom identifier
func FindOneRecordWithProjectionCustomQuery(coll *mongo.Collection, query bson.M, projection bson.D) (bson.M, error) {
	var result bson.M
	err := coll.FindOne(
		context.Background(),
		query,
		options.FindOne().SetProjection(projection)).Decode(&result)
	return result, err
}

// CreateSubResource creates a new sub resource on a document
func CreateSubResource(coll *mongo.Collection, primaryID string, filterExpr bson.D) (bool, error) {
	primaryOID, err := primitive.ObjectIDFromHex(primaryID)
	result, err := coll.UpdateOne(
		context.Background(),
		bson.M{"_id": primaryOID},
		filterExpr,
	)

	if err != nil {
		return false, err
	}
	if result.ModifiedCount == 0 {
		return false, errors.New("No user associated with this userId")
	}

	return true, nil
}

// CreateResourceSuggestion creates a learning resource suggestion in the db

// IncrementField increments a value on a document
func IncrementField(coll *mongo.Collection, resourceID string, field string) (bool, error) {
	resourceOID, err := primitive.ObjectIDFromHex(resourceID)
	result, err := coll.UpdateOne(
		context.Background(),
		bson.M{"_id": resourceOID},
		bson.D{
			{"$inc", bson.D{{field, 1}}}})

	if err != nil {
		return false, err
	}
	if result.ModifiedCount == 0 {
		return false, errors.New("Failed to incrememnt")
	}
	if result.ModifiedCount > 1 {
		log.Printf("[WARNING] More than one record found for ID: %s\n", resourceID)
	}
	return true, nil
}

// IncrementFieldInObjectArray increments a value on a document
func IncrementFieldInObjectArray(coll *mongo.Collection, hexID string, arrName string, arrHexID string, field string, val int) (bool, error) {
	objectID, err := primitive.ObjectIDFromHex(hexID)
	arrObjectID, err := primitive.ObjectIDFromHex(arrHexID)

	filterExpr := bson.M{
		"_id":            objectID,
		arrName + "._id": arrObjectID,
	}
	projectionExpr := bson.M{
		"$inc": bson.M{
			arrName + ".$." + field: val,
		},
	}

	result, err := coll.UpdateOne(
		context.Background(),
		filterExpr,
		projectionExpr,
	)

	if err != nil {
		return false, err
	}
	if result.ModifiedCount == 0 {
		return false, errors.New("Failed to incrememnt")
	}
	if result.ModifiedCount > 1 {
		log.Printf("[WARNING] More than one record found for ID: %s\n", hexID)
	}
	return true, nil
}

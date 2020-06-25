package database

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DBHelper wrapper around the mongo-driver Database type
type DBHelper interface {
	Collection(name string) CollectionHelper
	Client() ClientHelper
}

// CollectionHelper wrapper around the mongo-driver Collection type
type CollectionHelper interface {
	FindOne(context.Context, interface{}) SingleResultHelper
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
}

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type SingleResultHelper interface {
	Decode(v interface{}) error
}

// ManyResultsHelper wrapper around the mongo-driver Cursor type
type ManyResultsHelper interface {
	Decode() ([]bson.M, error)
}

// ClientHelper wrapper around the mongo-driver client
type ClientHelper interface {
	Database(string) DBHelper
	Connect() error
	StartSession() (mongo.Session, error)
}

type mongoClient struct {
	dbClient *mongo.Client
}

type mongoDatabase struct {
	db *mongo.Database
}

type mongoCollection struct {
	dbCollection *mongo.Collection
}

type mongoSingleResult struct {
	dbSingleResult *mongo.SingleResult
}

type mongoManyResult struct {
	mongoCursor *mongo.Cursor
}

type mongoSession struct {
	mongo.Session
}

// NewClient grabs a new database client
func NewClient() (ClientHelper, error) {
	client, err := mongo.NewClient(options.Client().ApplyURI(MongoURI))
	return &mongoClient{dbClient: client}, err
}

// NewDatabase grabs a new database
func NewDatabase(client ClientHelper) DBHelper {
	return client.Database(DBName)
}

func (wrapper *mongoClient) Database(dbName string) DBHelper {
	db := wrapper.dbClient.Database(dbName)
	return &mongoDatabase{db: db}
}

func (wrapper *mongoClient) StartSession() (mongo.Session, error) {
	session, err := wrapper.dbClient.StartSession()
	return &mongoSession{session}, err
}

func (wrapper *mongoClient) Connect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	err := wrapper.dbClient.Connect(ctx)
	if err != nil {
		return err
	}
	err = wrapper.dbClient.Ping(ctx, nil)
	if err != nil {
		return err
	}
	return nil
}

// TestConnection checks if we can connect to our mongo URI
func TestConnection() error {
	client, _ := NewClient()
	return client.Connect()
}

func (wrapper *mongoDatabase) Collection(colName string) CollectionHelper {
	collection := wrapper.db.Collection(colName)
	return &mongoCollection{dbCollection: collection}
}

func (wrapper *mongoDatabase) Client() ClientHelper {
	client := wrapper.db.Client()
	return &mongoClient{dbClient: client}
}

// CountAllRecords returns the amount of documents in a table
func (wrapper *mongoCollection) CountAllRecords() (int64, error) {
	return wrapper.CountRecords(bson.M{})
}

// CountRecords returns the amount of documents in a table
func (wrapper *mongoCollection) CountRecords(filter interface{}) (int64, error) {
	return wrapper.dbCollection.CountDocuments(context.Background(), filter)
}

func (wrapper *mongoCollection) FindOne(ctx context.Context, filter interface{}) SingleResultHelper {
	singleResult := wrapper.dbCollection.FindOne(ctx, filter)
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

func (wrapper *mongoSingleResult) Decode(payload interface{}) error {
	return wrapper.dbSingleResult.Decode(payload)
}

func (wrapper *mongoCollection) GetModifiedCount(result interface{}) int64 {
	return result.(*mongo.UpdateResult).ModifiedCount
}

func (wrapper *mongoCollection) GetObjectIDFromFilter(identifier bson.M) (string, error) {
	var result bson.M
	wrapper.dbCollection.FindOne(
		context.Background(),
		identifier,
		options.FindOne().SetProjection(bson.D{{"_id", 1}}),
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
	projection := bson.D{{"_id", 0}, {arrayName, 1}}
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
	projection := bson.D{{"$push", bson.D{{arrayName, payload}}}}
	return wrapper.UpdateOne(context.Background(), filter, projection)
}

func (wrapper *mongoManyResult) Decode() ([]bson.M, error) {
	var payload []bson.M
	defer wrapper.mongoCursor.Close(context.Background())
	for wrapper.mongoCursor.Next(context.Background()) {
		var result bson.M
		err := wrapper.mongoCursor.Decode(&result)
		if err != nil {
			return nil, wrapper.mongoCursor.Err()
		}
		payload = append(payload, result)
	}
	return payload, wrapper.mongoCursor.Err()
}

package database

import (
	"context"
	"time"

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
	InsertOne(context.Context, interface{}) (interface{}, error)
	DeleteOne(ctx context.Context, filter interface{}) (int64, error)
	GetInsertID(result interface{}) string
	GetUpsertedID(result interface{}) string
	GetModifiedCount(result interface{}) int64
	UpdateOne(ctx context.Context, filter interface{}, projection interface{})
}

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type SingleResultHelper interface {
	Decode(v interface{}) error
}

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type ManyResultsHelper interface {
	GetIterations(v interface{}) interface{}
}

// InsertedRecordHelper wrapper around the mongo-driver InsertResult
type InsertedRecordHelper interface {
	Decode(v interface{}) error
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
	dbManyResult *mongo.SingleResult
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
	connection := wrapper.dbClient.Connect(ctx)
	wrapper.dbClient.Ping(ctx, nil)
	return connection
}

func (wrapper *mongoDatabase) Collection(colName string) CollectionHelper {
	collection := wrapper.db.Collection(colName)
	return &mongoCollection{dbCollection: collection}
}

func (wrapper *mongoDatabase) Client() ClientHelper {
	client := wrapper.db.Client()
	return &mongoClient{dbClient: client}
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

func (wrapper *mongoCollection) GetUpsertedID(result interface{}) string {
	insertID := result.(primitive.ObjectID)
	return insertID.Hex()
}

func (wrapper *mongoCollection) UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error) {
	return wrapper.dbCollection.UpdateOne(ctx, filter, projection)
}

func (result *mongoSingleResult) Decode(payload interface{}) error {
	return result.dbSingleResult.Decode(payload)
}

// Will have to figure out how to do this - decode using one interface ?
// decode by looping through and using the interface on each iteration?
func (result *mongoManyResult) GetIterations(payload interface{}) error {
	return result.dbManyResult.Decode(payload)
}

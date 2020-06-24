package database

import (
	"context"
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
}

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type SingleResultHelper interface {
	Decode(v interface{}) error
}

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type ManyResultsHelper interface {
	DecodeCursor(v []bson.M) ([]bson.M, error)
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

func (wrapper *mongoCollection) UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error) {
	return wrapper.dbCollection.UpdateOne(ctx, filter, projection)
}

func (wrapper *mongoSingleResult) Decode(payload interface{}) error {
	return wrapper.dbSingleResult.Decode(payload)
}

func (wrapper *mongoCollection) GetModifiedCount(result interface{}) int64 {
	return result.(*mongo.UpdateResult).ModifiedCount
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

// Will have to figure out how to do this - decode using one interface ?
// decode by looping through and using the interface on each iteration?
func (wrapper *mongoManyResult) DecodeCursor(payload []bson.M) ([]bson.M, error) {
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

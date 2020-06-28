package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DBHelper wrapper around the mongo-driver Database type
type DBHelper interface {
	Collection(name string) CollectionHelper
	GetCollection(name string) CollectionHelper
	Client() ClientHelper
}

// ClientHelper wrapper around the mongo-driver client
type ClientHelper interface {
	Database(string) DBHelper
	Connect() error
	StartSession() (mongo.Session, error)
}

// Database main database struct
type Database struct {
	db                  *mongo.Database
	ErrorReports        ErrorReportDB
	Learning            LearningDB
	LearningSuggestions LearningSuggestionDB
	Users               UserDB
}

type mongoClient struct {
	dbClient *mongo.Client
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

// TestConnection checks if we can connect to our mongo URI
func TestConnection() error {
	client, _ := NewClient()
	return client.Connect()
}

func (wrapper *mongoClient) Database(dbName string) DBHelper {
	db := wrapper.dbClient.Database(dbName)
	return &Database{db: db}
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

func (wrapper *Database) Client() ClientHelper {
	client := wrapper.db.Client()
	return &mongoClient{dbClient: client}
}

func (wrapper *Database) Collection(colName string) CollectionHelper {
	collection := wrapper.db.Collection(colName)
	return &mongoCollection{dbCollection: collection}
}

func (wrapper *Database) GetCollection(name string) CollectionHelper {
	client, _ := NewClient()
	client.Connect()
	return NewDatabase(client).Collection(name)
}

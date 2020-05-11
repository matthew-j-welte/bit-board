package middleware

import (
	"context"
	"log"
	"os"
	"time"

	_ "./dataaccess" // import dataaccess helpers

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const mongoURI = "mongodb://127.0.0.1:27018/"
const dbName = "bitboard-dev"

type mongoConnection struct{}
type serverConnector interface {
	connectToServer(ctx context.Context, mongoClient *mongo.Client) error
	testServerConnection(ctx context.Context, mongoClient *mongo.Client) error
	getLogger() *log.Logger
}

var mongoConnector serverConnector

// MongoDatabase returns the singleton database instance
func MongoDatabase() *mongo.Database {
	mongoConnector = mongoConnection{}
	client := initialize(options.Client().ApplyURI(mongoURI), mongoConnector)
	return client.Database(dbName)
}

func initialize(clientOptions *options.ClientOptions, serverConnectorHelper serverConnector) *mongo.Client {
	logger := serverConnectorHelper.getLogger()
	mongoClient, err := mongo.NewClient(clientOptions)
	if err != nil {
		logger.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	logger.Println("Passed ctx")
	if err := serverConnectorHelper.connectToServer(ctx, mongoClient); err != nil {
		logger.Fatal(err)
	}

	logger.Println("Attempting to connect to mongo server...")
	if err := serverConnectorHelper.testServerConnection(ctx, mongoClient); err != nil {
		logger.Fatal(err)
	}
	logger.Println("Successfully Connected to MongoDB")
	return mongoClient
}

func (m mongoConnection) getLogger() *log.Logger {
	return log.New(os.Stdout, "SERVER: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func (m mongoConnection) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return mongoClient.Connect(ctx)
}

func (m mongoConnection) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return mongoClient.Ping(ctx, nil)
}

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

var client *mongo.Client

type dBInitializer struct {
	client        *mongo.Client
	clientOptions *options.ClientOptions
	logger        *log.Logger
}

func init() {
	logger := log.New(os.Stdout, "SERVER: ", log.Ldate|log.Ltime|log.Lshortfile)
	clientOptions := options.Client().ApplyURI(mongoURI)
	client = initMongoClient(client, clientOptions, logger)
}

func (initializer dBInitializer) initialize() *mongo.Client {
	var err error
	mongoClient, err = mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	if err := connectToServer(ctx, mongoClient); err != nil {
		logger.Fatal(err)
	}

	logger.Println("Attempting to connect to mongo server...")
	if err := testServerConnection(ctx, mongoClient); err != nil {
		logger.Fatal(err)
	}
	logger.Println("Successfully Connected to MongoDB")
	return mongoClient
}

func connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return mongoClient.Connect(ctx)
}

func testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return mongoClient.Ping(ctx, nil)
}

// MongoDatabase returns the singleton database instance
func MongoDatabase() *mongo.Database {
	return client.Database(dbName)
}

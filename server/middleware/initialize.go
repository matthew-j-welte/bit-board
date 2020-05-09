package middleware

import (
	"context"
	"fmt"
	"log"
	"time"

	_ "./dataaccess" // import dataaccess helpers

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const mongoURI = "mongodb://127.0.0.1:27018/"
const dbName = "bitboard-dev"

var client *mongo.Client

func init() {
	clientOptions := options.Client().ApplyURI(mongoURI)
	var err error
	client, err = mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	err = client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")
}

// MongoDatabase returns the singleton database instance
func MongoDatabase() *mongo.Database {
	return client.Database(dbName)
}

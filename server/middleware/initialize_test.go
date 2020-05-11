package middleware

import (
	"context"
	"io/ioutil"
	"log"
	"testing"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type successMongoConnection struct{}

func discardLogger() *log.Logger {
	return log.New(ioutil.Discard, "", 0)
}

func (m successMongoConnection) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m successMongoConnection) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m successMongoConnection) getLogger() *log.Logger {
	return discardLogger()
}

func TestInitializeSuccess(t *testing.T) {
	var mockMongoConnector serverConnector
	mockMongoConnector = successMongoConnection{}
	initialize(options.Client().ApplyURI(mongoURI), mockMongoConnector)
}

type failServerInitMongoConnection struct{}

func (m failServerInitMongoConnection) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return errors.new("type")
}

func (m failServerInitMongoConnection) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m failServerInitMongoConnection) getLogger() *log.Logger {
	return discardLogger()
}

func TestInitializeFailure(t *testing.T) {
	var mockMongoConnector serverConnector
	mockMongoConnector = mockMongoConnection{}
	initialize(options.Client().ApplyURI(mongoURI), mockMongoConnector)
}

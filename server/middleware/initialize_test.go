package middleware

import (
	"context"
	"errors"
	"log"
	"os"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/testutils"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type successMongoConnection struct{}
type failServerInitMongoConnection struct{}

func (m successMongoConnection) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m successMongoConnection) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m successMongoConnection) getLogger() *log.Logger {
	return testutils.GetDiscardLogger()
}

func TestInitializeSuccess(t *testing.T) {
	var mockMongoConnector serverConnector
	mockMongoConnector = successMongoConnection{}
	if initialize(options.Client().ApplyURI(mongoURI), mockMongoConnector) == nil {
		t.Error("Did not return a client")
	}
}

func (m failServerInitMongoConnection) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return errors.New("connectToServer FAILED")
}

func (m failServerInitMongoConnection) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m failServerInitMongoConnection) getLogger() *log.Logger {
	return testutils.GetMockLogger()
}

func TestInitializeFailure(t *testing.T) {
	var mockMongoConnector serverConnector
	mockMongoConnector = failServerInitMongoConnection{}
	osConditionKey := "FATAL_BACKGROUND_PROCESS"
	osConditionVal := "yes"

	if os.Getenv(osConditionKey) == osConditionVal {
		initialize(options.Client().ApplyURI(mongoURI), mockMongoConnector)
		return
	}

	err := testutils.CatchOSExit("TestInitializeFailure", osConditionKey, osConditionVal, "connectToServer FAILED")
	if err != nil {
		t.Error(err)
	}
}

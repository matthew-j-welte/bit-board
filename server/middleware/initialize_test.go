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

type failMongoServerInit struct{}

func (m failMongoServerInit) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return errors.New("connectToServer FAILED")
}

func (m failMongoServerInit) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m failMongoServerInit) getLogger() *log.Logger {
	return testutils.GetMockLogger()
}

func TestInitializeFailure(t *testing.T) {
	var mockMongoConnector serverConnector
	mockMongoConnector = failMongoServerInit{}
	osKey := "FATAL_BACKGROUND_PROCESS"
	osVal := "yes"

	if os.Getenv(osKey) == osVal {
		initialize(options.Client().ApplyURI(mongoURI), mockMongoConnector)
		return
	}

	err := testutils.CatchOSExit("TestInitializeFailure", osKey, osVal, "connectToServer FAILED")
	if err != nil {
		t.Error(err)
	}
}

type failMongoServerConnect struct{}

func (m failMongoServerConnect) connectToServer(ctx context.Context, mongoClient *mongo.Client) error {
	return errors.New("server ping FAILED")
}

func (m failMongoServerConnect) testServerConnection(ctx context.Context, mongoClient *mongo.Client) error {
	return nil
}

func (m failMongoServerConnect) getLogger() *log.Logger {
	return testutils.GetMockLogger()
}

func TestServerConnectionFailure(t *testing.T) {
	var mockMongoConnector serverConnector
	mockMongoConnector = failMongoServerConnect{}
	osKey := "FATAL_BACKGROUND_PROCESS"
	osVal := "yes"

	if os.Getenv(osKey) == osVal {
		initialize(options.Client().ApplyURI(mongoURI), mockMongoConnector)
		return
	}

	err := testutils.CatchOSExit("TestServerConnectionFailure", osKey, osVal, "server ping FAILED")
	if err != nil {
		t.Error(err)
	}
}

package middleware

import (
	"context"
	"errors"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
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

	cmd := exec.Command(os.Args[0], "-test.run=TestInitializeFailure")
	cmd.Env = append(os.Environ(), "FATAL_BACKGROUND_PROCESS=yes")
	stdout, _ := cmd.StdoutPipe()
	if err := cmd.Start(); err != nil {
		t.Fatal(err)
	}

	// Check that the log fatal message is what we expected
	stdoutBinary, _ := ioutil.ReadAll(stdout)
	actualStdout := string(stdoutBinary)
	expected := "connectToServer FAILED"
	actualLogMsg := actualStdout[:len(actualStdout)-1]
	if !strings.HasSuffix(actualLogMsg, expected) {
		t.Fatalf("Unexpected log message. Got %s but should contain %s", actualLogMsg, expected)
	}

	// Check that the program exited
	err := cmd.Wait()
	if e, ok := err.(*exec.ExitError); !ok || e.Success() {
		t.Fatalf("Process ran with err %v, want exit status 1", err)
	}
}

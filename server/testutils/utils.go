package testutils

import (
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"

	"github.com/stretchr/testify/mock"
)

func GetDiscardLogger() *log.Logger {
	return log.New(ioutil.Discard, "", 0)
}

func GetMockLogger() *log.Logger {
	return log.New(os.Stdout, " MOCK:", 0)
}

func CatchOSExit(testName, osKey, osVal, expectedLog string) error {
	cmd := exec.Command(os.Args[0], fmt.Sprintf("-test.run=%s", testName))
	cmd.Env = append(os.Environ(), fmt.Sprintf("%s=%s", osKey, osVal))
	stdout, _ := cmd.StdoutPipe()
	if err := cmd.Start(); err != nil {
		return err
	}

	stdoutBinary, _ := ioutil.ReadAll(stdout)
	actualStdout := string(stdoutBinary)
	expected := expectedLog
	actualLogMsg := actualStdout[:len(actualStdout)-1]
	if !strings.HasSuffix(actualLogMsg, expected) {
		errMsg := fmt.Sprintf("Unexpected log message. Got %s but should contain %s", actualLogMsg, expected)
		return errors.New(errMsg)
	}

	err := cmd.Wait()
	if e, ok := err.(*exec.ExitError); !ok || e.Success() {
		errMsg := fmt.Sprintf("Process ran with err %v, want exit status 1", err)
		return errors.New(errMsg)
	}
	return nil
}

// XArgs helper to get x amount of mock.Anything calls to avoid clogging unit tests with them
func MockArgs(amt int) []interface{} {
	args := []interface{}{}
	for i := 0; i < amt; i++ {
		args = append(args, mock.Anything)
	}
	return args
}

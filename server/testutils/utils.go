package testutils

import (
	"io/ioutil"
	"log"
	"os"
)

func GetDiscardLogger() *log.Logger {
	return log.New(ioutil.Discard, "", 0)
}

func GetMockLogger() *log.Logger {
	return log.New(os.Stdout, " MOCK:", 0)
}

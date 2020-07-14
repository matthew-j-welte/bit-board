package testing

import (
	"github.com/stretchr/testify/mock"
)

// MockArgs helper to get x amount of mock.Anything calls to avoid clogging unit tests with them
func MockArgs(amt int) []interface{} {
	args := []interface{}{}
	for i := 0; i < amt; i++ {
		args = append(args, mock.Anything)
	}
	return args
}

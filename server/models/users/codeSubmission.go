package users

import "github.com/matthew-j-welte/bit-board/server/models/common"

// Submission represents a code submission
type Submission struct {
	common.UID
	Code map[string]string
}

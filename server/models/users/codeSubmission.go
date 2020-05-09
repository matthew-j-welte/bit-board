package users

import "../common"

// Submission represents a code submission
type Submission struct {
	common.UID
	Code map[string]string
}

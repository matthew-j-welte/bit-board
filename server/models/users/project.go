package users

import "github.com/matthew-j-welte/bit-board/server/models/common"

// Project a user project
type Project struct {
	common.UID
	Description string
	Phase       string
	Title       string
	Type        string
}

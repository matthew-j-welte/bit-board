package users

import "../common"

// Project a user project
type Project struct {
	common.UID
	Description string
	Phase       string
	Title       string
	Type        string
}
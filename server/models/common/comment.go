package common

// Comment represents a user comment
type Comment struct {
	UID
	UserID     string `json:"userId"`
	Author     string
	DatePosted int `json:"datePosted"`
	Content    string
}

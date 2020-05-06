package common

// Comment represents a user comment
type Comment struct {
	ID         string `json:"_id"`
	UserID     string `json:"userId"`
	Author     string `json:"author"`
	DatePosted int    `json:"datePosted"`
	Content    string `json:"content"`
}

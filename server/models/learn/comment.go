package learn

// Comment represents a user comment
type Comment struct {
	Author     string `json:"author"`
	DatePosted int    `json:"datePosted"`
	Content    string `json:"content"`
}

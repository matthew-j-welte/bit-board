package users

// Submission represents a code submission
type Submission struct {
	ID   string            `json:"_id"`
	Code map[string]string `json:"code"`
}

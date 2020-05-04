package code

// Submission represents a code submission
type Submission struct {
	ID   string            `json:"id"`
	Code map[string]string `json:"code"`
}

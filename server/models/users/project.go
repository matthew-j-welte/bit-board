package users

// Project a user project
type Project struct {
	ID          string `json:"_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Phase       string `json:"phase"`
	ProjectType string `json:"projectType"`
}

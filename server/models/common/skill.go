package common

// Skill represents a user comment
type Skill struct {
	ID   string `json:"_id"`
	Name string `json:"name"`
	Icon string `json:"icon"`
	Type string `json:"skillType"`
}

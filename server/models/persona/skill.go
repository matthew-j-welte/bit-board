package persona

// Skill a skill for a certain field
type Skill struct {
	Level    int    `json:"level"`
	Percent  int    `json:"percent"`
	Name     string `json:"name"`
	Category string `json:"category"`
}

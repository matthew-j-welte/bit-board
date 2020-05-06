package users

// User the user model
type User struct {
	ID              string       `json:"_id"`
	Name            string       `json:"name"`
	PersonaLvl      int          `json:"persona_lvl"`
	CodeSubmissions []Submission `json:"codeSubmissions"`
	Skills          []UserSkill  `json:"skills"`
	Projects        []Project    `json:"projects"`
}

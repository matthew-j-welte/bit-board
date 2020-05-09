package users

import "../common"

// User the user model
type User struct {
	common.UID
	Name            string
	PersonaLvl      int          `json:"persona_lvl"`
	CodeSubmissions []Submission `json:"codeSubmissions"`
	Skills          []UserSkill
	Projects        []Project
}

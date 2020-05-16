package users

import "github.com/matthew-j-welte/bit-board/server/models/common"

// User the user model
type User struct {
	common.UID
	Name            string
	PersonaLvl      int          `json:"persona_lvl"`
	CodeSubmissions []Submission `json:"codeSubmissions"`
	Skills          []UserSkill
	Projects        []Project
}

package users

import (
	"../common"
)

// UserSkill a skill for a certain user
type UserSkill struct {
	ID       string       `json:"_id"`
	Skill    common.Skill `json:"skill"`
	Level    int          `json:"level"`
	Percent  int          `json:"percent"`
	Name     string       `json:"name"`
	Category string       `json:"category"`
}

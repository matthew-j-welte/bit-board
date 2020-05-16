package users

import "github.com/matthew-j-welte/bit-board/server/models/common"

// UserSkill a skill for a certain user
type UserSkill struct {
	common.UID
	Skill    common.Skill
	Level    int
	Percent  int
	Name     string
	Category string
}

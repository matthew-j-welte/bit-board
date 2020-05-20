package users

import (
	"github.com/matthew-j-welte/bit-board/server/models/common"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User the user model
type User struct {
	common.UID
	Name            string
	PersonaLvl      int          `json:"persona_lvl"`
	CodeSubmissions []Submission `json:"codeSubmissions"`
	Skills          []UserSkill
	Projects        []Project
}

// NewUser the model used to receive user signup requests
type NewUser struct {
	ID             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CompanyName    string             `json:"companyName,omitempty"`
	Email          string
	FName          string
	Gender         string
	JobRole        string `json:"jobRole,omitempty"`
	JobTitle       string `json:"jobTitle,omitempty"`
	LName          string
	Password       string
	TechExperience int    `json:"techExperience,omitempty,string"`
	TechSummary    string `json:"techSummary,omitempty"`
	TechTitle      string `json:"techTitle,omitempty"`
	Username       string
	YearsWorking   int `json:"yearsWorking,omitempty,string"`
}

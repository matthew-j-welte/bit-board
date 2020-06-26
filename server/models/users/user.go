package users

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User the model used to receive user signup requests
type User struct {
	ID             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CompanyName    string             `json:"companyName,omitempty"`
	Email          string
	FName          string `bson:"fname"`
	Gender         string
	JobRole        string `json:"jobRole,omitempty"`
	JobTitle       string `json:"jobTitle,omitempty"`
	LName          string `bson:"lname"`
	Password       string
	TechExperience int    `json:"techExperience,omitempty,string"`
	TechSummary    string `json:"techSummary,omitempty"`
	TechTitle      string `json:"techTitle,omitempty"`
	Username       string
	YearsWorking   int    `json:"yearsWorking,omitempty,string"`
	Image          string `bson:"image"`
}

// // User the user model
// type User struct {
// 	common.UID
// 	Name            string
// 	PersonaLvl      int          `json:"persona_lvl"`
// 	CodeSubmissions []Submission `json:"codeSubmissions"`
// 	Skills          []UserSkill
// 	Projects        []Project
// }

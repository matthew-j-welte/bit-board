package users

import (
	"github.com/matthew-j-welte/bit-board/server/models/common"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Project a user project
type Project struct {
	common.UID
	Description string
	Phase       string
	Title       string
	Type        string
}

// NewProject a new project request
type NewProject struct {
	ID                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ProjectDescription string             `json:"projDescription,omitempty"`
	ProjectName        string             `json:"projName"`
	ProjectPhase       string             `json:"projPhase"`
	ProjectType        string             `json:"projType"`
	URL                string             `json:"url,omitempty"`
}

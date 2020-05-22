package users

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Project a user project
type Project struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Description string             `json:",omitempty"`
	Name        string
	Phase       string
	Type        string
	URL         string `json:"url,omitempty"`
}

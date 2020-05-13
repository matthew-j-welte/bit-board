package resources

import (
	"../common"
)

// Resource a learning resource
type Resource struct {
	common.UID
	Title       string
	Author      string
	Description string
	Viewers     int
	Comments    []common.Comment
	Skills      []common.Skill
	Placeholder string
	VideoID     string `json:"videoId"`
	Image       string
	Type        string
}
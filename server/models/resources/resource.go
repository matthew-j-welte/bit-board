package resources

import (
	"../common"
)

// Resource a learning resource
type Resource struct {
	ID          string           `json:"_id"`
	Title       string           `json:"title"`
	Author      string           `json:"author"`
	Description string           `json:"description"`
	Viewers     int              `json:"viewers"`
	Comments    []common.Comment `json:"comments"`
	Skills      []common.Skill   `json:"skills"`
	Placeholder string           `json:"placeholder"`
	VideoID     string           `json:"videoId"`
	Image       string           `json:"image"`
	Type        string           `json:"type"`
}

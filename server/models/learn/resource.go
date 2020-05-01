package learn

import (
	"../persona"
)

// Resource a learning resource
type Resource struct {
	ID          string          `json:"id"`
	Title       string          `json:"title"`
	Author      string          `json:"author"`
	Description string          `json:"description"`
	Viewers     int             `json:"viewers"`
	Comments    []Comment       `json:"comments"`
	Skills      []persona.Skill `json:"skills"`
	Placeholder string          `json:"placeholder"`
	VideoID     string          `json:"videoId"`
	Image       string          `json:"image"`
	Type        string          `json:"type"`
}

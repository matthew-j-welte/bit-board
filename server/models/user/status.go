package user

// Status current status of a user
type Status struct {
	CurrentBook          string `json:"currentBook"`
	PersonaLvl           int    `json:"personaLvl"`
	DiscoverCombinations int    `json:"discoverCombinations"`
}

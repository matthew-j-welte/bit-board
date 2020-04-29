package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	"../models/persona"
	"../models/user"
	"../models/workspace"
	"github.com/gorilla/mux"
)

var inMemoryUserDB map[int]string
var inMemoryWorkspaceDB []workspace.Project
var inMemoryPersonaSkills []persona.Skill

func init() {
	inMemoryUserDB = map[int]string{
		1: "Matt",
		2: "Matt"}

	inMemoryWorkspaceDB = []workspace.Project{
		{
			ID:          "1",
			Title:       "Cloud Project",
			Description: "This is a project where I build clouds and deploy them using cloudy clouds hosted on the cloud",
			Phase:       "Development",
			ProjectType: "Code"},
		{
			ID:          "2",
			Title:       "Super Mario",
			Description: "A reimagining of Super Mario for the modern day. All the fun of the original with the capabilities of modern technology and design",
			Phase:       "Production",
			ProjectType: "Code"},
		{
			ID:          "3",
			Title:       "Algorithm Manuscript",
			Description: "A manuscript I have been writing to collect my thoughts and ideas while taking a deep dive into algorithmic complexity",
			Phase:       "Development",
			ProjectType: "Writing"},
		{
			ID:          "4",
			Title:       "Design Patterns Reimagined",
			Description: "A deep dive into advanced data structures - this takes things above and beyond a common DS course",
			Phase:       "Published",
			ProjectType: "Writing"},
		{
			ID:          "5",
			Title:       "Cloud Project",
			Description: "This is a project where I build clouds and deploy them using cloudy clouds hosted on the cloud",
			Phase:       "Development",
			ProjectType: "Code"},
		{
			ID:          "6",
			Title:       "Super Mario",
			Description: "A reimagining of Super Mario for the modern day. All the fun of the original with the capabilities of modern technology and design",
			Phase:       "Production",
			ProjectType: "Code"},
		{
			ID:          "7",
			Title:       "Algorithm Manuscript",
			Description: "A manuscript I have been writing to collect my thoughts and ideas while taking a deep dive into algorithmic complexity",
			Phase:       "Development",
			ProjectType: "Writing"},
		{
			ID:          "8",
			Title:       "Design Patterns Reimagined",
			Description: "A deep dive into advanced data structures - this takes things above and beyond a common DS course",
			Phase:       "Published",
			ProjectType: "Writing"},
		{
			ID:          "9",
			Title:       "Cloud Project",
			Description: "This is a project where I build clouds and deploy them using cloudy clouds hosted on the cloud",
			Phase:       "Development",
			ProjectType: "Code"},
		{
			ID:          "10",
			Title:       "Super Mario",
			Description: "A reimagining of Super Mario for the modern day. All the fun of the original with the capabilities of modern technology and design",
			Phase:       "Production",
			ProjectType: "Code"},
		{
			ID:          "11",
			Title:       "Algorithm Manuscript",
			Description: "A manuscript I have been writing to collect my thoughts and ideas while taking a deep dive into algorithmic complexity",
			Phase:       "Development",
			ProjectType: "Writing"},
		{
			ID:          "12",
			Title:       "Design Patterns Reimagined",
			Description: "A deep dive into advanced data structures - this takes things above and beyond a common DS course",
			Phase:       "Published",
			ProjectType: "Writing"}}

	inMemoryPersonaSkills = []persona.Skill{
		{
			Level:    32,
			Percent:  83,
			Name:     "Python",
			Category: "Software"},
		{
			Level:    8,
			Percent:  53,
			Name:     "GoLang",
			Category: "Software"},
		{
			Level:    84,
			Percent:  92,
			Name:     "Reading",
			Category: "Soft"},
		{
			Level:    62,
			Percent:  16,
			Name:     "Writing",
			Category: "Soft"},
		{
			Level:    17,
			Percent:  55,
			Name:     "Algorithms",
			Category: "Software"},
		{
			Level:    22,
			Percent:  74,
			Name:     "Machine Learning",
			Category: "Software"},
		{
			Level:    94,
			Percent:  63,
			Name:     "Communication",
			Category: "Soft"},
		{
			Level:    31,
			Percent:  8,
			Name:     "Consistency",
			Category: "Soft"},
		{
			Level:    34,
			Percent:  37,
			Name:     "Linux",
			Category: "Software"},
		{
			Level:    12,
			Percent:  88,
			Name:     "Javascript",
			Category: "Software"},
		{
			Level:    32,
			Percent:  72,
			Name:     "Video Learning",
			Category: "Soft"},
		{
			Level:    32,
			Percent:  28,
			Name:     "Courses",
			Category: "Soft"},
	}

	fmt.Println("In memory db initialized")
}

// GetUserCount get the current signed up user count
func GetUserCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userCount := user.Count{
		Count: len(inMemoryUserDB),
	}
	fmt.Println("Initialized userCount struct")
	fmt.Println(userCount)
	json.NewEncoder(w).Encode(userCount)
}

// GetUserStatus get the status of a user
func GetUserStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting status for ID:")
	fmt.Println(id)

	userStatus := user.Status{
		CurrentBook:          "The Go Programming Language",
		PersonaLvl:           12,
		DiscoverCombinations: 123}

	fmt.Println("Initialized userStatus struct")
	fmt.Println(userStatus)
	json.NewEncoder(w).Encode(userStatus)
}

// GetWorkspaceCollection get the collection of projects for a users workspace
func GetWorkspaceCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting status for ID:")
	fmt.Println(id)

	json.NewEncoder(w).Encode(inMemoryWorkspaceDB)
}

// GetPersonaSkills collects the persona skill info
func GetPersonaSkills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id := params["id"]
	fmt.Println("Getting skills for ID:")
	fmt.Println(id)

	json.NewEncoder(w).Encode(inMemoryPersonaSkills)
}

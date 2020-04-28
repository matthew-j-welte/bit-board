package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	"../models/user"
	"../models/workspace"
	"github.com/gorilla/mux"
)

var inMemoryUserDB map[int]string
var inMemoryWorkspaceDB []workspace.Project

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

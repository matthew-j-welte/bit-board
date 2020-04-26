package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	"../models/user"
	"github.com/gorilla/mux"
)

var inMemoryUserDB map[int]string

func _genFakeData() map[int]string {
	return map[int]string{
		1: "Matt",
		2: "Matt",
		3: "Matt",
		4: "Matt",
		5: "Matt",
		6: "Matt",
		7: "Matt",
		8: "Matt",
		9: "Matt",
	}
}

func init() {
	inMemoryUserDB = _genFakeData()
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

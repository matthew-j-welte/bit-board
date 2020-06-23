package collections

import (
	"github.com/matthew-j-welte/bit-board/server/database"
)

// GetCollection helper function to connect to a collection
func getCollection(collName string) database.CollectionHelper {
	client, _ := database.NewClient()
	client.Connect()
	return database.NewDatabase(client).Collection(collName)
}

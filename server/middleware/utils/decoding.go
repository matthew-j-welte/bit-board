package utils

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// DecodeAll decodes all records in cursor
func DecodeAll(cur *mongo.Cursor) []bson.M {
	var decodeSlice []bson.M
	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		decodeSlice = append(decodeSlice, result)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	return decodeSlice
}

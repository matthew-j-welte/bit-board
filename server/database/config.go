package database

import "os"

const DBName = "bitboard-dev"

var HostName = os.Getenv("DATABASE_URL")
var MongoURI = "mongodb://" + HostName + "/"

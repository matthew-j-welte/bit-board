package main

import "log"

func main() {
	print(other(2))
	print(other(1))
}

func other(a int) bool {
	if 1 == a {
		return true
	}
	return false
}

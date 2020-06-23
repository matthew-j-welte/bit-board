package collections

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/reports"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
)

const errorReportDB = "error-reports"

// CreateErrorReport creates new document for stroring an error report
func CreateErrorReport(report reports.ErrorReport) (string, error) {
	return createErrorReport(getCollection(resourceSuggestionDB), report)
}

func createErrorReport(collectionHelper database.CollectionHelper, resource resources.ResourceSuggestion) {
	result, err := collectionHelper.InsertOne(context.Background(), resource)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

package collections

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/reports"
)

const errorReportDB = "error-reports"

// CreateErrorReport creates new document for stroring an error report
func CreateErrorReport(report reports.ErrorReport) (string, error) {
	return createErrorReport(getCollection(resourceSuggestionDB), report)
}

func createErrorReport(collectionHelper database.CollectionHelper, report reports.ErrorReport) (string, error) {
	result, err := collectionHelper.InsertOne(context.Background(), report)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

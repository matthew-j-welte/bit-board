package database

import (
	"context"

	"github.com/matthew-j-welte/bit-board/server/models/reports"
)

const errorReportDB = "error-reports"

type ErrorReports interface {
	Create(report reports.ErrorReport) (string, error)
}

type ErrorReportDB struct {
	*Database
}

// Create creates new document for stroring an error report
func (db *ErrorReportDB) Create(report reports.ErrorReport) (string, error) {
	return createErrorReport(db.GetCollection(errorReportDB), report)
}

func createErrorReport(collectionHelper CollectionHelper, report reports.ErrorReport) (string, error) {
	result, err := collectionHelper.InsertOne(context.Background(), report)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result), nil
}

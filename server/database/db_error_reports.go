package database

import (
	"github.com/matthew-j-welte/bit-board/server/models/reports"
)

const errorReportDBName = "error-reports"

type ErrorReportDB interface {
	Create(report reports.ErrorReport) (string, error)
}

type errorReportDB struct {
	helper DBHelper
}

func NewErrorReportDB(helper *DBHelper) ErrorReportDB {
	return &errorReportDB{
		helper: *helper,
	}
}

// Create creates new document for stroring an error report
func (errorReport *errorReportDB) Create(report reports.ErrorReport) (string, error) {
	collectionHelper := errorReport.helper.GetCollection(errorReportDBName)
	result, err := collectionHelper.InsertOne(report)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result)
}

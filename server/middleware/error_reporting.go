package middleware

import (
	"encoding/json"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/matthew-j-welte/bit-board/server/middleware/dataaccess"
	"github.com/matthew-j-welte/bit-board/server/models/reports"
	"go.mongodb.org/mongo-driver/mongo"
)

const errorReportCollection = "error-reports"

// HandleErrorReport handles an error report submission
func HandleErrorReport(db *mongo.Database, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	contextLogger := log.WithFields(log.Fields{"action": "ERROR REPORTING"})
	contextLogger.Info("Received a new error report from client")

	var errorReport = reports.ErrorReport{}
	err := json.NewDecoder(r.Body).Decode(&errorReport)
	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}

	objectID, err := dataaccess.CreateErrorReport(db.Collection(errorReportCollection), errorReport)
	res := map[string]string{
		"_id": objectID}

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
		res["error"] = err.Error()
	} else {
		contextLogger.WithField("errReport", objectID).Info("Submitted new error report")
	}
	json.NewEncoder(w).Encode(true)
}
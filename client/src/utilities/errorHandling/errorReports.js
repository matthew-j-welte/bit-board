import axios from '../../axios'

export class ErrorReport {
  constructor(userID, err, errType, payload) {
    this.userID = userID
    this.err = err
    this.type = errType
    this.payload = payload
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((jsonPayload, member) => {
      jsonPayload[member] = this[member];
      return jsonPayload;
    }, {});
  }
}

export const sendErrorReport = (report) => {
  const uri = "/api/error/report"
  axios.post(
    uri, 
    report.toJSON(), 
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
  .then(res => {
    if (res.data) {
      console.log("Successfully submitted Error Report")
    }
  })
}
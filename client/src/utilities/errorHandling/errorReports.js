import axios from '../../axios'

export const sendErrorReport = (report) => {
  const uri = "/api/error/report"
  axios.post(
    uri, 
    report, 
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
  .then(res => {
    if (res.data) {
      console.log("Successfully submitted Error Report")
    }
  })
}
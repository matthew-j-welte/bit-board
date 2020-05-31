import axios from '../../axios'
import { generateErrorPageFromAxiosError, getErrorInfo } from '../../utilities/errorHandling/axiosErrors'
import { sendErrorReport, ErrorReport } from '../../utilities/errorHandling/errorReports'

export const getPersonaSkills = (component) => {
  const uri = "/api/user/" + component.props.userId + "/persona/skills"
  axios.get(uri)
  .then(res => {
    if (res.data) {
      component.setState({
        skills: [...res.data.slice()]
      })
    }
  })
  .catch(err => {
    component.setState({
      error: generateErrorPageFromAxiosError(err)
    })
    const { message } = getErrorInfo(err)
    const payload = {
      errorFunctionSource: "getPersonaSkills",
      errorComponentSource: component.displayName, 
      clientSideEffect: "The skills for a user's Persona could not be rendered",
      problemURI: uri
    }
    const report = new ErrorReport(
      component.props.userId,
      message, 
      "Axios Error",
      payload
    )
    sendErrorReport(report)
  })
}

export const gettPersonaLvl = (component) => {
  const uri = "/api/user/" + component.props.userId + "/status"
  axios.get(uri)
  .then(res => {
    if (res.data) {
      component.setState({
        personaLvl: res.data["personaLvl"]
      })
    }
  })
  .catch(err => {
    component.setState({
      error: generateErrorPageFromAxiosError(err)
    })
  })
}
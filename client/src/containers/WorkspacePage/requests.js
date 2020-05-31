import axios from '../../axios'
import { 
  generateErrorPageFromAxiosError, 
  generateWarningModalFromAxiosError,
  getErrorInfo
 } from '../../utilities/errorHandling/axiosErrors'
 import { sendErrorReport, ErrorReport } from '../../utilities/errorHandling/errorReports'

export const getProjects = (component) => {
  const uri = "/api/user/" + component.props.userId + "/workspace/projects"
  axios.get(uri)
  .then(res => {
    console.log(res.data)
    if (res.data) {
      component.setState({
        projects: [...res.data.slice()],
        error: null
      })
    }
  })
  .catch(err => {
    component.setState({
      error: generateErrorPageFromAxiosError(err)
    })
    const { message } = getErrorInfo(err)
    const payload = {
      errorFunctionSource: "getProjects",
      errorComponentSource: component.displayName, 
      clientSideEffect: "This users projects are not able to be rendered",
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

export const postNewProject = (component) => {
  const uri = "/api/user/" + component.props.userId + "/workspace/project/new"
  axios.post(
    uri, 
    {...component.state.projFormState}, 
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
  .then(res => {
    if (res.data) {
      console.log("set a new project")
      console.log(res.data)
    }
  })
  .catch(err => {
    component.setState({
      warning: generateWarningModalFromAxiosError(err)
    })
  })
}
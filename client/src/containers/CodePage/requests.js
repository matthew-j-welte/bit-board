 import axios from '../../axios'
 import { 
   generateErrorPageFromAxiosError, 
   generateWarningModalFromAxiosError,
   getErrorInfo
} from '../../utilities/errorHandling/axiosErrors'
import { sendErrorReport, ErrorReport } from '../../utilities/errorHandling/errorReports'


export const getEditorConfigurations = (component) => {
  const uri = "/api/user/" + component.props.userId + "/code/configurations"
  axios.get(uri)
  .then(res => {
    console.log(res.data)
    if (res.data) {
      component.setState({
        savedConfigurations: [...res.data.slice()],
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
      errorFunctionSource: "getEditorConfigurations",
      errorComponentSource: component.displayName, 
      clientSideEffect: "The user's saved editor configurations can not be used",
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

export const postNewEditorConfiguration = (component, editorConf) => {
  const uri = `/api/user/${component.props.userId}/code/configuration/new`
  axios.post(
    uri, 
    {...editorConf}, 
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
  .then(res => {
    if (res.data) {
      console.log("Saved a new editor configuration")
      console.log(res.data)
    }
  })
  .catch(err => {
    component.setState({
      warning: generateWarningModalFromAxiosError(err)
    })
  })
}
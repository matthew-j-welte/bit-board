import axios from '../../axios'
import { 
  generateErrorPageFromAxiosError,
  generateWarningModalFromAxiosError,
  getErrorInfo
 } from '../../utilities/errorHandling/axiosErrors'
import { sendErrorReport, ErrorReport } from '../../utilities/errorHandling/errorReports'


export const getResources = (component) => {
  const uri = "/api/learn/resources"
  axios.get(uri)
  .then(res => {
    if (res.data) {
      const returnedResources = [...res.data.slice()]
      const currentResources = {...component.state.resources}
      component.setState({
        resources: {
          videos: [...currentResources.videos, ...returnedResources.filter(r => r['type'] === "videos")],
          books: [...currentResources.books, ...returnedResources.filter(r => r['type'] === "books")],
          articles: [...currentResources.articles, ...returnedResources.filter(r => r['type'] === "articles")]
        }
      })
    }
  })
  .catch(err => {
    component.setState({
      error: generateErrorPageFromAxiosError(err)
    })
    const { message } = getErrorInfo(err)
    const payload = {
      errorFunctionSource: "getResources",
      errorComponentSource: component.displayName, 
      clientSideEffect: "Learning resources are not able to be displayed for this user",
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

export const postResourceSuggestion = (component) => {
  const uri = "/api/learn/resource/new"
  console.log(component.state.newResourceForm)
  component.setState({
    awaitingPost: true,
    successfulPosting: null,
    failedPosting: null,
    submissionConfirmationModalOpen: true
  })
  axios.post(
    uri, 
    {...component.state.newResourceForm}, 
    {
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      params: {"userID": component.props.userId}
    })
  .then(res => {
    if (res.data) {
      console.log("set a new resource suggestion")
      console.log(res.data)
      component.setState({
        awaitingPost: null,
        successfulPosting: true
      })
    }
  })
  .catch(err => {
    component.setState({
      warning: generateWarningModalFromAxiosError(err),
      awaitingPost: null,
      failedPosting: true
    })
  })
}
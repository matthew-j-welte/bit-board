import React from 'react'
import ErrorPage from '../../components/Error/ErrorPage'
import { error_enums } from './enums'

export const getErrorInfo = (err) => {
  if (err.response) {
    return {message: "Backend Server Error: " + err.response, code: error_enums.SERVER_ERROR}
  } 
  else if (err.request) {
    return {message: "Network Error: " + err.request, code: error_enums.NETWORK_ERROR}
  } 
  else {
    return {message: "Unknown Error: " + err, code: error_enums.UNKNOWN_ERROR}
  }
}

export const generateErrorPageFromAxiosError = (err) => {
  const errInfo = getErrorInfo(err)
  return <ErrorPage message={errInfo.message} code={errInfo.code}/>
}

export const generateWarningModalFromAxiosError = (err) => {
  return null
}



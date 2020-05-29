import React from 'react';
import { connect } from 'react-redux'

import ErrorPage from '../components/Error/ErrorPage';
import { sendErrorReport, ErrorReport } from '../utilities/errorHandling/errorReports'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    const report = new ErrorReport(
      this.props.userId, 
      error, 
      "Unknown Component Thrown Error",
      {
        info: info
      }
    )
    sendErrorReport(report)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage/>;
    }
    return this.props.children;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(ErrorBoundary)
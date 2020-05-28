import React from 'react';
import ErrorPage from '../components/Error/ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error)
    console.log(info.componentStack)
    // log error to backend
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage/>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary
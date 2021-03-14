import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <h2>
          Something went wrong!
          <br />
          Error: {JSON.stringify(this.state.error)}
          <br />
          Details: {JSON.stringify(this.state.errorInfo)}
          <br />
        </h2>
      )
    }
    return this.props.children
  }
}

import React from 'react'
import PropTypes from 'prop-types'
// import { reportErrorToService } from './errorReportingService'

class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    state = {
        error: null,
        errorInfo: null,
        hasError: false,
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
            hasError: true,
        })

        // reportErrorToService(error, errorInfo)
    }

    handleResetClick = () => {
        this.setState({
            error: null,
            errorInfo: null,
            hasError: false,
        })
    }

    renderErrorState() {
        const { error } = this.state
        return (
            <div>
                <h2>Something went wrong!</h2>
                <p>Our apologies, something went wrong. Please try refreshing the page or contact support if the problem persists.</p>

                <button onClick={this.handleResetClick}>Reset</button><br />
                <details style={{ whiteSpace: 'pre-wrap' }}><br />
                    {this.state.error && this.state.error.toString()}
                    <hr />
                    {this.state.errorInfo.componentStack}
                </details>
            </div>
        )
    }

    render() {
        const { hasError } = this.state
        if (hasError) return this.renderErrorState()
        return this.props.children
    }
}

export default ErrorBoundary
// ---------------------------------   debug   ---------------------------------  
window.onerror = (message, source, line, column, error) => {
    const data = {
        message,
        source,
        line,
        column,
        stack: error.stack
    }
    console.log('error', data)
}
  // ↓↓ move to backend
// Create a new logger instance
// const logger = new Logger({
//   logDirectory: './logs',
//   logFilename: 'frontend.log',
//   logToConsole: true,
//   logLevel: 'debug'
// })
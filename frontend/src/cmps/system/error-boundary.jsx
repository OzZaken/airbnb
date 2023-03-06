import React from 'react'

export class ErrorBoundary extends React.Component {
    state = { error: null, errorInfo: null }

    componentDidCatch(error, errorInfo) {
        console.log(`🚀 ~ ErrorBoundary ~ error`, error)
        console.log(`🚀 ~ ErrorBoundary ~ errorInfo`, errorInfo)
        // Catch errors in children and re-render with error message
        // Note: in development the error is still presented on screen and you need to ESC to see the fallback UI
        this.setState({
            error,
            errorInfo
        })
        // TODO: Log error to an error reporting service on the backend
        // logger.report(error)
    }
    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong!!!</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        // Normally, just render children
        return this.props.children
    }
}
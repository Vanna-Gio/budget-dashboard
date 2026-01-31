import './ErrorState.css'
function ErrorState({ onRetry }) {
    return (
        <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Failed to Load Data</h2>
            <p>There was a problem fetching budget information, Please try again.</p>
            {onRetry && (
                <button className="retry-button" onClick={onRetry}>
                    🔄 Retry
                </button>
            )}
        </div>
    )
}
export default ErrorState;
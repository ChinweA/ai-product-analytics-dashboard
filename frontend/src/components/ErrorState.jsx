export default function ErrorState({ message = 'Failed to load data', onRetry }) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <div className="error-title">Something went wrong</div>
      <div className="error-message">{message}</div>
      {onRetry && (
        <button className="btn-primary" onClick={onRetry} style={{ marginTop: 16 }}>
          Try Again
        </button>
      )}
    </div>
  )
}

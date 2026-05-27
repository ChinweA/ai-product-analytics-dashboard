export default function InsightsPanel({ insights, loading }) {
  const ICONS = ['📈', '⚠️', '📱', '💹', '🤖', '🎯']

  return (
    <div className="chart-card fade-in">
      <div className="chart-header">
        <div>
          <div className="chart-title">AI Insights</div>
          <div className="chart-subtitle">Auto-generated from your data</div>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 10px',
            background: 'rgba(99,102,241,0.12)',
            color: '#6366f1',
            borderRadius: 20,
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {loading ? '...' : `${insights?.length ?? 0} insights`}
        </span>
      </div>

      <div className="insights-list">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 48, animationDelay: `${i * 0.1}s` }} />
            ))
          : insights?.map((text, i) => (
              <div key={i} className="insight-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{ICONS[i % ICONS.length]}</span>
                {text}
              </div>
            ))}
      </div>
    </div>
  )
}

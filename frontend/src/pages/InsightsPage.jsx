const ICONS = ['📈', '⚠️', '📱', '💹', '🤖', '🎯']
const COLORS = ['#6366f1', '#f59e0b', '#14b8a6', '#22c55e', '#ec4899', '#6366f1']

export default function InsightsFullPage({ insights, loading }) {
  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="page-title">AI Insights</h2>
        <p className="page-subtitle">Auto-generated observations from your analytics data</p>
      </div>

      {loading ? (
        <div className="insights-full-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 120, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      ) : (
        <div className="insights-full-grid">
          {insights?.map((text, i) => (
            <div
              key={i}
              className="insight-full-card fade-in"
              style={{ animationDelay: `${i * 0.08}s`, '--ins-color': COLORS[i % COLORS.length] }}
            >
              <div className="insight-card-icon" style={{ background: COLORS[i % COLORS.length] + '22' }}>
                {ICONS[i % ICONS.length]}
              </div>
              <div className="insight-card-body">
                <div className="insight-card-label">Insight #{i + 1}</div>
                <div className="insight-card-text">{text}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="chart-card" style={{ marginTop: 0 }}>
        <div className="chart-header">
          <div>
            <div className="chart-title">Insight Summary</div>
            <div className="chart-subtitle">Categorised observations</div>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Observation</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {insights?.map((text, i) => {
              const isPositive = /increas|grew|up |higher|best|fastest|outperform/i.test(text)
              const isNeg = /drop|declin|fell|lower|risk/i.test(text)
              const signal = isPositive ? { label: 'Positive ▲', cls: 'td-green' } : isNeg ? { label: 'Warning ⚠', cls: 'td-red' } : { label: 'Neutral →', cls: 'td-muted' }
              return (
                <tr key={i}>
                  <td className="td-muted">{i + 1}</td>
                  <td>{text}</td>
                  <td className={signal.cls}>{signal.label}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

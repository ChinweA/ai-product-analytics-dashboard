import FeatureUsage from '../components/FeatureUsage'

export default function FeaturesPage({ data, loading }) {
  const total = data?.reduce((s, d) => s + d.count, 0) ?? 0
  const topFeature = data ? [...data].sort((a, b) => b.count - a.count)[0] : null
  const fastest = data ? [...data].sort((a, b) => b.change - a.change)[0] : null
  const declining = data ? [...data].filter((d) => d.change < 0).length : 0

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="page-title">Feature Usage</h2>
        <p className="page-subtitle">Product feature adoption rates and engagement trends</p>
      </div>

      <div className="stat-row">
        {[
          { label: 'Total Events', value: total.toLocaleString(), color: '#6366f1' },
          { label: 'Top Feature', value: topFeature?.feature ?? '—', color: '#14b8a6' },
          { label: 'Fastest Growing', value: fastest ? `${fastest.feature} +${fastest.change}%` : '—', color: '#22c55e' },
          { label: 'Declining Features', value: declining, color: declining > 0 ? '#ef4444' : '#22c55e' },
        ].map((s) => (
          <div className="stat-pill" key={s.label} style={{ '--pill-color': s.color }}>
            <span className="stat-pill-value" style={{ color: s.color, fontSize: s.value?.toString().length > 12 ? 14 : undefined }}>{s.value}</span>
            <span className="stat-pill-label">{s.label}</span>
          </div>
        ))}
      </div>

      <FeatureUsage data={data} loading={loading} tall />

      {!loading && data && (
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Feature Breakdown</div>
              <div className="chart-subtitle">Usage count and trend vs previous period</div>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Feature</th>
                <th>Usage Count</th>
                <th>Share of Total</th>
                <th>vs Prev Period</th>
              </tr>
            </thead>
            <tbody>
              {[...data]
                .sort((a, b) => b.count - a.count)
                .map((row, i) => (
                  <tr key={row.feature}>
                    <td className="td-muted">{i + 1}</td>
                    <td className="td-bold">{row.feature}</td>
                    <td>{row.count.toLocaleString()}</td>
                    <td className="td-muted">{((row.count / total) * 100).toFixed(1)}%</td>
                    <td className={row.change >= 0 ? 'td-green' : 'td-red'}>
                      {row.change >= 0 ? '▲' : '▼'} {Math.abs(row.change)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

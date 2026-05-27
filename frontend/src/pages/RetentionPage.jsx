import RetentionChart from '../components/RetentionChart'

export default function RetentionPage({ data, loading }) {
  const avg = data ? (data.reduce((s, d) => s + d.retention, 0) / data.length).toFixed(1) : '—'
  const high = data ? Math.max(...data.map((d) => d.retention)) : '—'
  const low = data ? Math.min(...data.map((d) => d.retention)) : '—'
  const latest = data?.[data.length - 1]?.retention ?? '—'

  const getStatus = (v) => (v >= 75 ? { label: 'Healthy', color: '#22c55e' } : v >= 65 ? { label: 'Moderate', color: '#f59e0b' } : { label: 'At Risk', color: '#ef4444' })
  const status = getStatus(+avg)

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="page-title">Retention Analytics</h2>
        <p className="page-subtitle">Weekly user retention rates and cohort performance</p>
      </div>

      <div className="stat-row">
        {[
          { label: 'Average Retention', value: `${avg}%`, color: '#14b8a6' },
          { label: 'Peak Week', value: `${high}%`, color: '#22c55e' },
          { label: 'Lowest Week', value: `${low}%`, color: '#ef4444' },
          { label: 'Current Status', value: status.label, color: status.color },
        ].map((s) => (
          <div className="stat-pill" key={s.label} style={{ '--pill-color': s.color }}>
            <span className="stat-pill-value" style={{ color: s.color }}>{s.value}</span>
            <span className="stat-pill-label">{s.label}</span>
          </div>
        ))}
      </div>

      <RetentionChart data={data} loading={loading} tall />

      {!loading && data && (
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Weekly Retention Data</div>
              <div className="chart-subtitle">Week-by-week retention percentage</div>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Retention %</th>
                <th>vs Average</th>
                <th>Status</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const vsAvg = (row.retention - +avg).toFixed(1)
                const s = getStatus(row.retention)
                const trend = i > 0 ? row.retention - data[i - 1].retention : 0
                return (
                  <tr key={row.week}>
                    <td className="td-bold">{row.week}</td>
                    <td>{row.retention}%</td>
                    <td className={+vsAvg >= 0 ? 'td-green' : 'td-red'}>
                      {+vsAvg >= 0 ? '+' : ''}{vsAvg}%
                    </td>
                    <td>
                      <span className="status-chip" style={{ '--chip-color': s.color }}>{s.label}</span>
                    </td>
                    <td className={i === 0 ? 'td-muted' : trend >= 0 ? 'td-green' : 'td-red'}>
                      {i === 0 ? '—' : trend >= 0 ? `▲ +${trend}%` : `▼ ${trend}%`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

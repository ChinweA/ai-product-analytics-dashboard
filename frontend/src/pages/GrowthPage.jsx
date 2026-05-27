import UserGrowthChart from '../components/UserGrowthChart'

export default function GrowthPage({ data, loading }) {
  const total = data?.[data?.length - 1]?.users ?? 0
  const first = data?.[0]?.users ?? 0
  const growthPct = first ? (((total - first) / first) * 100).toFixed(1) : '—'
  const peak = data ? [...data].sort((a, b) => b.users - a.users)[0] : null

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h2 className="page-title">User Growth</h2>
        <p className="page-subtitle">Monthly active user trends and year-over-year comparison</p>
      </div>

      <div className="stat-row">
        {[
          { label: 'Total Users', value: total.toLocaleString(), color: '#6366f1' },
          { label: 'Growth This Period', value: `+${growthPct}%`, color: '#22c55e' },
          { label: 'Peak Period', value: peak?.label ?? '—', color: '#f59e0b' },
          { label: 'Data Points', value: data?.length ?? 0, color: '#14b8a6' },
        ].map((s) => (
          <div className="stat-pill" key={s.label} style={{ '--pill-color': s.color }}>
            <span className="stat-pill-value" style={{ color: s.color }}>{s.value}</span>
            <span className="stat-pill-label">{s.label}</span>
          </div>
        ))}
      </div>

      <UserGrowthChart data={data} loading={loading} tall />

      {!loading && data && (
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Month-by-Month Breakdown</div>
              <div className="chart-subtitle">Detailed growth data</div>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Users</th>
                <th>Previous Year</th>
                <th>YoY Change</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const yoy = (((row.users - row.prev) / row.prev) * 100).toFixed(1)
                const mom = i > 0 ? (((row.users - data[i - 1].users) / data[i - 1].users) * 100).toFixed(1) : '—'
                return (
                  <tr key={row.label}>
                    <td className="td-bold">{row.label}</td>
                    <td>{row.users.toLocaleString()}</td>
                    <td className="td-muted">{row.prev.toLocaleString()}</td>
                    <td className={+yoy >= 0 ? 'td-green' : 'td-red'}>
                      {+yoy >= 0 ? '▲' : '▼'} {Math.abs(yoy)}%
                    </td>
                    <td className={mom === '—' || +mom >= 0 ? 'td-green' : 'td-red'}>
                      {mom === '—' ? '—' : `${+mom >= 0 ? '▲' : '▼'} ${Math.abs(mom)}%`}
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

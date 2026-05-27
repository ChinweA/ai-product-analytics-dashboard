const RANGES = ['7d', '30d', '90d', '12m']
const LABELS = { '7d': '7 Days', '30d': '30 Days', '90d': '90 Days', '12m': '12 Months' }

export default function FilterBar({ range, onChange }) {
  return (
    <div className="filter-bar">
      {RANGES.map((r) => (
        <button
          key={r}
          className={`filter-btn ${range === r ? 'active' : ''}`}
          onClick={() => onChange(r)}
        >
          {LABELS[r]}
        </button>
      ))}
    </div>
  )
}

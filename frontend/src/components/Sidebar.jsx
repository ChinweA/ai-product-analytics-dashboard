const NAV_ITEMS = [
  { icon: '◉', label: 'Overview', id: 'overview' },
  { icon: '⬡', label: 'User Growth', id: 'growth' },
  { icon: '▦', label: 'Feature Usage', id: 'features' },
  { icon: '◈', label: 'Retention', id: 'retention' },
  { icon: '◎', label: 'Insights', id: 'insights' },
]

export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⚡</div>
        <div className="logo-text">
          Pulse<span>IQ</span>
        </div>
      </div>

      <div className="sidebar-section-label">Navigation</div>

      {NAV_ITEMS.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => onNav(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="status-badge">
          <div className="status-dot" />
          Live Data · API Connected
        </div>
      </div>
    </aside>
  )
}

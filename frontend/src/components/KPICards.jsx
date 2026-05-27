import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!target && target !== 0) return
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return value
}

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n?.toLocaleString() ?? '—'
}

const CARDS = [
  {
    key: 'monthly_active_users',
    changeKey: 'mau_change',
    label: 'Monthly Active Users',
    icon: '👥',
    prefix: '',
    suffix: '',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.12)',
  },
  {
    key: 'revenue',
    changeKey: 'revenue_change',
    label: 'Revenue',
    icon: '💰',
    prefix: '$',
    suffix: '',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.12)',
  },
  {
    key: 'retention_rate',
    changeKey: 'retention_change',
    label: 'Retention Rate',
    icon: '🔁',
    prefix: '',
    suffix: '%',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.12)',
  },
  {
    key: 'conversion_rate',
    changeKey: 'conversion_change',
    label: 'Conversion Rate',
    icon: '🎯',
    prefix: '',
    suffix: '%',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
  },
]

function KPICard({ card, data, loading }) {
  const raw = data?.[card.key] ?? 0
  const animated = useCountUp(loading ? 0 : raw)
  const change = data?.[card.changeKey] ?? 0
  const isUp = change >= 0

  return (
    <div
      className="kpi-card fade-in"
      style={{ '--card-color': card.color, '--card-bg': card.bg }}
    >
      <div className="kpi-card-header">
        <span className="kpi-label">{card.key === 'monthly_active_users' ? (data?.mau_label ?? card.label) : card.label}</span>
        <div className="kpi-icon" style={{ background: card.bg }}>
          {card.icon}
        </div>
      </div>

      {loading ? (
        <div className="skeleton" style={{ height: 36, width: '70%', marginBottom: 12 }} />
      ) : (
        <div className="kpi-value">
          {card.prefix}{fmt(animated)}{card.suffix}
        </div>
      )}

      {loading ? (
        <div className="skeleton" style={{ height: 20, width: '40%' }} />
      ) : (
        <>
          <span className={`kpi-change ${isUp ? 'up' : 'down'}`}>
            {isUp ? '▲' : '▼'} {Math.abs(change)}%
          </span>
          <div className="kpi-sub">vs previous period</div>
        </>
      )}
    </div>
  )
}

export default function KPICards({ data, loading }) {
  return (
    <div className="kpi-grid">
      {CARDS.map((card) => (
        <KPICard key={card.key} card={card} data={data} loading={loading} />
      ))}
    </div>
  )
}

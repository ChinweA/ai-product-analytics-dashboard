import { useState, useEffect } from 'react'

const DEFAULT_FEATURES = [
  { feature: 'Dashboard Query', count: 1248, change: 12 },
  { feature: 'Export Data', count: 840, change: -8 },
  { feature: 'AI Insights', count: 521, change: 34 },
  { feature: 'Reports', count: 312, change: 5 },
  { feature: 'Alerts', count: 198, change: 21 },
]

export default function DataInputPanel({ open, onClose, onApply }) {
  const [kpis, setKpis] = useState({
    monthly_active_users: 124582,
    mau_change: 18.3,
    revenue: 87220,
    revenue_change: 11.2,
    retention_rate: 74.5,
    retention_change: 14.0,
    conversion_rate: 8.3,
    conversion_change: 2.1,
  })

  const [features, setFeatures] = useState(DEFAULT_FEATURES)
  const [activeTab, setActiveTab] = useState('kpis')

  const handleKpi = (key, val) => setKpis((p) => ({ ...p, [key]: +val }))
  const handleFeature = (i, key, val) =>
    setFeatures((p) => p.map((f, idx) => (idx === i ? { ...f, [key]: key === 'feature' ? val : +val } : f)))

  const handleApply = () => {
    onApply({ kpis, features })
    onClose()
  }

  const handleReset = () => {
    setKpis({
      monthly_active_users: 124582, mau_change: 18.3,
      revenue: 87220, revenue_change: 11.2,
      retention_rate: 74.5, retention_change: 14.0,
      conversion_rate: 8.3, conversion_change: 2.1,
    })
    setFeatures(DEFAULT_FEATURES)
  }

  if (!open) return null

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="data-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="panel-header">
          <div>
            <div className="panel-title">Input Data</div>
            <div className="panel-subtitle">Enter your metrics to populate the dashboard</div>
          </div>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="panel-tabs">
          {['kpis', 'features'].map((t) => (
            <button
              key={t}
              className={`panel-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'kpis' ? '📊 KPI Metrics' : '⚡ Feature Usage'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="panel-body">
          {activeTab === 'kpis' && (
            <div className="form-grid">
              {[
                { label: 'Monthly Active Users', key: 'monthly_active_users', unit: '' },
                { label: 'MAU Change %', key: 'mau_change', unit: '%' },
                { label: 'Revenue ($)', key: 'revenue', unit: '$' },
                { label: 'Revenue Change %', key: 'revenue_change', unit: '%' },
                { label: 'Retention Rate %', key: 'retention_rate', unit: '%' },
                { label: 'Retention Change %', key: 'retention_change', unit: '%' },
                { label: 'Conversion Rate %', key: 'conversion_rate', unit: '%' },
                { label: 'Conversion Change %', key: 'conversion_change', unit: '%' },
              ].map(({ label, key, unit }) => (
                <div className="form-field" key={key}>
                  <label className="form-label">{label}</label>
                  <div className="input-wrapper">
                    {unit === '$' && <span className="input-prefix">$</span>}
                    <input
                      className="form-input"
                      type="number"
                      value={kpis[key]}
                      onChange={(e) => handleKpi(key, e.target.value)}
                      style={{ paddingLeft: unit === '$' ? 28 : 12 }}
                    />
                    {unit === '%' && <span className="input-suffix">%</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <p className="form-hint">Edit feature names, usage counts, and period-over-period change %.</p>
              {features.map((f, i) => (
                <div className="feature-row" key={i}>
                  <div className="feature-row-num">{i + 1}</div>
                  <div className="form-field" style={{ flex: 2 }}>
                    <label className="form-label">Feature Name</label>
                    <input
                      className="form-input"
                      type="text"
                      value={f.feature}
                      onChange={(e) => handleFeature(i, 'feature', e.target.value)}
                    />
                  </div>
                  <div className="form-field" style={{ flex: 1 }}>
                    <label className="form-label">Count</label>
                    <input
                      className="form-input"
                      type="number"
                      value={f.count}
                      onChange={(e) => handleFeature(i, 'count', e.target.value)}
                    />
                  </div>
                  <div className="form-field" style={{ flex: 1 }}>
                    <label className="form-label">Change %</label>
                    <input
                      className="form-input"
                      type="number"
                      value={f.change}
                      onChange={(e) => handleFeature(i, 'change', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="panel-footer">
          <button className="btn-ghost" onClick={handleReset}>Reset to Default</button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleApply}>Apply Data</button>
          </div>
        </div>
      </div>
    </div>
  )
}

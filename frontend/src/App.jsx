import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import FilterBar from './components/FilterBar'
import KPICards from './components/KPICards'
import UserGrowthChart from './components/UserGrowthChart'
import RevenueChart from './components/RevenueChart'
import FeatureUsage from './components/FeatureUsage'
import InsightsPanel from './components/InsightsPanel'
import RetentionChart from './components/RetentionChart'
import DataInputPanel from './components/DataInputPanel'
import ErrorState from './components/ErrorState'
import GrowthPage from './pages/GrowthPage'
import FeaturesPage from './pages/FeaturesPage'
import RetentionPage from './pages/RetentionPage'
import InsightsPage from './pages/InsightsPage'
import * as api from './services/api'

export default function App() {
  const [range, setRange] = useState('30d')
  const [activeNav, setActiveNav] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [customData, setCustomData] = useState(null) // null = use API data
  const [apiData, setApiData] = useState({
    kpis: null, userGrowth: null, featureUsage: null,
    trafficSources: null, retentionTrend: null, insights: null,
  })

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [kpis, userGrowth, featureUsage, trafficSources, retentionTrend, insights] =
        await Promise.all([
          api.getKPIs(range), api.getUserGrowth(range), api.getFeatureUsage(range),
          api.getTrafficSources(), api.getRetentionTrend(range), api.getInsights(),
        ])
      setApiData({ kpis, userGrowth, featureUsage, trafficSources, retentionTrend, insights })
    } catch (err) {
      console.error('API error:', err)
      setError('Unable to reach the API. Make sure the backend is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }, [range])

  useEffect(() => { fetchAll() }, [fetchAll])

  // Merge custom data over API data when user has applied custom input
  const data = customData
    ? { ...apiData, kpis: customData.kpis, featureUsage: customData.features }
    : apiData

  const handleApplyData = (custom) => {
    setCustomData(custom)
  }

  const handleClearCustom = () => setCustomData(null)

  const RANGE_LABELS = { '7d': 'Last 7 Days', '30d': 'Last 30 Days', '90d': 'Last 90 Days', '12m': 'Last 12 Months' }
  const NAV_LABELS = { overview: 'Overview', growth: 'User Growth', features: 'Feature Usage', retention: 'Retention', insights: 'AI Insights' }

  const renderPage = () => {
    switch (activeNav) {
      case 'growth':
        return <GrowthPage data={data.userGrowth} loading={loading} />
      case 'features':
        return <FeaturesPage data={data.featureUsage} loading={loading} />
      case 'retention':
        return <RetentionPage data={data.retentionTrend} loading={loading} />
      case 'insights':
        return <InsightsPage insights={data.insights} loading={loading} />
      default:
        return (
          <div className="page fade-in">
            <KPICards data={data.kpis} loading={loading} />
            <div className="charts-row-2">
              <UserGrowthChart data={data.userGrowth} loading={loading} />
              <RevenueChart data={data.trafficSources} loading={loading} />
            </div>
            <div className="charts-row-3">
              <FeatureUsage data={data.featureUsage} loading={loading} />
              <InsightsPanel insights={data.insights} loading={loading} />
            </div>
            <div className="charts-row-3">
              <RetentionChart data={data.retentionTrend} loading={loading} />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app-layout">
      <Sidebar active={activeNav} onNav={setActiveNav} />

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>{NAV_LABELS[activeNav]}</h1>
            <p>Product Analytics · {RANGE_LABELS[range]}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {customData && (
              <button className="custom-badge" onClick={handleClearCustom} title="Click to reset to API data">
                ✦ Custom Data &nbsp;✕
              </button>
            )}
            <FilterBar range={range} onChange={setRange} />
            <button className="btn-input-data" onClick={() => setPanelOpen(true)}>
              ＋ Input Data
            </button>
          </div>
        </header>

        <main className="content-area">
          {error
            ? <ErrorState message={error} onRetry={fetchAll} />
            : renderPage()}
        </main>
      </div>

      <DataInputPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onApply={handleApplyData}
      />
    </div>
  )
}

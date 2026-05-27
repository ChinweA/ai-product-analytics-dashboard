import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function FeatureUsage({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Feature Usage</div>
            <div className="chart-subtitle">Most used product features</div>
          </div>
        </div>
        <div className="skeleton" style={{ height: 260 }} />
      </div>
    )
  }

  const sorted = [...data].sort((a, b) => b.count - a.count)

  const chartData = {
    labels: sorted.map((d) => d.feature),
    datasets: [
      {
        label: 'Usage Count',
        data: sorted.map((d) => d.count),
        backgroundColor: [
          'rgba(99,102,241,0.8)',
          'rgba(20,184,166,0.8)',
          'rgba(236,72,153,0.8)',
          'rgba(245,158,11,0.8)',
          'rgba(34,197,94,0.8)',
        ],
        borderColor: [
          '#6366f1', '#14b8a6', '#ec4899', '#f59e0b', '#22c55e',
        ],
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d1424',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        callbacks: {
          afterLabel: (ctx) => {
            const item = sorted[ctx.dataIndex]
            const sign = item.change >= 0 ? '▲' : '▼'
            return ` ${sign} ${Math.abs(item.change)}% vs last period`
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(99,102,241,0.06)' },
        ticks: { color: '#475569', font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 12 } },
      },
    },
  }

  return (
    <div className="chart-card fade-in">
      <div className="chart-header">
        <div>
          <div className="chart-title">Feature Usage</div>
          <div className="chart-subtitle">Most used product features · hover for trends</div>
        </div>
      </div>
      <div style={{ height: 260 }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

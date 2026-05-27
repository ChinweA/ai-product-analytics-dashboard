import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function RetentionChart({ data, loading, tall }) {
  const h = tall ? 320 : 200
  if (loading || !data) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Retention Trend</div>
            <div className="chart-subtitle">Weekly user retention percentage</div>
          </div>
        </div>
        <div className="skeleton" style={{ height: h }} />
      </div>
    )
  }

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: 'Retention %',
        data: data.map((d) => d.retention),
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20,184,166,0.1)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#14b8a6',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d1424',
        borderColor: 'rgba(20,184,166,0.3)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        callbacks: { label: (ctx) => ` Retention: ${ctx.parsed.y}%` },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(99,102,241,0.06)' },
        ticks: { color: '#475569', font: { family: 'Inter', size: 11 } },
      },
      y: {
        min: 60,
        max: 100,
        grid: { color: 'rgba(99,102,241,0.06)' },
        ticks: {
          color: '#475569',
          font: { family: 'Inter', size: 11 },
          callback: (v) => `${v}%`,
        },
      },
    },
  }

  const avg = (data.reduce((s, d) => s + d.retention, 0) / data.length).toFixed(1)

  return (
    <div className="chart-card fade-in" style={{ gridColumn: '1 / -1' }}>
      <div className="chart-header">
        <div>
          <div className="chart-title">Retention Trend</div>
          <div className="chart-subtitle">Weekly user retention percentage</div>
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#14b8a6',
            background: 'rgba(20,184,166,0.12)',
            padding: '5px 12px',
            borderRadius: 20,
            border: '1px solid rgba(20,184,166,0.2)',
          }}
        >
          Avg {avg}%
        </span>
      </div>
      <div style={{ height: h }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

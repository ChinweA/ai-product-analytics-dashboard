import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function UserGrowthChart({ data, loading, tall }) {
  const h = tall ? 380 : 260
  if (loading || !data) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">User Growth Over Time</div>
            <div className="chart-subtitle">Monthly active users trend</div>
          </div>
        </div>
        <div className="skeleton" style={{ height: h }} />
      </div>
    )
  }

  const labels = data.map((d) => d.label)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'This Year',
        data: data.map((d) => d.users),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.12)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#6366f1',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Previous Year',
        data: data.map((d) => d.prev),
        borderColor: '#475569',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyleWidth: 8 },
      },
      tooltip: {
        backgroundColor: '#0d1424',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(99,102,241,0.06)' },
        ticks: { color: '#475569', font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { color: 'rgba(99,102,241,0.06)' },
        ticks: {
          color: '#475569',
          font: { family: 'Inter', size: 11 },
          callback: (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v),
        },
      },
    },
  }

  return (
    <div className="chart-card fade-in">
      <div className="chart-header">
        <div>
          <div className="chart-title">User Growth Over Time</div>
          <div className="chart-subtitle">Monthly active users · Year over year</div>
        </div>
      </div>
      <div style={{ height: h }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

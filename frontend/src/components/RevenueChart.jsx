import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = ['#6366f1', '#14b8a6', '#ec4899', '#f59e0b']
const GLOW = ['rgba(99,102,241,0.4)', 'rgba(20,184,166,0.4)', 'rgba(236,72,153,0.4)', 'rgba(245,158,11,0.4)']

export default function RevenueChart({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Traffic Sources</div>
            <div className="chart-subtitle">Visitor acquisition breakdown</div>
          </div>
        </div>
        <div className="skeleton" style={{ height: 260 }} />
      </div>
    )
  }

  const chartData = {
    labels: data.map((d) => d.source),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: COLORS.map((c) => c + '22'),
        borderColor: COLORS,
        hoverBackgroundColor: GLOW,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 12 },
          usePointStyle: true,
          pointStyleWidth: 8,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#0d1424',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
      },
    },
  }

  return (
    <div className="chart-card fade-in">
      <div className="chart-header">
        <div>
          <div className="chart-title">Traffic Sources</div>
          <div className="chart-subtitle">Visitor acquisition breakdown</div>
        </div>
      </div>
      <div style={{ height: 260 }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import PropTypes from 'prop-types';

import './BudgetDetail.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function BudgetDetail({ data }) {
  // Generate trend data (simulated - in real app from API)
  const generateTrendData = () => {
    const baseAmount = parseInt(data.amount.replace(/[^0-9]/g, ''));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const trend = data.growthPositive ? 1.05 : 0.95;
    
    return months.map((_, index) => {
      return Math.round(baseAmount * Math.pow(trend, index - 5));
    });
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Budget Trend',
        data: generateTrendData(),
        borderColor: data.growthPositive ? '#10B981' : '#EF4444',
        backgroundColor: data.growthPositive 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#111827',
        padding: 12,
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
          }
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="budget-detail">
      <div className="detail-header">
        <span className="detail-icon">{data.icon}</span>
        <div>
          <h2 className="detail-title">{data.title}</h2>
          <p className="detail-amount">{data.amount}</p>
        </div>
      </div>

      <div className={`detail-growth ${data.growthPositive ? 'positive' : 'negative'}`}>
        {data.growth}
      </div>

      <div className="detail-section">
        <h3>6-Month Trend</h3>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="detail-section">
        <h3>Project Details</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Project ID</span>
            <span className="detail-value">#{data.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className={`status-badge ${data.growthPositive ? 'active' : 'warning'}`}>
              {data.growthPositive ? 'Active' : 'Needs Review'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Updated</span>
            <span className="detail-value">
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Department</span>
            <span className="detail-value">Public Infrastructure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

BudgetDetail.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    growth: PropTypes.string.isRequired,
    growthPositive: PropTypes.bool.isRequired
  }).isRequired
};

export default BudgetDetail;
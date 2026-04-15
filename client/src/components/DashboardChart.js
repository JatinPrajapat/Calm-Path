import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const getOptions = (isPrinting) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#111827',
      padding: 12,
      bodyFont: { family: 'Inter', size: 12 },
      titleFont: { family: 'Outfit', size: 13, weight: '700' },
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: { family: 'Inter', size: 11 },
        color: isPrinting ? '#374151' : '#9ca3af',
      },
    },
    y: {
      min: 0,
      max: 100,
      grid: {
        color: isPrinting ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
        drawBorder: false,
      },
      ticks: {
        font: { family: 'Inter', size: 11 },
        color: isPrinting ? '#374151' : '#71717a',
        stepSize: 25,
        callback: (value) => `${value}%`,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      backgroundColor: '#2EC4B6',
      borderWidth: 2,
      borderColor: isPrinting ? '#000000' : '#ffffff',
    },
  },
});

export default function DashboardChart({ dataPoints, labels, isPrinting }) {
  const data = {
    labels: labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Mental Score',
        data: dataPoints || [65, 78, 72, 85, 80, 88, 72],
        borderColor: '#2EC4B6',
        backgroundColor: isPrinting ? 'rgba(46, 196, 182, 0.15)' : 'rgba(46, 196, 182, 0.05)',
      },
    ],
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line options={getOptions(isPrinting)} data={data} />
    </div>
  );
}

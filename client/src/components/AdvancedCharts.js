import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

// ── Shared Options Builder ───────────────────────────────────────────────────

const getRadarOptions = (isPrinting) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111827',
      titleFont: { family: 'Outfit', size: 13 },
      bodyFont: { family: 'Inter', size: 12 },
      cornerRadius: 8,
    },
  },
  scales: {
    r: {
      angleLines: { color: isPrinting ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' },
      grid: { color: isPrinting ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' },
      pointLabels: {
        color: isPrinting ? '#000000' : '#ffffff',
        font: { family: 'Inter', size: 10, weight: '700' },
      },
      ticks: { display: false, stepSize: 20 },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
});

const getDoughnutOptions = (isPrinting) => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111827',
      cornerRadius: 8,
    },
  },
});

// ── Profile Radar Chart ──────────────────────────────────────────────────────

export function ProfileRadar({ stats, isPrinting }) {
  const data = {
    labels: ['Stress', 'Anxiety', 'Depression', 'Sleep', 'Focus', 'Energy'],
    datasets: [
      {
        label: 'Mental Profile',
        data: stats || [65, 59, 40, 81, 56, 75],
        fill: true,
        backgroundColor: 'rgba(46, 196, 182, 0.2)',
        borderColor: '#2EC4B6',
        pointBackgroundColor: '#2EC4B6',
        pointBorderColor: isPrinting ? '#000' : '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2EC4B6',
      },
    ],
  };

  return <Radar data={data} options={getRadarOptions(isPrinting)} />;
}

// ── Category Distribution Chart ──────────────────────────────────────────────

export function CategoryDoughnut({ counts, isPrinting }) {
  const data = {
    labels: ['Depression', 'Anxiety', 'PTSD', 'Schizophrenia', 'Addiction'],
    datasets: [
      {
        data: counts || [12, 19, 3, 5, 2],
        backgroundColor: [
          '#2EC4B6',
          'rgba(46, 196, 182, 0.8)',
          'rgba(46, 196, 182, 0.6)',
          'rgba(46, 196, 182, 0.4)',
          'rgba(46, 196, 182, 0.2)',
        ],
        hoverOffset: 12,
        borderColor: isPrinting ? '#ffffff' : '#000000',
        borderWidth: isPrinting ? 2 : 4,
      },
    ],
  };

  return <Doughnut data={data} options={getDoughnutOptions(isPrinting)} />;
}

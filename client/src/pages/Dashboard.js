import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import DashboardChart from '../components/DashboardChart';
import ActivityList from '../components/ActivityList';
import { ProfileRadar, CategoryDoughnut } from '../components/AdvancedCharts';
import GaugeChart from 'react-gauge-chart';
import { Link } from 'react-router-dom';
import GameInsights from '../components/Analytics/GameInsights';
import './Dashboard.css';

// ─── Sub-Components ──────────────────────────────────────────────────────────

const OverviewCard = ({ label, value, trend, trendValue, icon, color, isGuest }) => (
  <div className={`db-card ${isGuest ? 'db-guest-preview-blur' : ''}`}>
    <div className="db-card-label">
      <span style={{ color }}>{icon}</span> {label}
    </div>
    <div className="db-card-val">{value}</div>
    {trendValue && (
      <div className={`db-card-trend ${trend === 'up' ? 'db-trend-up' : 'db-trend-down'}`}>
        {trend === 'up' ? '↑' : '↓'} {trendValue} vs last month
      </div>
    )}
  </div>
);

const InsightCard = ({ text }) => (
  <div className="db-insight-card">
    <p className="db-insight-text">{text}</p>
  </div>
);

const Icons = {
  Brain: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Activity: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Zap: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Game: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13h.01"/><path d="M18 11h.01"/></svg>,
  FileText: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Mood: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
};

// ─── Guest View (Onboarding) ────────────────────────────────────────────────

const GuestDashboard = () => (
  <div className="db-page">
    <div className="db-orb-wrapper">
      <div className="db-orb db-orb-1" />
      <div className="db-orb db-orb-2" />
    </div>

    <div className="db-guest-wrapper">
      <div className="db-guest-hero">
        <div className="db-guest-icon-box">
          <Icons.Brain />
        </div>
        <h1 className="db-guest-title">Understand Your Mind Better</h1>
        <p className="db-guest-subtext">
          Sign in to track your mental health journey, take professional-grade quizzes, 
          and receive personalized neurological insights tailored for you.
        </p>
        <div className="db-guest-ctas">
          <Link to="/login" className="db-action-btn primary" style={{ minWidth: '180px' }}>
            <Icons.Zap /> Start Analysis
          </Link>
          <Link to="/signup" className="db-action-btn" style={{ minWidth: '180px' }}>
            Create Account
          </Link>
        </div>
      </div>

      <div className="db-guest-preview-container">
        <div className="db-preview-overlay" />
        <div className="db-guest-preview-blur">
          <div className="db-overview-grid" style={{ marginBottom: '40px' }}>
            <OverviewCard label="Mental Score" value="84%" trend="up" trendValue="4%" icon={<Icons.Brain />} color="#2ec4b6" isGuest />
            <OverviewCard label="Stress Level" value="Stable" icon={<Icons.Activity />} color="#f43f5e" isGuest />
            <OverviewCard label="Anxiety Level" value="Declining" icon={<Icons.Zap />} color="#3b82f6" isGuest />
            <OverviewCard label="Mood Status" value="Optimized" icon={<Icons.Mood />} color="#7c3aed" isGuest />
          </div>
          <div className="db-card" style={{ height: '300px' }}>
             <DashboardChart dataPoints={[65, 78, 70, 85, 80, 88, 75]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Authenticated View ─────────────────────────────────────────────────────

const AuthenticatedDashboard = ({ user, isPrinting }) => {
  const mentalScore = user.quizzes.length > 0 
    ? Math.round((user.quizzes.reduce((acc, q) => acc + (q.quizResults?.[0]?.quizResult || 70), 0) / user.quizzes.length)) 
    : 0;

  const stressLevel = mentalScore > 80 ? 'Low' : mentalScore > 60 ? 'Moderate' : 'High';
  const anxietyLevel = user.quizzes.length > 3 ? 'Declining' : 'Stable';
  const moodStatus = mentalScore > 75 ? 'Improving' : 'Neutral';

  const recentActivities = user.quizzes.slice(-5).reverse().map(q => ({
    type: 'quiz',
    title: q.quizTitle || 'Mental Check',
    time: new Date(parseInt(q.createdAt || Date.now())).toLocaleDateString(),
    score: q.quizResults?.[0]?.quizAnswer ? q.quizResults[0].quizAnswer.split(' ')[0] : 'N/A'
  }));

  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartData = [65, 72, 68, mentalScore || 75, 82, 80, mentalScore || 85];
  const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="db-page">
      <section className="db-section db-section-black">
        <div className="db-orb-wrapper">
          <div className="db-orb db-orb-1" />
          <div className="db-orb db-orb-2" />
        </div>
        <div className="db-container">
          <header className="db-header">
            <div>
              <h1 className="db-title-h1">Dashboard</h1>
              <p className="db-subtext" style={{ fontSize: '16px', opacity: 0.8 }}>Your personalized mental overview</p>
            </div>
            <div className="db-date">{currentDate}</div>
          </header>
        </div>
      </section>

      <section className="db-section db-section-white">
        <div className="db-container">
          <h3 className="db-section-title">Core Performance Metrics</h3>
          <p className="db-section-desc">A high-level summary of your current psychological state and emotional stability.</p>
          <div className="db-overview-grid">
            <OverviewCard label="Mental Score" value={`${mentalScore}%`} trend="up" trendValue="4%" icon={<Icons.Brain />} color="#2ec4b6" />
            <OverviewCard label="Stress Level" value={stressLevel} icon={<Icons.Activity />} color="#f43f5e" />
            <OverviewCard label="Anxiety Level" value={anxietyLevel} icon={<Icons.Zap />} color="#3b82f6" />
            <OverviewCard label="Mood Status" value={moodStatus} icon={<Icons.Mood />} color="#7c3aed" />
          </div>
        </div>
      </section>

      <section className="db-section db-section-black">
        <div className="db-container">
          <h3 className="db-section-title">In-Depth Mood Tracking</h3>
          <p className="db-section-desc">Visualize your emotional journey over the past 7 days to identify fluctuations and triggers.</p>
          <div className="db-card" style={{ height: '450px' }}>
            <div className="db-chart-container">
              <DashboardChart dataPoints={chartData} labels={chartLabels} isPrinting={isPrinting} />
            </div>
          </div>
        </div>
      </section>

      <section className="db-section db-section-white">
        <div className="db-container">
          <h3 className="db-section-title">AI Analytical Insights</h3>
          <p className="db-section-desc">Deep-dive diagnostics powered by behavioral algorithms and biometric cross-analysis.</p>
          <div className="db-insights-grid">
            <div className="db-card">
              <span className="db-card-label">Biometric Profile</span>
              <div style={{ height: '240px', marginTop: '12px' }}>
                <ProfileRadar stats={[72, 65, 45, 80, 55, 68]} isPrinting={isPrinting} />
              </div>
            </div>
            <div className="db-card">
              <span className="db-card-label">Category Breakdown</span>
              <div style={{ height: '240px', marginTop: '12px' }}>
                <CategoryDoughnut counts={[10, 5, 2, 1, 3]} isPrinting={isPrinting} />
              </div>
            </div>
            <div className="db-card">
              <span className="db-card-label">Real-time Focus</span>
              <div style={{ height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <GaugeChart 
                  id="focus-gauge-premium" 
                  nrOfLevels={30} 
                  percent={0.78} 
                  colors={['#e5e7eb', '#2EC4B6']} 
                  arcWidth={0.2}
                  textColor={isPrinting ? "#000000" : "#ffffff"}
                  needleColor={isPrinting ? "#000000" : "#ffffff"}
                />
              </div>
            </div>
            <div className="db-card">
              <span className="db-card-label">Mind Performance</span>
              <div style={{ marginTop: '12px' }}>
                <GameInsights />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="db-section db-section-black">
        <div className="db-container">
          <div className="db-footer-grid">
            <div className="db-card">
              <h3 className="db-section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>System Activity</h3>
              <ActivityList activities={recentActivities} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="db-card">
                <h3 className="db-section-title" style={{ textAlign: 'left', marginBottom: 8 }}>Recommended Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Link to="/quizselect" className="db-action-btn primary"><Icons.Zap /> Analyze Mental State</Link>
                  <button onClick={() => window.print()} className="db-action-btn"><Icons.FileText /> Export Clinical Report</button>
                </div>
              </div>
              <div className="db-card">
                <h3 className="db-section-title" style={{ textAlign: 'left', marginBottom: 8 }}>AI Observation</h3>
                <InsightCard text={`"Your focus score remains 12% above your average for morning sessions."`} />
                <InsightCard text={`"Stress recovery patterns indicate improved resilience over the last 48 hours."`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Main Controller ─────────────────────────────────────────────────────────

const Dashboard = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const { loading, data } = useQuery(QUERY_USER, {
    skip: !Auth.loggedIn()
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia('print');
    const handleChange = (mql) => setIsPrinting(mql.matches);
    setIsPrinting(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleChange);
    window.onbeforeprint = () => setIsPrinting(true);
    window.onafterprint = () => setIsPrinting(false);
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
      window.onbeforeprint = null;
      window.onafterprint = null;
    };
  }, []);

  if (!Auth.loggedIn()) {
    return <GuestDashboard />;
  }

  if (loading) {
    return <div className="db-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading mental overview...</div>;
  }

  return <AuthenticatedDashboard user={data?.user || { quizzes: [] }} isPrinting={isPrinting} />;
};

export default Dashboard;
import React from 'react';
import { Link } from 'react-router-dom';
import './MentalAnalysis.css';

const Icons = {
  Activity: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  Brain: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Layers: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 12 12 17 22 12"/><polygon points="2 17 12 22 22 17"/></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Shield: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
};

const TestCard = ({ title, desc, time, difficulty, icon: Icon, path, lastAttempt, isRecommended }) => (
  <div className={`ma-card ${isRecommended ? 'recommended' : ''}`}>
    {isRecommended && (
      <div className="ma-rec-badge">Recommended</div>
    )}
    
    <div className="ma-card-top">
      <div className="ma-icon-box">
        <Icon />
      </div>
      <div className="ma-meta">
        <span className={`ma-diff-badge ${difficulty === 'Advanced' ? 'ma-diff-advanced' : 'ma-diff-basic'}`}>
          {difficulty}
        </span>
        <div className="ma-time">
          <Icons.Clock /> {time}
        </div>
      </div>
    </div>

    <h3 className="ma-card-title">{title}</h3>
    <p className="ma-card-desc">{desc}</p>

    <div className="ma-card-footer">
      <span className="ma-last-attempt">
        {lastAttempt ? `Last: ${lastAttempt}` : 'Not attempted yet'}
      </span>
      <Link to={path} className="ma-start-link">
        Start Test <Icons.ArrowRight />
      </Link>
    </div>
  </div>
);

export default function MentalAnalysis() {
  const tests = [
    {
      title: "Stress Test",
      desc: "Identify physiological strain and recovery patterns using biometric markers.",
      time: "2 min",
      difficulty: "Basic",
      icon: Icons.Activity,
      path: "/test/stress",
      lastAttempt: null
    },
    {
      title: "Anxiety Test",
      desc: "Advanced pattern detection for state and trait anxiety indices.",
      time: "3 min",
      difficulty: "Advanced",
      icon: Icons.Heart,
      path: "/test/anxiety",
      lastAttempt: "Nov 12",
      isRecommended: true
    },
    {
      title: "Depression Check",
      desc: "Clinical-grade screening for depressive states and emotional resonance.",
      time: "3 min",
      difficulty: "Advanced",
      icon: Icons.Shield,
      path: "/test/depression",
      lastAttempt: null
    },
    {
      title: "Personality Scan",
      desc: "Jungian-inspired behavioral archetype profiling and core trait analysis.",
      time: "5 min",
      difficulty: "Basic",
      icon: Icons.User,
      path: "/test/personality",
      lastAttempt: null
    },
    {
      title: "Emotional Balance",
      desc: "Measures affective regulation, mood stability, and internal harmony.",
      time: "3 min",
      difficulty: "Basic",
      icon: Icons.Layers,
      path: "/test/emotional",
      lastAttempt: null
    },
    {
      title: "Focus Patterns",
      desc: "Analyze cognitive clarity, attentional resilience, and mental flow.",
      time: "4 min",
      difficulty: "Advanced",
      icon: Icons.Target,
      path: "/test/focus",
      lastAttempt: null
    }
  ];

  return (
    <div className="ma-page">
      <div className="ma-container">
        <header className="ma-header">
          <div className="ma-title-group">
            <div className="ma-accent-line" />
            <h1 className="ma-title">Mental Analysis Hub</h1>
          </div>
          <p className="ma-subtitle">
            Deep-dive diagnostic tools powered by neurobehavioral algorithms. 
            Choose an area of focus to begin your session.
          </p>
        </header>

        <section className="ma-assessments">
          <div className="ma-section-header">
            <h2 className="ma-section-label">Available Assessments</h2>
            <div className="ma-divider" />
          </div>
          
          <div className="ma-grid">
            {tests.map((test, idx) => (
              <TestCard key={idx} {...test} />
            ))}
          </div>
        </section>

        <footer className="ma-footer">
          <div className="ma-footer-content">
            <h3 className="ma-footer-title">Need help choosing?</h3>
            <p className="ma-footer-desc">
              Our AI can recommend a test based on your recent activity and dashboard metrics.
            </p>
          </div>
          <Link to="/dashboard" className="ma-footer-btn">
            View Analytics
          </Link>
        </footer>
      </div>
    </div>
  );
}

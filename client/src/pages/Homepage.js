import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

// ─── Data ──────────────────────────────────────────────────────────────────

const features = [
    {
        icon: '🧩', title: 'Smart Quizzes',
        desc: 'Clinically-inspired questions to detect anxiety, stress, and depression levels with accuracy.',
        bg: '#eff6ff', iconBg: 'linear-gradient(135deg,#3b82f6,#06b6d4)', bar: 'linear-gradient(90deg,#3b82f6,#06b6d4)',
    },
    {
        icon: '🎮', title: 'Mind Games',
        desc: 'Interactive cognitive exercises that reveal hidden thinking patterns and mental agility.',
        bg: '#f5f3ff', iconBg: 'linear-gradient(135deg,#7c3aed,#a855f7)', bar: 'linear-gradient(90deg,#7c3aed,#a855f7)',
    },
    {
        icon: '📊', title: 'AI Insights',
        desc: 'Personalized mental health reports powered by behavioral analysis and AI algorithms.',
        bg: '#f0fdfa', iconBg: 'linear-gradient(135deg,#14b8a6,#10b981)', bar: 'linear-gradient(90deg,#14b8a6,#10b981)',
    },
    {
        icon: '📈', title: 'Progress Tracking',
        desc: 'Visualize your mental wellness journey with mood graphs and improvement milestones.',
        bg: '#fff1f2', iconBg: 'linear-gradient(135deg,#f43f5e,#fb7185)', bar: 'linear-gradient(90deg,#f43f5e,#fb7185)',
    },
];

const steps = [
    { num: '01', icon: '🎯', title: 'Take Quiz / Play Game', desc: 'Choose from quizzes or mind games tailored to detect your mental state.' },
    { num: '02', icon: '🤖', title: 'AI Analyzes Behavior', desc: 'Our engine processes your responses to identify patterns and stress indicators.' },
    { num: '03', icon: '📊', title: 'Get Your Mental Score', desc: 'Receive a detailed breakdown of your anxiety, focus, and emotional health.' },
    { num: '04', icon: '🌱', title: 'Improve with Guidance', desc: 'Get personalized recommendations to improve mental wellness over time.' },
];

const categories = [
    { label: 'Stress Test', icon: '😤', grad: 'linear-gradient(135deg,#fb923c,#ef4444)', overlay: 'linear-gradient(135deg,#fb923c,#ef4444)' },
    { label: 'Anxiety Test', icon: '😰', grad: 'linear-gradient(135deg,#60a5fa,#6366f1)', overlay: 'linear-gradient(135deg,#60a5fa,#6366f1)' },
    { label: 'Depression Check', icon: '🌧️', grad: 'linear-gradient(135deg,#94a3b8,#3b82f6)', overlay: 'linear-gradient(135deg,#94a3b8,#3b82f6)' },
    { label: 'Personality Analysis', icon: '🪞', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', overlay: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
    { label: 'Focus & Thinking Games', icon: '🧠', grad: 'linear-gradient(135deg,#2dd4bf,#06b6d4)', overlay: 'linear-gradient(135deg,#2dd4bf,#06b6d4)' },
    { label: 'Emotional Balance', icon: '⚖️', grad: 'linear-gradient(135deg,#f472b6,#f43f5e)', overlay: 'linear-gradient(135deg,#f472b6,#f43f5e)' },
];

const testimonials = [
    {
        name: 'Priya S.', role: 'Software Engineer', avatar: '👩‍💻', score: '82% Calm',
        text: 'I had no idea my stress levels were this high until I took the quiz. The AI insights were eye-opening.'
    },
    {
        name: 'Arjun M.', role: 'College Student', avatar: '👨‍🎓', score: '67% Calm',
        text: 'The mind games are genuinely fun AND insightful. I discovered I have high anxiety during decision-making.'
    },
    {
        name: 'Sara L.', role: 'Freelance Designer', avatar: '👩‍🎨', score: '91% Calm',
        text: 'Tracking my mood over a month showed me clear patterns. I used to think I was just tired — turns out it was burnout.'
    },
];

const barHeights = [55, 70, 60, 85, 72, 90, 78];
const barDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const insights = [
    { label: 'Stress Level', val: 'Moderate', style: { background: '#fef9c3', color: '#a16207' } },
    { label: 'Sleep Quality', val: 'Good', style: { background: '#dcfce7', color: '#15803d' } },
    { label: 'Anxiety Risk', val: 'Low', style: { background: '#ccfbf1', color: '#0f766e' } },
    { label: 'Focus Score', val: '7.2/10', style: { background: '#dbeafe', color: '#1d4ed8' } },
];

// ─── Score Ring ─────────────────────────────────────────────────────────────

function ScoreRing({ value, label, color }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setCount(p => { if (p >= value) { clearInterval(t); return value; } return p + 1; }), 20);
        return () => clearInterval(t);
    }, [value]);
    const r = 38, circ = 2 * Math.PI * r, offset = circ - (count / 100) * circ;
    return (
        <div className="hp-score-ring-wrap">
            <div className="hp-score-ring-cnt">
                <svg viewBox="0 0 100 100" style={{ width: 88, height: 88, transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" strokeWidth="9" />
                    <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9"
                        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.05s' }} />
                </svg>
                <div className="hp-score-ring-num">{count}%</div>
            </div>
            <span className="hp-score-lbl">{label}</span>
        </div>
    );
}

// ─── Homepage ───────────────────────────────────────────────────────────────

export default function Homepage() {
    return (
        <div className="hp">

            {/* ── HERO ──────────────────────────────────────────────────────── */}
            <section className="hp-hero">
                <div className="hp-hero-orb hp-hero-orb-1" />
                <div className="hp-hero-orb hp-hero-orb-2" />
                <div className="hp-hero-orb hp-hero-orb-3" />

                <div className="hp-hero-inner">

                    <h1 className="hp-h1">
                        Understand Your Mind.
                        <span className="hp-h1-grad">Improve Your Life.</span>
                    </h1>

                    <p className="hp-subtext">
                        Interactive quizzes, mind games, and AI insights to help you track anxiety, stress,
                        and emotional patterns - and take back control.
                    </p>

                    <div className="hp-hero-btns">
                        <Link to="/quizselect" className="hp-btn-primary">Start Mental Analysis →</Link>
                        <Link to="/quizselect" className="hp-btn-secondary">Explore Activities</Link>
                    </div>

                    <div className="hp-hero-stats">
                        {[['10,000+', 'Users Analyzed'], ['95%', 'Accuracy Rate'], ['5 min', 'To Get Insights']].map(([v, l]) => (
                            <div key={l} style={{ textAlign: 'center' }}>
                                <div className="hp-stat-val">{v}</div>
                                <div className="hp-stat-lbl">{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DASHBOARD PREVIEW ─────────────────────────────────────────── */}
            <section className="hp-dashboard-section">
                <div className="hp-container">
                    <div className="hp-text-center hp-mb-56">
                        <span className="hp-section-label" style={{ color: '#14b8a6' }}>Live Preview</span>
                        <h2 className="hp-section-h2">Your Mental Score Dashboard</h2>
                        <p className="hp-section-sub">See exactly what your personalized report looks like after analysis.</p>
                    </div>

                    <div className="hp-dashboard-card">
                        <div className="hp-db-topbar">
                            <div className="hp-db-dot" style={{ background: '#f87171' }} />
                            <div className="hp-db-dot" style={{ background: '#fbbf24' }} />
                            <div className="hp-db-dot" style={{ background: '#4ade80' }} />
                            <span className="hp-db-url">calmpath.app/dashboard</span>
                        </div>

                        <div className="hp-db-body">
                            {/* Score Rings */}
                            <div className="hp-scores-panel">
                                <span className="hp-scores-title">Mental Scores</span>
                                <ScoreRing value={72} label="Calm" color="#2EC4B6" />
                                <ScoreRing value={38} label="Anxiety" color="#7c3aed" />
                                <ScoreRing value={55} label="Focus" color="#326B96" />
                            </div>

                            {/* Charts */}
                            <div className="hp-chart-panel">
                                <span className="hp-chart-title">Weekly Mood Trend</span>
                                <div className="hp-bar-chart">
                                    {barHeights.map((h, i) => (
                                        <div key={i} className="hp-bar-col">
                                            <div className="hp-bar" style={{ height: `${h}%`, opacity: 0.65 + i * 0.05 }} />
                                            <span className="hp-bar-day">{barDays[i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="hp-insights-grid">
                                    {insights.map(({ label, val, style }) => (
                                        <div key={label} className="hp-insight-item">
                                            <span className="hp-insight-key">{label}</span>
                                            <span className="hp-insight-val" style={style}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ──────────────────────────────────────────────────── */}
            <section className="hp-features-section">
                <div className="hp-container">
                    <div className="hp-text-center">
                        <span className="hp-section-label" style={{ color: '#7c3aed' }}>What We Offer</span>
                        <h2 className="hp-section-h2">Everything Your Mind Needs</h2>
                    </div>
                    <div className="hp-features-grid">
                        {features.map(f => (
                            <div key={f.title} className="hp-feature-card" style={{ backgroundColor: f.bg }}>
                                <div className="hp-feature-icon" style={{ background: f.iconBg }}>{f.icon}</div>
                                <h3 className="hp-feature-title">{f.title}</h3>
                                <p className="hp-feature-desc">{f.desc}</p>
                                <div className="hp-feature-bar" style={{ background: f.bar }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
            <section className="hp-how-section">
                <div className="hp-container">
                    <div className="hp-text-center hp-mb-56">
                        <span className="hp-section-label">The Process</span>
                        <h2 className="hp-section-h2">How It Works</h2>
                        <p className="hp-section-sub">
                            Four simple steps to understand your mental state deeply.
                        </p>
                    </div>
                    <div className="hp-how-grid">
                        {steps.map(s => (
                            <div key={s.num} className="hp-how-step">
                                <div className="hp-how-bubble">{s.icon}</div>
                                <span className="hp-how-num">{s.num}</span>
                                <h3 className="hp-how-title">{s.title}</h3>
                                <p className="hp-how-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ────────────────────────────────────────────────── */}
            <section className="hp-cat-section">
                <div className="hp-container">
                    <div className="hp-text-center hp-mb-56">
                        <span className="hp-section-label" style={{ color: '#3b82f6' }}>Explore</span>
                        <h2 className="hp-section-h2">Choose Your Analysis</h2>
                        <p className="hp-section-sub">Pick the area you want to explore. Each test takes under 5 minutes.</p>
                    </div>
                    <div className="hp-cat-grid">
                        {categories.map(cat => (
                            <Link key={cat.label} to="/quizselect" className="hp-cat-card" style={{ textDecoration: 'none' }}>
                                <div className="hp-cat-icon" style={{ background: cat.grad }}>{cat.icon}</div>
                                <span className="hp-cat-label">{cat.label}</span>
                                <span className="hp-cat-arrow">Start →</span>
                                <div className="hp-cat-overlay" style={{ background: cat.overlay }} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
            <section className="hp-testi-section">
                <div className="hp-container">
                    <div className="hp-text-center">
                        <span className="hp-section-label" style={{ color: '#f43f5e' }}>Social Proof</span>
                        <h2 className="hp-section-h2">Trusted by 10,000+ Users</h2>
                        <p className="hp-section-sub" style={{ margin: '12px auto 0' }}>Scientifically-inspired methods. Real results.</p>
                    </div>

                    <div className="hp-trust-badges">
                        {[['🧬', 'Scientifically Inspired'], ['🔒', 'Private & Anonymous'], ['⚡', 'Results in 5 Minutes'], ['🤖', 'AI-Powered Reports']].map(([icon, label]) => (
                            <div key={label} className="hp-trust-badge"><span style={{ fontSize: 18 }}>{icon}</span>{label}</div>
                        ))}
                    </div>

                    <div className="hp-testi-grid">
                        {testimonials.map(t => (
                            <div key={t.name} className="hp-testi-card">
                                <div className="hp-testi-head">
                                    <div className="hp-testi-avatar">{t.avatar}</div>
                                    <div>
                                        <div className="hp-testi-name">{t.name}</div>
                                        <div className="hp-testi-role">{t.role}</div>
                                    </div>
                                    <div className="hp-testi-score">{t.score}</div>
                                </div>
                                <p className="hp-testi-text">"{t.text}"</p>
                                <div className="hp-testi-stars">★★★★★</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
            <section className="hp-cta-section">
                <div className="hp-cta-orb" />
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <span className="hp-cta-label">Ready?</span>
                    <h2 className="hp-cta-h2">
                        Start Your Mental Journey
                        <span className="hp-h1-grad" style={{ display: 'block', fontSize: 'inherit' }}>Today.</span>
                    </h2>
                    <p className="hp-cta-sub">
                        Thousands of people have discovered insights about their mental state.
                        What will you find out about yours?
                    </p>
                    <Link to="/quizselect" className="hp-btn-primary" style={{ fontSize: '1rem', padding: '18px 48px' }}>
                        Begin Now →
                    </Link>
                    <p className="hp-cta-note">
                        <span>Free</span>·<span>Anonymous</span>·<span>Takes 5 minutes</span>
                    </p>
                </div>
            </section>

        </div>
    );
}

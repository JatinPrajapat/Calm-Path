import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import testConfig from '../utils/testConfig';
import { ADD_QUIZRESULT, ADD_QUIZSET } from '../utils/mutations';
import Auth from '../utils/auth';
import './MentalTest.css';

const Icons = {
  ChevronLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" transform="rotate(180 12 12)"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5.16V14h-2v-1.16a2.5 2.5 0 1 1 1.5-2.34 2.5 2.5 0 1 1-1.5 2.34z"/></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

export default function MentalTest() {
  const { testId } = useParams();
  const config = testConfig[testId] || testConfig.stress; // Fallback to stress
  
  const [step, setStep] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(config.questions.length).fill(null));
  const [overallScore, setOverallScore] = useState(null);
  
  const [addQuizSet] = useMutation(ADD_QUIZSET);
  const [addQuizResult] = useMutation(ADD_QUIZRESULT);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset state when testId changes
    setStep('intro');
    setCurrentIndex(0);
    setAnswers(new Array(config.questions.length).fill(null));
  }, [testId, config.questions.length]);

  const handleAnswer = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = score;
    setAnswers(newAnswers);
    if (currentIndex < config.questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const calculateResults = async () => {
    let totalScore = 0;
    answers.forEach((score, idx) => {
      if (config.questions[idx].r) totalScore += (4 - score);
      else totalScore += score;
    });

    const percentage = Math.round((totalScore / (config.questions.length * 4)) * 100);
    
    // 1. Persist this test result to localStorage
    const savedResults = JSON.parse(localStorage.getItem('mental_results') || '{}');
    savedResults[testId] = percentage;
    localStorage.setItem('mental_results', JSON.stringify(savedResults));

    // 2. Calculate Overall Mental Score
    const allValues = Object.values(savedResults);
    const average = Math.round(allValues.reduce((a, b) => a + b, 0) / allValues.length);
    setOverallScore(average);

    // 3. Save to DB if logged in
    if (Auth.loggedIn()) {
      try {
        const { data } = await addQuizSet();
        const category = config.categories.find(c => percentage >= c.min && percentage <= c.max)?.label || "Done";
        await addQuizResult({
          variables: {
            quizSetId: data.addQuizSet._id,
            quizTaken: config.title,
            quizAnswer: `${category} (${percentage}%)`
          }
        });
      } catch (err) { console.error("DB Save failed:", err); }
    }
    setStep('result');
  };

  // ─── Renderers ──────────────────────────────────────────────────────────────

  if (step === 'intro') {
    return (
      <div className="mt-page">
        <div className="mt-card">
          <header className="mt-header">
            <h1 className="mt-title">{config.title}</h1>
            <p className="mt-subtitle">{config.description}</p>
          </header>
          
          <div className="mt-stats">
            <div className="mt-stat-box">
              <span className="mt-stat-label">Duration</span>
              <span className="mt-stat-value">{config.time}</span>
            </div>
            <div className="mt-stat-box">
              <span className="mt-stat-label">Items</span>
              <span className="mt-stat-value">{config.questions.length} Questions</span>
            </div>
          </div>

          <div className="mt-privacy-card">
            <div className="mt-privacy-icon"><Icons.Shield /></div>
            <p className="mt-privacy-text">
              <strong>Biometric Privacy:</strong> Your data is processed locally. We only store categorical outcomes to protect your specific behavioral patterns.
            </p>
          </div>

          <button onClick={() => setStep('quiz')} className="mt-btn-primary">Begin Assessment</button>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const question = config.questions[currentIndex];
    const progress = ((currentIndex + 1) / config.questions.length) * 100;
    const options = [
      { text: "Never", score: 0 },
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 }
    ];

    return (
      <div className="mt-page">
        <div className="mt-card">
          <div className="mt-quiz-top">
            <span className="mt-progress-label">Item {currentIndex + 1} / {config.questions.length}</span>
            <span className="mt-percentage">{Math.round(progress)}%</span>
          </div>
          <div className="mt-progress-bar-bg">
            <div className="mt-progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <h2 className="mt-question">{question.q}</h2>

          <div className="mt-options">
            {options.map((opt) => (
              <button
                key={opt.text}
                onClick={() => handleAnswer(opt.score)}
                className={`mt-option-btn ${answers[currentIndex] === opt.score ? 'selected' : ''}`}
              >
                <span>{opt.text}</span>
                <div className="mt-radio"><div className="mt-radio-inner" /></div>
              </button>
            ))}
          </div>

          <div className="mt-quiz-footer">
            <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)} className="mt-btn-back">
              <Icons.ChevronLeft /> Back
            </button>
            {currentIndex === config.questions.length - 1 ? (
              <button onClick={calculateResults} disabled={answers[currentIndex] === null} className="mt-btn-next finish">Generate Results</button>
            ) : (
              <button onClick={() => setCurrentIndex(currentIndex + 1)} disabled={answers[currentIndex] === null} className="mt-btn-next">Next <Icons.ArrowRight /></button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    let totalScore = 0;
    answers.forEach((score, idx) => {
      if (config.questions[idx].r) totalScore += (4 - score);
      else totalScore += score;
    });
    const percentage = Math.round((totalScore / (config.questions.length * 4)) * 100);
    const category = config.categories.find(c => percentage >= c.min && percentage <= c.max) || config.categories[0];
    
    // Color mapping
    const getColors = (label) => {
      const l = label.toLowerCase();
      if (l.includes('low') || l.includes('stable') || l.includes('high focus') || l.includes('minimal')) return 'mt-green';
      if (l.includes('mild') || l.includes('balanced') || l.includes('average')) return 'mt-blue';
      if (l.includes('moderate') || l.includes('slightly')) return 'mt-yellow';
      return 'mt-red';
    };
    const catClass = getColors(category.label);

    return (
      <div className="mt-page">
        <div className="mt-card" style={{maxWidth: '700px'}}>
          <header className="mt-result-header">
            <h1 className="mt-title" style={{fontSize: '28px'}}>{config.title} Complete</h1>
            <p className="mt-subtitle">Diagnostic Profile Generated</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div className={`mt-result-score-circle ${catClass}`}>
                <span className="mt-score-value">{percentage}%</span>
                <span className="mt-score-label">Sub-Score</span>
              </div>
              <div className={`mt-category-badge ${catClass}`}>{category.label}</div>
            </div>
            
            <div className="mt-overall-section">
              <h3 className="mt-overall-title">Mental Index</h3>
              <div className="mt-overall-grid">
                <div className="mt-overall-score">{overallScore}%</div>
                <div className="mt-overall-desc">
                  Combined average of your {Object.keys(JSON.parse(localStorage.getItem('mental_results') || '{}')).length} active assessments.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-result-info">
            <h3 className="mt-info-title"><Icons.Info /> Analysis</h3>
            <p className="mt-info-text">{category.msg}</p>
          </div>

          <div>
            <h3 className="mt-tips-label">Recommended Actions</h3>
            <div className="mt-tips-list">
              {category.tips.map((tip, i) => (
                <div key={i} className="mt-tip-item"><div className="mt-tip-dot" /> {tip}</div>
              ))}
            </div>
          </div>

          <div className="mt-result-actions">
            <button onClick={() => { setStep('intro'); setCurrentIndex(0); setAnswers(new Array(config.questions.length).fill(null)); }} className="mt-btn-outline">Retake Assessment</button>
            <Link to="/mental-analysis" className="mt-btn-primary" style={{textDecoration: 'none', textAlign: 'center', padding: '14px'}}>Back to Hub</Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

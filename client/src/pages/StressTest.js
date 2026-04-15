import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import questionBank from '../utils/questionBank';
import { ADD_QUIZRESULT, ADD_QUIZSET } from '../utils/mutations';
import Auth from '../utils/auth';
import './StressTest.css';

const { stressQuestions } = questionBank;

// ─── Sub-Components ─────────────────────────────────────────────────────────

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="st-progress-bar-bg">
      <div className="st-progress-bar-fill" style={{ width: `${percentage}%` }} />
    </div>
  );
};

const Icons = {
  ChevronLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" transform="rotate(180 12 12)"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5.16V14h-2v-1.16a2.5 2.5 0 1 1 1.5-2.34 2.5 2.5 0 1 1-1.5 2.34z"/></svg>
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function StressTest() {
  const [step, setStep] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(stressQuestions.length).fill(null));
  
  const [addQuizSet] = useMutation(ADD_QUIZSET);
  const [addQuizResult] = useMutation(ADD_QUIZRESULT);

  const startTest = () => { setStep('quiz'); };

  const handleAnswer = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = score;
    setAnswers(newAnswers);
    
    if (currentIndex < stressQuestions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const calculateResults = async () => {
    let totalScore = 0;
    answers.forEach((score, idx) => {
      if (stressQuestions[idx].reverse) totalScore += (4 - score);
      else totalScore += score;
    });

    const maxScore = stressQuestions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    if (Auth.loggedIn()) {
      try {
        const { data } = await addQuizSet();
        const setId = data.addQuizSet._id;
        
        let category = "Low";
        if (percentage > 75) category = "High";
        else if (percentage > 50) category = "Moderate";
        else if (percentage > 25) category = "Mild";

        await addQuizResult({
          variables: {
            quizSetId: setId,
            quizTaken: 'Stress',
            quizAnswer: `${category} Stress (${percentage}%)`
          }
        });
      } catch (err) { console.error("Save failed:", err); }
    }
    setStep('result');
  };

  // ─── Renderers ──────────────────────────────────────────────────────────────

  if (step === 'intro') {
    return (
      <div className="st-page">
        <div className="st-card">
          <header className="st-header">
            <h1 className="st-title">Stress Analysis</h1>
            <p className="st-subtitle">This clinically-informed assessment measures your current physiological and emotional strain. It takes about 3 minutes to complete.</p>
          </header>
          
          <div className="st-stats">
            <div className="st-stat-box">
              <span className="st-stat-label">Time</span>
              <span className="st-stat-value">2-3 Mins</span>
            </div>
            <div className="st-stat-box">
              <span className="st-stat-label">Questions</span>
              <span className="st-stat-value">10 Items</span>
            </div>
          </div>

          <div className="st-privacy-card">
            <div className="st-privacy-icon"><Icons.Shield /></div>
            <p className="st-privacy-text">
              <strong>Your Privacy Matters:</strong> Responses are private and used only to calculate your results. No raw data is stored without your consent.
            </p>
          </div>

          <button onClick={startTest} className="st-btn-primary">Start Analysis</button>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const question = stressQuestions[currentIndex];
    const progress = ((currentIndex + 1) / stressQuestions.length) * 100;

    return (
      <div className="st-page">
        <div className="st-card">
          <div className="st-quiz-top">
            <span className="st-progress-label">Question {currentIndex + 1} / {stressQuestions.length}</span>
            <span className="st-percentage">{Math.round(progress)}% Complete</span>
          </div>
          <ProgressBar current={currentIndex + 1} total={stressQuestions.length} />

          <h2 className="st-question">{question.question}</h2>

          <div className="st-options">
            {question.response.map((option) => (
              <button
                key={option.text}
                onClick={() => handleAnswer(option.score)}
                className={`st-option-btn ${answers[currentIndex] === option.score ? 'selected' : ''}`}
              >
                <span>{option.text}</span>
                <div className="st-radio"><div className="st-radio-inner" /></div>
              </button>
            ))}
          </div>

          <div className="st-quiz-footer">
            <button 
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="st-btn-back"
            >
              <Icons.ChevronLeft /> Previous
            </button>
            
            {currentIndex === stressQuestions.length - 1 ? (
              <button 
                onClick={calculateResults}
                disabled={answers[currentIndex] === null}
                className="st-btn-next finish"
              >
                See Results
              </button>
            ) : (
              <button 
                onClick={() => setCurrentIndex(currentIndex + 1)}
                disabled={answers[currentIndex] === null}
                className="st-btn-next"
              >
                Next <Icons.ArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    let totalScore = 0;
    answers.forEach((score, idx) => {
      if (stressQuestions[idx].reverse) totalScore += (4 - score);
      else totalScore += score;
    });
    const percentage = Math.round((totalScore / (stressQuestions.length * 4)) * 100);
    
    let category = "Low";
    let catClass = "st-low";
    let message = "You're handling things well. Your stress levels are currently minimal and well-managed.";
    let suggestions = ["Continue your healthy routines", "Try a 5-minute morning meditation", "Maintain your sleep schedule"];

    if (percentage > 75) {
      category = "High"; catClass = "st-high";
      message = "You are currently experiencing significant strain. It's important to prioritize your mental health right now.";
      suggestions = ["Try deep breathing exercises immediately", "Disconnect from digital devices for 2 hours", "Consider speaking with a professional"];
    } else if (percentage > 50) {
      category = "Moderate"; catClass = "st-moderate";
      message = "Your stress levels are elevated. Implementing some relaxation techniques could help prevent further escalation.";
      suggestions = ["Take a walk in nature", "Practice progressive muscle relaxation", "Check in with a friend"];
    } else if (percentage > 25) {
      category = "Mild"; catClass = "st-mild";
      message = "You're experiencing some pressure, but it's within a manageable range for most.";
      suggestions = ["Organize your tasks for tomorrow", "Try a light stretching session", "Listen to a calming playlist"];
    }

    return (
      <div className="st-page">
        <div className="st-card">
          <header className="st-result-header">
            <h1 className="ma-card-title" style={{textAlign: 'center', fontSize: '28px'}}>Your Analysis</h1>
            <p className="st-subtitle">Based on your clinical responses</p>
          </header>

          <div style={{ textAlign: 'center' }}>
            <div className={`st-result-score-circle ${catClass}`}>
              <span className="st-score-value">{percentage}%</span>
              <span className="st-score-label">Score</span>
            </div>
            <div className={`st-category-badge ${catClass}`}>{category} Stress</div>
          </div>

          <div className="st-result-info">
            <h3 className="st-info-title"><Icons.Info /> What this means</h3>
            <p className="st-info-text">{message}</p>
          </div>

          <div>
            <h3 className="st-tips-label">Suggestions</h3>
            <div className="st-tips-list">
              {suggestions.map((tip, i) => (
                <div key={i} className="st-tip-item">
                  <div className="st-tip-dot" /> {tip}
                </div>
              ))}
            </div>
          </div>

          <div className="st-result-actions">
            <button onClick={() => { setStep('intro'); setCurrentIndex(0); setAnswers(new Array(stressQuestions.length).fill(null)); }} className="st-btn-outline">Retake Test</button>
            <Link to="/dashboard" className="st-btn-primary" style={{textDecoration: 'none', textAlign: 'center', padding: '14px'}}>Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

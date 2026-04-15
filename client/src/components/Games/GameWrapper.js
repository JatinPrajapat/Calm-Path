import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameWrapper.css';

export default function GameWrapper({ 
  config, 
  gameComponent: GameComponent, 
  iframeUrl,
  onResultSave 
}) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('intro'); // intro, playing, results
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finalResult, setFinalResult] = useState(null);

  // Sync with game logic
  const handleGameFinish = (data) => {
    // data: { score, time, accuracy, insight }
    const resultWithMeta = {
      ...data,
      gameId: config.id || config.title.toLowerCase().replace(/\s+/g, '_'),
      date: Date.now()
    };
    setFinalResult(resultWithMeta);
    setPhase('results');
    if (onResultSave) onResultSave(resultWithMeta);
  };

  const resetGame = () => {
    setScore(0);
    setTime(0);
    setAccuracy(100);
    setPhase('playing');
  };

  return (
    <div className="gw-container">
      {/* ── Header & HUD ────────────────────────── */}
      <div className="gw-header">
        <div className="gw-title-area">
          <span>Mind Training</span>
          <h2>{config.title}</h2>
        </div>
        
        {phase === 'playing' && (
          <div className="gw-hud">
            <div className="gw-stat">
              <span className="gw-stat-label">Score</span>
              <span className="gw-stat-value">{score}</span>
            </div>
            <div className="gw-stat">
              <span className="gw-stat-label">Accuracy</span>
              <span className="gw-stat-value">{accuracy}%</span>
            </div>
          </div>
        )}

        <button className="gw-btn-exit" onClick={() => navigate('/mind-games')}>
          Exit
        </button>
      </div>

      {/* ── Main Stage ──────────────────────────── */}
      <div className="gw-stage">
        {phase === 'intro' && (
          <div className="gw-overlay animate-fade-in">
            <h1 className="mt-title">{config.title}</h1>
            <p className="gw-instructions">{config.instructions}</p>
            <div className="mt-stats">
              <div className="mt-stat-box">
                <span className="mt-stat-label">Skill</span>
                <span className="mt-stat-value">{config.skill}</span>
              </div>
              <div className="mt-stat-box">
                <span className="mt-stat-label">Level</span>
                <span className="mt-stat-value">{config.difficulty}</span>
              </div>
            </div>
            <button className="gw-btn-primary" onClick={() => setPhase('playing')}>
              Start Game
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="w-full h-full animate-fade-in">
            {iframeUrl ? (
              <div className="relative">
                <iframe 
                  src={iframeUrl} 
                  className="gw-iframe" 
                  title={config.title}
                />
                <div className="absolute bottom-4 right-4">
                  <button 
                    className="gw-btn-primary"
                    onClick={() => handleGameFinish({ score: 0, time: 0, accuracy: 100, insight: 'External activity completed.' })}
                  >
                    Finish Session
                  </button>
                </div>
              </div>
            ) : (
              <GameComponent 
                onFinish={handleGameFinish} 
                updateScore={setScore}
                updateAccuracy={setAccuracy}
                updateTime={setTime}
              />
            )}
          </div>
        )}

        {phase === 'results' && finalResult && (
          <div className="gw-result-card animate-fade-in">
            <h2 className="mt-title">Training Complete</h2>
            <div className="gw-score-display">{finalResult.score}</div>
            
            <div className="gw-metrics-grid">
              <div className="gw-metric-item">
                <span className="gw-stat-label">Accuracy</span>
                <span className="gw-stat-value text-teal">{finalResult.accuracy}%</span>
              </div>
              <div className="gw-metric-item">
                <span className="gw-stat-label">Time</span>
                <span className="gw-stat-value text-teal">{finalResult.time}s</span>
              </div>
              <div className="gw-metric-item">
                <span className="gw-stat-label">Skill</span>
                <span className="gw-stat-value text-teal">{config.skill}</span>
              </div>
            </div>

            <div className="gw-insight-box">
              <h4>System Insight</h4>
              <p>{finalResult.insight || 'Consistent training improves neuroplasticity. Keep going!'}</p>
            </div>

            <div className="gw-footer">
              <button className="gw-btn-exit" onClick={resetGame}>Restart</button>
              <button className="gw-btn-primary" onClick={() => navigate('/mind-games')}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

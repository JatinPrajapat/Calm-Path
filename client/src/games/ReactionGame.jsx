import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function ReactionGame({ onFinish, updateScore, updateAccuracy, updateTime }) {
  const [state, setState] = useState('idle'); // idle, waiting, ready, tooearly, finished
  const [startTime, setStartTime] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [lives, setLives] = useState(3);
  const timerRef = useRef(null);

  const maxAttempts = 5;

  const startWaiting = useCallback(() => {
    if (attempts.length >= maxAttempts || lives <= 0) return;
    
    setState('waiting');
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    timerRef.current = setTimeout(() => {
      setState('ready');
      setStartTime(Date.now());
    }, delay);
  }, [attempts.length, lives]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (state === 'waiting') {
      clearTimeout(timerRef.current);
      setLives(prev => prev - 1);
      setState('tooearly');
      
      if (lives <= 1) {
        finishGame([...attempts, 0]);
      }
    } else if (state === 'ready') {
      const timeTaken = Date.now() - startTime;
      const newAttempts = [...attempts, timeTaken];
      setAttempts(newAttempts);
      
      const currentScore = Math.max(0, 1000 - timeTaken);
      updateScore(currentScore);
      updateTime(timeTaken / 1000);
      
      if (newAttempts.length >= maxAttempts) {
        finishGame(newAttempts);
      } else {
        setState('idle'); // Back to idle to wait for user to start next round
      }
    } else if (state === 'tooearly' || state === 'idle') {
      if (lives > 0 && attempts.length < maxAttempts) {
        startWaiting();
      }
    }
  };

  const finishGame = (finalAttempts) => {
    const validAttempts = finalAttempts.filter(a => a > 0);
    const avgTime = validAttempts.length > 0 
      ? (validAttempts.reduce((a, b) => a + b, 0) / validAttempts.length).toFixed(0)
      : 0;
    
    const finalScore = Math.max(0, 1000 - avgTime);
    const accuracy = Math.round((validAttempts.length / finalAttempts.length) * 100);

    setState('finished');
    onFinish({
      score: finalScore,
      time: (avgTime / 1000).toFixed(2),
      accuracy: accuracy,
      insight: finalScore > 750 
        ? 'Exceptional cognitive reflex velocity detected.' 
        : 'Stable neural response patterns. Ready for focus tasks.'
    });
  };

  const statusConfig = {
    idle: {
      bg: 'bg-slate-900',
      text: 'CLICK TO START',
      sub: 'Wait for the color change',
      icon: '⏱️'
    },
    waiting: {
      bg: 'bg-blue-600',
      text: 'WAIT FOR GREEN...',
      sub: 'Keep your finger ready',
      icon: '⏳'
    },
    ready: {
      bg: 'bg-emerald-500',
      text: 'CLICK NOW!',
      sub: 'FAST AS YOU CAN',
      icon: '⚡'
    },
    tooearly: {
      bg: 'bg-rose-600',
      text: 'TOO EARLY!',
      sub: `Click to try again. Lives: ${lives}`,
      icon: '🚫'
    },
    finished: {
      bg: 'bg-slate-900',
      text: 'ANALYSIS COMPLETE',
      sub: 'Reviewing results...',
      icon: '📊'
    }
  };

  const currentConfig = statusConfig[state];

  return (
    <div 
      className={`w-full h-full flex flex-col items-center justify-center transition-all duration-150 cursor-pointer select-none ${currentConfig.bg}`}
      onClick={handleClick}
    >
      <style>{`
        @keyframes pulse-intense {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        .animate-pulse-intense {
          animation: pulse-intense 0.5s infinite;
        }
      `}</style>

      <div className="text-6xl mb-6">{currentConfig.icon}</div>
      <h2 className={`text-4xl font-black italic tracking-tighter text-white mb-2 ${state === 'ready' ? 'animate-pulse-intense' : ''}`}>
        {currentConfig.text}
      </h2>
      <p className="text-white/70 font-medium tracking-widest text-sm uppercase">
        {currentConfig.sub}
      </p>

      {state !== 'finished' && (
        <div className="absolute top-8 left-8 flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full transition-colors ${i < lives ? 'bg-rose-400' : 'bg-white/10'}`} 
            />
          ))}
        </div>
      )}

      {state === 'idle' && attempts.length > 0 && (
        <div className="mt-8 text-white/40 text-xs">
          Round {attempts.length + 1} of {maxAttempts}
        </div>
      )}
    </div>
  );
}

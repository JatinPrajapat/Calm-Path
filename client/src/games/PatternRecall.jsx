import React, { useState, useEffect, useCallback, useRef } from 'react';

const TILES = [
  { id: 0, color: '#2EC4B6', shadow: 'rgba(46, 196, 182, 0.6)', name: 'Cyan' },     // Teal
  { id: 1, color: '#10B981', shadow: 'rgba(16, 185, 129, 0.6)', name: 'Emerald' },  // Green
  { id: 2, color: '#8B5CF6', shadow: 'rgba(139, 92, 246, 0.6)', name: 'Amethyst' }, // Purple
  { id: 3, color: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.6)', name: 'Amber' },    // Orange
  { id: 4, color: '#EF4444', shadow: 'rgba(239, 68, 68, 0.6)', name: 'Rose' },      // Red
  { id: 5, color: '#6366F1', shadow: 'rgba(99, 102, 241, 0.6)', name: 'Indigo' },    // Blue
];

export default function PatternRecall({ onFinish, updateScore, updateAccuracy, updateTime }) {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, showing, playing, failed
  const [level, setLevel] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  
  const timerRef = useRef(null);

  const showSequence = async (seq) => {
    setIsShowing(true);
    setStatus('showing');
    
    // Smooth delay before starting
    await new Promise(r => setTimeout(r, 800));

    for (const id of seq) {
      setActiveIndex(id);
      await new Promise(r => setTimeout(r, 600)); // Visible for 600ms
      setActiveIndex(null);
      await new Promise(r => setTimeout(r, 200)); // Pause between
    }
    
    setIsShowing(false);
    setStatus('playing');
    setUserInput([]);
  };

  const startNextLevel = useCallback((currentLevel) => {
    // Progression logic: Level 1 = 3 tiles, Level 2 = 4 tiles, etc.
    const nextLen = currentLevel + 2; 
    const newSeq = Array.from({ length: nextLen }, () => Math.floor(Math.random() * TILES.length));
    setSequence(newSeq);
    showSequence(newSeq);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      startNextLevel(1);
    }
  }, [status, startNextLevel]);

  const handleTileClick = (id) => {
    if (isShowing || status !== 'playing') return;

    const nextIndex = userInput.length;
    
    if (id === sequence[nextIndex]) {
      // Correct click
      const newUserInput = [...userInput, id];
      setUserInput(newUserInput);
      setActiveIndex(id);
      setTimeout(() => setActiveIndex(null), 250);

      if (newUserInput.length === sequence.length) {
        // Level Complete
        const nextLevel = level + 1;
        setLevel(nextLevel);
        updateScore(nextLevel * 150);
        updateAccuracy(100);
        setTimeout(() => startNextLevel(nextLevel), 1000);
      }
    } else {
      // Wrong click
      setIsShaking(true);
      setStatus('failed');
      setTimeout(() => setIsShaking(false), 500);
      
      onFinish({
        score: (level - 1) * 150,
        level: level,
        accuracy: Math.round(((sequence.length - 1) / sequence.length) * 100),
        performance: level > 4 ? "Excellent" : "Decent",
        insight: level > 4 ? "Your photographic memory is impressive!" : "Consistent practice will stabilize your recall speed. Your memory improves with repetition."
      });
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto p-4 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 ${isShaking ? 'animate-shake' : ''}`}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
          border-color: #ef4444;
        }
        @keyframes flash-simon {
          0% { filter: brightness(1) saturate(1); transform: scale(1); }
          50% { filter: brightness(1.8) saturate(1.5); transform: scale(1.05); }
          100% { filter: brightness(1) saturate(1); transform: scale(1); }
        }
        .animate-flash-simon {
          animation: flash-simon 0.5s ease-in-out;
        }
      `}</style>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Level {level}</h2>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isShowing ? 'bg-amber-500 animate-pulse' : 'bg-teal-500'}`} />
          <p className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${isShowing ? 'text-amber-500' : 'text-teal-500'}`}>
            {isShowing ? 'Memorize Pattern' : 'Your Turn'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {TILES.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            disabled={isShowing || status === 'failed'}
            className={`
              relative h-32 rounded-2xl transition-all duration-200
              ${activeIndex === tile.id ? 'animate-flash-simon z-10' : 'opacity-100 hover:scale-[1.02] active:scale-95'}
              ${status === 'failed' && !isShowing ? 'grayscale opacity-30' : ''}
              overflow-hidden group
            `}
            style={{
              backgroundColor: tile.color,
              boxShadow: activeIndex === tile.id ? `0 0 60px ${tile.shadow}` : '0 4px 0 rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Visual shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`absolute inset-0 bg-white/30 transition-opacity duration-100 ${activeIndex === tile.id ? 'opacity-100' : 'opacity-0'}`} />
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {sequence.map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full border border-white/10 transition-all duration-300 ${
              i < userInput.length ? 'bg-teal-400 scale-110 shadow-[0_0_10px_#2EC4B6]' : 'bg-white/5'
            }`}
          />
        ))}
      </div>
      
      {status === 'failed' && (
        <div className="mt-8 text-center animate-fade-in">
            <button 
              onClick={() => { setLevel(1); setStatus('idle'); }}
              className="px-10 py-4 bg-white text-black font-black uppercase tracking-tighter rounded-xl hover:bg-teal-400 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Restart Session
            </button>
        </div>
      )}
    </div>
  );
}

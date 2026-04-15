import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function FocusClick({ onFinish, updateScore, updateAccuracy, updateTime }) {
  const [rounds, setRounds] = useState(0);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });
  const [hits, setHits] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isPopping, setIsPopping] = useState(false);
  const spawnTimeRef = useRef(0);
  const maxRounds = 10;

  const spawnTarget = useCallback(() => {
    if (rounds >= maxRounds) return;
    
    setIsWaiting(true);
    const delay = Math.floor(Math.random() * 1200) + 400;
    
    setTimeout(() => {
      setTargetPos({
        top: `${Math.floor(Math.random() * 60) + 20}%`,
        left: `${Math.floor(Math.random() * 60) + 20}%`
      });
      setIsWaiting(false);
      spawnTimeRef.current = Date.now();
    }, delay);
  }, [rounds]);

  useEffect(() => {
    if (rounds === 0 && isWaiting) {
      spawnTarget();
    }
    
    if (rounds >= maxRounds) {
      const avgTime = hits > 0 ? totalTime / hits : 0;
      const accuracy = Math.round((hits / maxRounds) * 100);
      onFinish({
        score: hits * 150, // Premium score
        time: (avgTime / 1000).toFixed(2),
        accuracy: accuracy,
        performance: accuracy >= 80 ? "Sharp" : "Improving",
        insight: accuracy >= 80 ? "Exceptional attentional control. Your focus is laser-sharp." : "Great attempt. Stability improves with consistent daily training."
      });
    }
  }, [rounds, hits, totalTime, maxRounds, onFinish, spawnTarget, isWaiting]);

  const handleHit = (e) => {
    e.stopPropagation();
    if (isWaiting || isPopping) return;

    const reactTime = Date.now() - spawnTimeRef.current;
    
    // Animation trigger
    setIsPopping(true);
    
    setTimeout(() => {
      setHits(h => h + 1);
      setTotalTime(t => t + reactTime);
      setRounds(r => r + 1);
      setIsPopping(false);
      
      const currentScore = (hits + 1) * 150;
      updateScore(currentScore);
      updateAccuracy(Math.round(((hits + 1) / (rounds + 1)) * 100));
      updateTime(reactTime / 1000);
      
      spawnTarget();
    }, 200);
  };

  const handleMiss = () => {
    if (isWaiting || isPopping) return;
    setRounds(r => r + 1);
    updateAccuracy(Math.round((hits / (rounds + 1)) * 100));
    spawnTarget();
  };

  return (
    <div 
      className="w-full h-full relative bg-black/20 rounded-3xl overflow-hidden cursor-crosshair border border-white/5" 
      onClick={handleMiss}
    >
      <style>{`
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; border-width: 4px; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; border-width: 1px; }
        }
        .animate-ripple {
          animation: ripple 1.5s infinite cubic-bezier(0, 0, 0.2, 1);
        }
        @keyframes pop {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .animate-pop {
          animation: pop 0.2s forwards ease-out;
        }
      `}</style>

      {/* Grid Background Aesthetic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {!isWaiting && (
        <>
          {/* Target Ripple */}
          <div 
            className="absolute rounded-full border-2 border-teal-400/30 animate-ripple pointer-events-none"
            style={{ top: targetPos.top, left: targetPos.left, width: '80px', height: '80px' }}
          />
          
          <button
            onClick={handleHit}
            className={`
              absolute w-14 h-14 rounded-full transition-all duration-200
              ${isPopping ? 'animate-pop' : 'hover:scale-110 active:scale-90'}
              bg-gradient-to-br from-teal-300 to-teal-600
              shadow-[0_0_30px_rgba(45,212,191,0.8),inset_0_0_15px_rgba(255,255,255,0.5)]
              flex items-center justify-center border-2 border-white/40
            `}
            style={{ top: targetPos.top, left: targetPos.left, transform: 'translate(-50%, -50%)' }}
          >
             <div className="w-6 h-6 rounded-full border border-white/30" />
          </button>
        </>
      )}
      
      {isWaiting && rounds < maxRounds && (
        <div className="flex items-center justify-center h-full gap-3">
          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">
        Target Acquisition Active
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';

const GAME_DURATION = 30000; // 30 seconds

export default function ZenFlow({ onFinish, updateScore, updateAccuracy, updateTime }) {
  const [dotPos, setDotPos] = useState({ x: 50, y: 50 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 }); // off-screen initially
  const [proximity, setProximity] = useState(0); // 0–1, 1 = on target
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [focusScore, setFocusScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const containerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const onTargetTimeRef = useRef(0);
  const lastCheckRef = useRef(Date.now());
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  const finishGame = useCallback(() => {
    if (!isPlaying) return;
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);

    const totalElapsed = Date.now() - startTimeRef.current;
    const focusRatio = Math.round((onTargetTimeRef.current / totalElapsed) * 100);

    onFinish({
      score: focusRatio * 10,
      time: (totalElapsed / 1000).toFixed(1),
      accuracy: focusRatio,
      performance: focusRatio >= 70 ? "Zen Master" : focusRatio >= 40 ? "Balanced" : "Drifting",
      insight: focusRatio >= 70
        ? "Exceptional sustained attention. Your mind flows like water."
        : focusRatio >= 40
        ? "Good focus foundation. Breath synchronization will sharpen your stability."
        : "Settle your breathing and relax your gaze to improve focus stability."
    });
  }, [isPlaying, onFinish]);

  const animate = useCallback(() => {
    if (!isPlaying) return;

    const now = Date.now();
    const elapsed = now - startTimeRef.current;

    if (elapsed >= GAME_DURATION) {
      finishGame();
      return;
    }

    // Smooth lemniscate (figure-8) path
    angleRef.current += 0.012;
    const t = angleRef.current;
    const x = 50 + 35 * Math.cos(t) / (1 + Math.sin(t) ** 2);
    const y = 50 + 25 * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) ** 2);

    setDotPos({ x, y });

    const remaining = Math.max(0, (GAME_DURATION - elapsed) / 1000);
    setTimeLeft(Math.ceil(remaining));

    // Track on-target time
    const delta = now - lastCheckRef.current;
    lastCheckRef.current = now;

    // Read proximity from ref to avoid stale closure
    const currentProximity = proximityRef.current;
    if (currentProximity > 0.6) {
      onTargetTimeRef.current += delta;
    }

    const currentFocusRatio = Math.round((onTargetTimeRef.current / elapsed) * 100);
    setFocusScore(currentFocusRatio);
    if (updateAccuracy) updateAccuracy(currentFocusRatio);
    if (updateScore) updateScore(currentFocusRatio * 10);

    rafRef.current = requestAnimationFrame(animate);
  }, [isPlaying, finishGame, updateAccuracy, updateScore]);

  const proximityRef = useRef(0);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setCursorPos({ x: mouseX, y: mouseY });

    const dist = Math.sqrt((mouseX - dotPos.x) ** 2 + (mouseY - dotPos.y) ** 2);
    const prox = Math.max(0, 1 - dist / 12);
    setProximity(prox);
    proximityRef.current = prox;
  };

  // Dynamic colors based on proximity
  const orbColor = proximity > 0.6
    ? `rgba(46, 196, 182, ${0.7 + proximity * 0.3})`  // teal
    : proximity > 0.2
    ? `rgba(99, 102, 241, ${0.4 + proximity * 0.5})`   // indigo
    : `rgba(100, 116, 139, 0.5)`;                       // slate

  const glowSize = 20 + proximity * 60;
  const timerPercent = (timeLeft / (GAME_DURATION / 1000)) * 100;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative rounded-3xl overflow-hidden cursor-none select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #0d1117 0%, #000000 100%)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <style>{`
        @keyframes orb-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes cursor-trail {
          0% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
      `}</style>

      {/* Starfield-like background dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 10) % 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Timer ring */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <div className="text-[10px] text-white/30 font-black tracking-widest uppercase">Time Remaining</div>
        <div className="text-2xl font-black text-white/70 tabular-nums">{timeLeft}s</div>
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-teal-400 transition-all duration-1000 rounded-full"
               style={{ width: `${timerPercent}%` }} />
        </div>
      </div>

      {/* Focus Stability Gauge - bottom left */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="text-[10px] text-white/30 font-black tracking-widest uppercase mb-2">Focus Stability</div>
        <div className="flex items-center gap-2">
          <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${focusScore}%`,
                background: focusScore > 60 ? '#2EC4B6' : focusScore > 30 ? '#6366F1' : '#64748b'
              }}
            />
          </div>
          <span className="text-sm font-black" style={{
            color: focusScore > 60 ? '#2EC4B6' : focusScore > 30 ? '#6366F1' : '#64748b'
          }}>
            {focusScore}%
          </span>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-6xl font-black text-white/[0.03] uppercase tracking-[0.5em]">Zen</span>
      </div>

      {/* Moving Orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: `${dotPos.y}%`,
          left: `${dotPos.x}%`,
          transform: 'translate(-50%, -50%)',
          animation: 'orb-breathe 3s ease-in-out infinite',
          zIndex: 10
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: orbColor,
            filter: 'blur(20px)',
            transition: 'background 0.4s ease, width 0.3s ease, height 0.3s ease'
          }}
        />
        {/* Core orb */}
        <div
          className="relative w-10 h-10 rounded-full border flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 35%, white, ${orbColor})`,
            borderColor: proximity > 0.5 ? '#2EC4B6' : '#334155',
            boxShadow: proximity > 0.5 ? `0 0 30px ${orbColor}` : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          top: `${cursorPos.y}%`,
          left: `${cursorPos.x}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div
          className="w-6 h-6 rounded-full border-2 transition-all duration-150"
          style={{
            borderColor: proximity > 0.5 ? '#2EC4B6' : 'rgba(255,255,255,0.4)',
            boxShadow: proximity > 0.5 ? '0 0 15px #2EC4B6' : 'none',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
}

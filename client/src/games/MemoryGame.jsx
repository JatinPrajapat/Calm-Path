import MemoryGame from "react-card-memory-game";
import { useState, useEffect } from "react";

export default function MemoryGameWrapper({ onFinish, updateScore, updateTime }) {
  const [pairs, setPairs] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleMatch = () => {
    setPairs((prev) => {
      const newPairs = prev + 1;
      // Sync with parent HUD if needed (e.g., score as pairs * 10)
      if (updateScore) updateScore(newPairs * 10);
      return newPairs;
    });
  };

  useEffect(() => {
    // Standard grid 4x4 has 8 pairs
    if (pairs === 8) { 
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      if (updateTime) updateTime(timeTaken);

      const result = {
        score: pairs * 10,
        time: timeTaken,
        accuracy: 100, // Library-based game doesn't expose misses easily
        performance: pairs >= 7 ? "Good" : "Needs Improvement",
        insight: pairs >= 7 ? "Excellent short-term recall!" : "Keep practicing to improve your memory span."
      };

      // Support both prop names just in case
      if (onFinish) onFinish(result);
    }
  }, [pairs, startTime, onFinish, updateScore, updateTime]);

  return (
    <div className="flex justify-center w-full">
      <MemoryGame gridNumber={4} foundPair={handleMatch} />
    </div>
  );
}

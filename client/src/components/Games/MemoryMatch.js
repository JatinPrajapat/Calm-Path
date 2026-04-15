import React, { useState, useEffect } from 'react';

const CARD_IMAGES = ['🧠', '⚡', '🛡️', '🎯', '❤️', '🌟', '🌙', '🌀'];

export default function MemoryMatch({ onFinish, updateScore, updateAccuracy, updateTime }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img }));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves(m => {
        const newMoves = m + 1;
        updateScore(newMoves * 10);
        return newMoves;
      });

      const [first, second] = flipped;
      if (cards[first].img === cards[second].img) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped, cards, solved, updateScore]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      const accuracy = Math.round((CARD_IMAGES.length / moves) * 100);
      updateAccuracy(accuracy);
      updateTime(timeTaken);
      
      onFinish({
        score: moves * 10,
        time: timeTaken,
        accuracy: accuracy,
        insight: accuracy > 80 ? 'Excellent visual recall!' : 'Steady improvement in pattern recognition.'
      });
    }
  }, [solved, cards, moves, startTime, onFinish, updateAccuracy, updateTime]);

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;
    setFlipped([...flipped, id]);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 max-w-md mx-auto">
      {cards.map((card) => {
        const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
        return (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer rounded-xl transition-all duration-300 transform ${
              isFlipped ? 'bg-slate-800 rotate-0' : 'bg-slate-700 rotate-180'
            } hover:scale-105 border border-slate-600`}
          >
            {isFlipped ? card.img : '?'}
          </div>
        );
      })}
    </div>
  );
}

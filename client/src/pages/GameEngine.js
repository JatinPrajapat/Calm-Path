import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gameConfig from '../utils/gameConfig';
import GameWrapper from '../components/Games/GameWrapper';
import ReactionGame from '../games/ReactionGame';
import MemoryGame from '../games/MemoryGame';
import FocusClick from '../games/FocusClick';
import PatternRecall from '../games/PatternRecall';
import ZenFlow from '../games/ZenFlow';

import { saveResult } from '../utils/gameResults';

const GameRegistry = {
  reaction: ReactionGame,
  memory: MemoryGame,
  focus: FocusClick,
  pattern: PatternRecall,
  zen: ZenFlow,
};

export default function GameEngine({ gameId: propGameId }) {
  const { gameId: paramGameId } = useParams();
  const gameId = propGameId || paramGameId;

  // Debug Logs
  console.log("GameEngine - Active gameId:", gameId);
  console.log("GameEngine - Registry Map:", GameRegistry);

  const config = gameConfig[gameId];
  const GameComponent = GameRegistry[gameId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameId]);

  if (!config || !GameComponent) {
    console.warn(`GameEngine: Config or Component missing for ID: ${gameId}`);
    return (
      <div className="ge-page" style={{ color: 'white', padding: '100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Game Not Found</h2>
        <p style={{ opacity: 0.6 }}>The session could not be initialized for ID: "{gameId}"</p>
      </div>
    );
  }

  const handleResultSave = (data) => {
    saveResult(data);
  };

  return (
    <div className="ge-page">
      <GameWrapper 
        config={config}
        gameComponent={GameComponent}
        iframeUrl={config.iframeUrl}
        onResultSave={handleResultSave}
      />
    </div>
  );
}

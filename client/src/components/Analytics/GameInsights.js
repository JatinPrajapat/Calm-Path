import React, { useMemo } from 'react';
import { getGameStats, getPlatformStats } from '../../utils/gameResults';
import './GameInsights.css';

const Icons = {
  Brain: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Bulb: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v1"/><path d="M12 21v1"/><path d="M4.22 4.22l.71.71"/><path d="M18.36 18.36l.71.71"/><path d="M1 12h1"/><path d="M21 12h1"/><path d="M4.22 19.78l.71-.71"/><path d="M18.36 5.64l.71-.71"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 6a6 6 0 0 0-5.92 5h11.84A6 6 0 0 0 12 6Z"/></svg>,
  TrendingUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  TrendingDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>,
};

export default function GameInsights() {
  const stats = useMemo(() => getPlatformStats(), []);
  const reactionStats = useMemo(() => getGameStats('reaction'), []);
  const memoryStats = useMemo(() => getGameStats('memory'), []);

  if (!stats) {
    return (
      <div className="gi-card">
        <p className="gi-insight-text">Complete your first mind game to unlock performance insights.</p>
      </div>
    );
  }

  const generateAIInsight = () => {
    if (reactionStats && reactionStats.trend > 0) {
      return "Your response speed has improved significantly this week. Great work on maintaining focus!";
    }
    if (memoryStats && memoryStats.avgScore > 60) {
      return "Your pattern recognition is consistently high. Consider trying 'Advanced' level focusing games.";
    }
    return "Consistently playing 3 games a week is proven to boost cognitive flexibility.";
  };

  return (
    <div className="gi-container">
      <div className="gi-card">
        <div className="gi-card-header">
          <h3 className="gi-card-title">
            <span className="gi-icon"><Icons.Brain /></span>
            Mind Performance
          </h3>
        </div>

        <div className="gi-stats-grid">
          <div className="gi-stat-item">
            <span className="gi-stat-label">Reaction Avg</span>
            <span className="gi-stat-value">{stats.avgReaction}s</span>
            {reactionStats?.trend && (
              <div className={`gi-trend ${reactionStats.trend > 0 ? 'up' : 'down'}`}>
                {reactionStats.trend > 0 ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                {Math.abs(reactionStats.trend)}%
              </div>
            )}
          </div>

          <div className="gi-stat-item">
            <span className="gi-stat-label">Memory Peak</span>
            <span className="gi-stat-value">{stats.bestMemory}</span>
            {memoryStats?.trend && (
              <div className={`gi-trend ${memoryStats.trend > 0 ? 'up' : 'down'}`}>
                {memoryStats.trend > 0 ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                {Math.abs(memoryStats.trend)}%
              </div>
            )}
          </div>

          <div className="gi-stat-item">
            <span className="gi-stat-label">Total Games</span>
            <span className="gi-stat-value">{stats.totalGames}</span>
          </div>
        </div>

        <div className="gi-insight-box">
          <span className="gi-insight-bulb"><Icons.Bulb /></span>
          <p className="gi-insight-text">
            {generateAIInsight()}
          </p>
        </div>
      </div>
    </div>
  );
}

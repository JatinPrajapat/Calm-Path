import React from 'react';
import { Link } from 'react-router-dom';
import gameConfig from '../utils/gameConfig';
import './MindGames.css';

const Icons = {
  Zap: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Brain: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Layers: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 12 12 17 22 12"/><polygon points="2 17 12 22 22 17"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
};

const GameCard = ({ id, title, description, skill, skillTag, icon, difficulty }) => {
  const Icon = Icons[icon] || Icons.Brain;
  
  return (
    <div className="mg-card">
      <div className="mg-card-top">
        <div className="mg-icon-box">
          <Icon />
        </div>
        <span className={`mg-skill-tag skill-${skillTag}`}>
          {skill}
        </span>
      </div>

      <h3 className="mg-card-title">{title}</h3>
      <p className="mg-card-desc">{description}</p>

      <div className="mg-card-footer">
        <span className="mg-difficulty">{difficulty}</span>
        <Link to={`/games/${id}`} className="mg-play-link">
          Play <Icons.ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default function MindGames() {
  const games = Object.entries(gameConfig).map(([id, config]) => ({
    id,
    ...config
  }));

  return (
    <div className="mg-page">
      <div className="mg-container">
        <header className="mg-header">
          <div className="mg-title-group">
            <div className="mg-accent-line" />
            <h1 className="mg-title">Mind Games Hub</h1>
          </div>
          <p className="mg-subtitle">
            Cognitive training modules designed to sharpen your focus, 
            memory, and neural processing speed.
          </p>
        </header>

        <section className="mg-content">
          <div className="mg-grid">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

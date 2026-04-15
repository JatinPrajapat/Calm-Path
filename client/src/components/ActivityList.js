import React from 'react';

const ActivityIcons = {
  quiz: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 4.93 4.24 4.24"/><path d="M2 12h8"/><path d="m4.93 19.07 4.24-4.24"/><path d="M12 22v-8"/><path d="m19.07 19.07-4.24-4.24"/><path d="M22 12h-8"/><path d="m19.07 4.93-4.24 4.24"/></svg>
  ),
  game: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13h.01"/><path d="M18 11h.01"/></svg>
  ),
  insight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  )
};

export default function ActivityList({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="db-activity-item" style={{ justifyContent: 'center', color: '#9ca3af' }}>
        No recent activity found.
      </div>
    );
  }

  return (
    <div className="db-activity-list">
      {activities.map((activity, idx) => (
        <div key={idx} className="db-activity-item">
          <div className="db-activity-icon">
            {activity.type === 'game' ? ActivityIcons.game : ActivityIcons.quiz}
          </div>
          <div className="db-activity-info">
            <div className="db-activity-title">{activity.title}</div>
            <div className="db-activity-time">{activity.time}</div>
          </div>
          {activity.score && (
            <div className="db-activity-score">{activity.score}</div>
          )}
        </div>
      ))}
    </div>
  );
}

const RESULTS_KEY = 'mindGameResults';

export const saveResult = (result) => {
  const existingResults = getAllResults();
  
  const formattedResult = {
    ...result,
    date: Date.now(),
    id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };

  const updatedResults = [...existingResults, formattedResult];
  localStorage.setItem(RESULTS_KEY, JSON.stringify(updatedResults));
  return formattedResult;
};

export const getAllResults = () => {
  const data = localStorage.getItem(RESULTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getGameStats = (gameId) => {
  const all = getAllResults();
  const filtered = all.filter(r => r.gameId === gameId);
  
  if (filtered.length === 0) return null;

  const totalScore = filtered.reduce((acc, curr) => acc + curr.score, 0);
  const avgScore = totalScore / filtered.length;
  const bestScore = Math.max(...filtered.map(r => r.score));
  const avgTime = filtered.reduce((acc, curr) => acc + (parseFloat(curr.time) || 0), 0) / filtered.length;
  
  // Trend calculation (last 3 vs previous 3)
  const recent = filtered.slice(-3);
  const older = filtered.slice(-6, -3);
  
  let trend = null;
  if (recent.length > 0 && older.length > 0) {
    const recentAvg = recent.reduce((acc, curr) => acc + curr.score, 0) / recent.length;
    const olderAvg = older.reduce((acc, curr) => acc + curr.score, 0) / older.length;
    trend = ((recentAvg - olderAvg) / olderAvg) * 100;
  }

  return {
    totalPlayed: filtered.length,
    avgScore: Math.round(avgScore),
    bestScore,
    avgTime: avgTime.toFixed(2),
    trend: trend ? trend.toFixed(1) : null,
    lastResult: filtered[filtered.length - 1]
  };
};

export const getPlatformStats = () => {
  const all = getAllResults();
  if (all.length === 0) return null;

  const reactionStats = getGameStats('reaction');
  const memoryStats = getGameStats('memory');

  return {
    totalGames: all.length,
    avgReaction: reactionStats?.avgTime || 'N/A',
    bestMemory: memoryStats?.bestScore || 0,
    recentTrends: [
        reactionStats?.trend ? { label: 'Speed', value: reactionStats.trend } : null,
        memoryStats?.trend ? { label: 'Memory', value: memoryStats.trend } : null,
    ].filter(Boolean)
  };
};


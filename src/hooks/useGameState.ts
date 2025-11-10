import { useState, useEffect } from 'react';

export function useGameState() {
  const [totalScore, setTotalScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    const savedScore = localStorage.getItem('cakra-total-score');
    const savedLevels = localStorage.getItem('cakra-completed-levels');

    if (savedScore) setTotalScore(parseInt(savedScore));
    if (savedLevels) setCompletedLevels(JSON.parse(savedLevels));
  }, []);

  const updateScore = (points: number) => {
    const newScore = totalScore + points;
    setTotalScore(newScore);
    localStorage.setItem('cakra-total-score', newScore.toString());
  };

  const completeLevel = (levelNumber: number) => {
    if (!completedLevels.includes(levelNumber)) {
      const newLevels = [...completedLevels, levelNumber];
      setCompletedLevels(newLevels);
      localStorage.setItem('cakra-completed-levels', JSON.stringify(newLevels));
    }
  };

  const resetGame = () => {
    setTotalScore(0);
    setCompletedLevels([]);
    localStorage.removeItem('cakra-total-score');
    localStorage.removeItem('cakra-completed-levels');
  };

  return { totalScore, completedLevels, updateScore, completeLevel, resetGame };
}

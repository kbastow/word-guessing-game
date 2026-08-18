import { useState } from "react";

const POINTS_PER_GUESS = 20;
const POINTS_PER_HINT = 10;
const STARTING_SCORE = 100;

export const useScore = () => {
  const [currentScore, setCurrentScore] = useState<number>(STARTING_SCORE);
  const [totalScore, setTotalScore] = useState<number>(0);

  const applyHintPenalty = () => {
    setCurrentScore((prev) => Math.max(0, prev - POINTS_PER_HINT));
  };

  const recordRoundWin = (attempts: number, hintsUsed: number) => {
    const scoreForRound = Math.max(
      0,
      STARTING_SCORE -
        (attempts - 1) * POINTS_PER_GUESS -
        (hintsUsed - 1) * POINTS_PER_HINT
    );
    setCurrentScore(scoreForRound);
    setTotalScore((prev) => prev + scoreForRound);
    return scoreForRound;
  };

  const resetRoundScore = () => {
    setCurrentScore(STARTING_SCORE);
  };

  const resetTotalScore = () => {
    setTotalScore(0);
  };

  return {
    currentScore,
    totalScore,
    applyHintPenalty,
    recordRoundWin,
    resetRoundScore,
    resetTotalScore,
  };
};

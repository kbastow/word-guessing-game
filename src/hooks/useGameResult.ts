import { useState } from "react";

export const useGameResult = () => {
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [resultDialogOpen, setResultDialogOpen] = useState<boolean>(false);

  const openWinDialog = () => {
    setGameWon(true);
    setResultDialogOpen(true);
  };

  const openLossDialog = () => {
    setGameLost(true);
    setResultDialogOpen(true);
  };

  const closeResultDialog = () => {
    setResultDialogOpen(false);
  };

  const resetResult = () => {
    setGameWon(false);
    setGameLost(false);
    setResultDialogOpen(false);
  };

  return {
    gameWon,
    gameLost,
    resultDialogOpen,
    openWinDialog,
    openLossDialog,
    closeResultDialog,
    resetResult,
  };
};

import { useState } from "react";

export const useHintManager = (totalHints: number) => {
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [hintDialogOpen, setHintDialogOpen] = useState<boolean>(false);

  const revealHint = () => {
    if (revealedHints < totalHints) {
      setRevealedHints((prev) => prev + 1);
    }
    setHintDialogOpen(true);
  };

  const closeHintDialog = () => {
    setHintDialogOpen(false);
  };

  const resetHints = () => {
    setRevealedHints(0);
    setHintDialogOpen(false);
  };

  return {
    revealedHints,
    hintDialogOpen,
    revealHint,
    closeHintDialog,
    resetHints,
  };
};

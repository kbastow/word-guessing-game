import React from "react";
import { Button } from "@mui/material";

interface RestartButtonProps {
  onRestart: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => (
  <Button color="error" onClick={onRestart}>
    Restart Game
  </Button>
);

export default RestartButton;

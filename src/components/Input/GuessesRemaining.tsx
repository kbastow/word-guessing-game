import React from "react";
import { Typography } from "@mui/material";

interface GuessesRemainingProps {
  guessesLeft: number;
}

const GuessesRemaining: React.FC<GuessesRemainingProps> = ({ guessesLeft }) => (
  <Typography variant="body2">Guesses Remaining: {guessesLeft}</Typography>
);

export default GuessesRemaining;

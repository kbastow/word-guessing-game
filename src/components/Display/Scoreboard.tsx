import React from "react";
import { Typography } from "@mui/material";

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => (
  <Typography variant="h5">Score: {score}</Typography>
);

export default Scoreboard;

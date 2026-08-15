import React from "react";
import { Box, Typography } from "@mui/material";

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => (
  <Box aria-live="polite">
    <Typography variant="h5">Score: {score}</Typography>
  </Box>
);

export default Scoreboard;

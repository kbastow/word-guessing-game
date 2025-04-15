import React from "react";
import { Typography, Box } from "@mui/material";

interface WordDisplayProps {
  wordState: string[]; // E.g. ['_', '_', 'A', '_']
}

const WordDisplay: React.FC<WordDisplayProps> = ({ wordState }) => (
  <Box display="flex" gap={1}>
    {wordState.map((letter, idx) => (
      <Typography key={idx} variant="h4">
        {letter}
      </Typography>
    ))}
  </Box>
);

export default WordDisplay;

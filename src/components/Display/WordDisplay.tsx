import React from "react";
import { Box } from "@mui/material";

interface WordDisplayProps {
  wordState: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ wordState }) => (
  <Box display="flex" gap={1}>
    {wordState.map((char, index) => (
      <span key={index}>{char.toUpperCase()}</span>
    ))}
  </Box>
);

export default WordDisplay;

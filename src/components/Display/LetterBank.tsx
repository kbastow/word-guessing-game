import React from "react";
import { Box, Chip } from "@mui/material";

interface LetterBankProps {
  guessedLetters: string[];
}

const LetterBank: React.FC<LetterBankProps> = ({ guessedLetters }) => (
  <Box display="flex" gap={1} flexWrap="wrap">
    {guessedLetters.map((letter, i) => (
      <Chip key={i} label={letter} variant="outlined" />
    ))}
  </Box>
);

export default LetterBank;

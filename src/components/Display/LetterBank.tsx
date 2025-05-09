import React from "react";
import { Box, Chip } from "@mui/material";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
interface LetterBankProps {
  guessedLetters: string[];
}

const LetterBank: React.FC<LetterBankProps> = ({ guessedLetters }) => {
  return (
    <Box
      display="flex"
      gap={1}
      flexWrap="wrap"
      width={400}
      sx={{ justifyContent: "center" }}
    >
      {alphabet.map((letter) => (
        <Chip
          key={letter}
          variant="outlined"
          color={guessedLetters.includes(letter) ? "secondary" : "primary"}
          disabled={guessedLetters.includes(letter)}
          label={letter}
        />
      ))}
    </Box>
  );
};

export default LetterBank;

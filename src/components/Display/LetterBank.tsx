import React from "react";
import { Box, Chip } from "@mui/material";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
interface LetterBankProps {
  guessedLetters: string[];
  wordLetters: string[];
  onLetterClick: (letter: string) => void;
}

const LetterBank: React.FC<LetterBankProps> = ({
  guessedLetters,
  wordLetters,
  onLetterClick,
}) => {
  return (
    <Box
      display="flex"
      gap={1}
      flexWrap="wrap"
      width={400}
      sx={{ justifyContent: "center" }}
    >
      {alphabet.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = wordLetters.includes(letter);
        const color = !isGuessed
          ? "primary"
          : isCorrect
          ? "success"
          : "error";

        return (
          <Chip
            key={letter}
            variant="outlined"
            color={color}
            disabled={isGuessed}
            label={letter}
            onClick={() => onLetterClick(letter)}
          />
        );
      })}
    </Box>
  );
};

export default LetterBank;

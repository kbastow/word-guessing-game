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
      sx={{ justifyContent: "center", width: "100%", maxWidth: 400 }}
    >
      {alphabet.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = wordLetters.includes(letter);
        const color = !isGuessed
          ? "primary"
          : isCorrect
          ? "success"
          : "error";
        const variant = isGuessed ? "filled" : "outlined";

        return (
          <Chip
            key={letter}
            variant={variant}
            color={color}
            disabled={isGuessed}
            label={letter}
            onClick={() => onLetterClick(letter)}
            sx={(theme) => ({
              width: 32,
              height: 32,
              borderRadius: "50%",
              "& .MuiChip-label": {
                px: 0,
              },
              ...(isGuessed && {
                backgroundColor: isCorrect
                  ? theme.palette.success.light
                  : theme.palette.error.light,
                color: isCorrect
                  ? theme.palette.success.dark
                  : theme.palette.error.dark,
              }),
            })}
          />
        );
      })}
    </Box>
  );
};

export default LetterBank;

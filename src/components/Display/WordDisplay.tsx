import React from "react";
import { Box, useTheme } from "@mui/material";

interface WordDisplayProps {
  wordState: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ wordState }) => {
  const theme = useTheme();

  return (
    <Box display="flex" gap={1}>
      {wordState.map((char, index) => {
        const isRevealed = char !== "_";
        return (
          <Box
            key={index}
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: `${theme.shape.borderRadius}px`,
              border: isRevealed
                ? "none"
                : `2px solid ${theme.palette.divider}`,
              backgroundColor: isRevealed
                ? theme.palette.success.light
                : "transparent",
              color: isRevealed
                ? theme.palette.success.dark
                : theme.palette.text.primary,
              fontWeight: 700,
              fontSize: "1.25rem",
              textTransform: "uppercase",
            }}
          >
            {isRevealed ? char.toUpperCase() : ""}
          </Box>
        );
      })}
    </Box>
  );
};

export default WordDisplay;

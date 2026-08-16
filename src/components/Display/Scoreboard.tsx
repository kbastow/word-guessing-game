import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
  const theme = useTheme();

  return (
    <Box aria-live="polite">
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: 3,
          py: 1,
          borderRadius: theme.shape.borderRadius * 4,
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
        }}
      >
        <Typography component="span">
          Score: {score}
        </Typography>
      </Box>
    </Box>
  );
};

export default Scoreboard;

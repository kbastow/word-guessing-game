import React from "react";
import { Box, Typography } from "@mui/material";

interface HintDisplayProps {
  revealedHints: string[];
  totalHints: number;
}

const HintDisplay: React.FC<HintDisplayProps> = ({
  revealedHints,
  totalHints,
}) => (
  <Box>
    <Typography variant="h6">Hints</Typography>
    {revealedHints.map((hint, i) => (
      <Typography key={i}>• {hint}</Typography>
    ))}
    <Typography variant="caption">
      {revealedHints.length}/{totalHints} hints shown
    </Typography>
  </Box>
);

export default HintDisplay;

import React from "react";
import { Box, Typography } from "@mui/material";

interface HintDisplayProps {
  revealedHints: string[];
  totalHints: number;
  currentHintIndex: number;
}

const HintDisplay: React.FC<HintDisplayProps> = ({
  revealedHints,
  totalHints,
  currentHintIndex,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", m: 1 }}>
    <Typography variant="h6">Word Hint</Typography>
    {revealedHints.length > 0 && <Typography>{revealedHints[0]}</Typography>}
    <Typography variant="caption">
      Hint {currentHintIndex}/{totalHints}
    </Typography>
  </Box>
);

export default HintDisplay;

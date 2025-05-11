import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface HintDisplayProps {
  revealedHints: string[];
  totalHints: number;
}

const HintDisplay: React.FC<HintDisplayProps> = ({
  revealedHints,
  totalHints,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", p: 1, m: 1 }}>
    <Typography variant="h6">Word Hint</Typography>
    {revealedHints.map((hint, i) => (
      <Typography key={i}>{hint}</Typography>
    ))}
    <Typography variant="caption">
      Hint {revealedHints.length}/{totalHints}
    </Typography>
    <Button size="small" variant="contained" color="secondary">
      Get Hint
    </Button>
  </Box>
);

export default HintDisplay;

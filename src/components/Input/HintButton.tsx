import React from "react";
import { Button } from "@mui/material";

interface HintButtonProps {
  onHint: () => void;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint }) => (
  <Button variant="outlined" color="secondary" onClick={onHint}>
    Get Hint
  </Button>
);

export default HintButton;

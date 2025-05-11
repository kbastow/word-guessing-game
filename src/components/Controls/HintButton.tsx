import React from "react";
import { Button } from "@mui/material";

interface HintButtonProps {
  onHint: () => void;
  disabled?: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint, disabled }) => (
  <Button
    variant="outlined"
    color="secondary"
    onClick={onHint}
    disabled={disabled}
  >
    Get Hint
  </Button>
);

export default HintButton;

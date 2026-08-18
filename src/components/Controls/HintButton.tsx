import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface HintButtonProps {
  onHint: () => void;
  disabled?: boolean;
  hintsRemaining: number;
}

const HintButton: React.FC<HintButtonProps> = ({
  onHint,
  disabled,
  hintsRemaining,
}) => {
  const displayedHintsRemaining = disabled ? 0 : hintsRemaining;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onHint}
        disabled={disabled}
        sx={(theme) => ({
          borderColor: theme.palette.secondary.main,
          color: theme.palette.secondary.main,
        })}
      >
        Get Hint
      </Button>
      <Typography variant="caption" color="text.secondary">
        {displayedHintsRemaining} hint{displayedHintsRemaining === 1 ? "" : "s"}{" "}
        remaining
      </Typography>
    </Box>
  );
};

export default HintButton;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface HintDisplayProps {
  open: boolean;
  onClose: () => void;
  revealedHints: string[];
  totalHints: number;
  currentHintIndex: number;
}

const HintDisplay: React.FC<HintDisplayProps> = ({
  open,
  onClose,
  revealedHints,
  totalHints,
  currentHintIndex,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="hint-dialog-title"
    slotProps={{
      paper: {
        sx: (theme) => ({
          borderRadius: `${theme.shape.borderRadius}px`, py: 4, px: 8,
        }),
      },
    }}
  >
    <DialogTitle id="hint-dialog-title" sx={{ textAlign: "center" }}>
      Word Hint
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent sx={{ textAlign: "center", px: 4, py: 3 }}>
      {revealedHints.length > 0 && (
        <DialogContentText aria-live="polite">
          {revealedHints[0]}
        </DialogContentText>
      )}
      <Typography variant="caption">
        Hint {currentHintIndex}/{totalHints}
      </Typography>
    </DialogContent>
  </Dialog>
);

export default HintDisplay;

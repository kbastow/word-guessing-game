import React from "react";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  onSubmit: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, disabled }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onSubmit}
    disabled={disabled}
  >
    Submit
  </Button>
);

export default SubmitButton;

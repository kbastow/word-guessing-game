import React from "react";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => (
  <Button variant="contained" color="primary" onClick={onSubmit}>
    Submit
  </Button>
);

export default SubmitButton;

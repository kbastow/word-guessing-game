import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import SubmitButton from "../Controls/SubmitButton";

interface InputSectionProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onGuess: (guess: string) => void;
  wordLength: number;
  attemptsRemaining: number;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputValue,
  onInputChange,
  onGuess,
  wordLength,
  attemptsRemaining,
}) => {
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleSubmit = () => {
    if (inputValue.length === wordLength && /^[A-Za-z]+$/.test(inputValue)) {
      onGuess(inputValue.toUpperCase());
    } else {
      setHasAttemptedSubmit(true);
    }
  };

  const isInputInvalid = inputValue.length !== wordLength;
  const showError = hasAttemptedSubmit && isInputInvalid;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        label={`Enter your guess`}
        error={showError}
        helperText={
          showError ? `Word must be exactly ${wordLength} letters` : ""
        }
      />
      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
        <SubmitButton onSubmit={handleSubmit} disabled={isInputInvalid} />
        <Typography variant="caption" color="text.secondary">
          {attemptsRemaining} attempt{attemptsRemaining === 1 ? "" : "s"}{" "}
          remaining
        </Typography>
      </Box>
    </Box>
  );
};

export default InputSection;

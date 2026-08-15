import { useState } from "react";
import { Box, TextField } from "@mui/material";
import SubmitButton from "../Controls/SubmitButton";

interface InputSectionProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onGuess: (guess: string) => void;
  wordLength: number;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputValue,
  onInputChange,
  onGuess,
  wordLength,
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
      <SubmitButton onSubmit={handleSubmit} disabled={isInputInvalid} />
    </Box>
  );
};

export default InputSection;

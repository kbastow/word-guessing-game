import { Box, TextField } from "@mui/material";
import SubmitButton from "../Controls/SubmitButton";

interface InputSectionProps {
  inputValue: string;
  onInputChange: (calue: string) => void;
  onGuess: (guess: string) => void;
  wordLength: number;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputValue,
  onInputChange,
  onGuess,
  wordLength,
}) => {
  const handleSubmit = () => {
    if (inputValue.length === wordLength && /^[A-Za-z]+$/.test(inputValue)) {
      console.log("The word guessed was:", inputValue.toUpperCase());
      onGuess(inputValue.toUpperCase());
    } else {
      console.log("Invalid input, not submitting.");
    }
  };

  const isInputInvalid = inputValue.length !== wordLength;

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
        error={isInputInvalid}
        helperText={
          isInputInvalid ? `Word must be exactly ${wordLength} letters` : ""
        }
      />
      <SubmitButton onSubmit={handleSubmit} disabled={isInputInvalid} />
    </Box>
  );
};

export default InputSection;

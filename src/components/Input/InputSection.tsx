import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import SubmitButton from "./SubmitButton";

interface InputSectionProps {
  onGuess: (guess: string) => void;
  wordLength: number;
}

const InputSection: React.FC<InputSectionProps> = ({ onGuess, wordLength }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.length === wordLength && /^[A-Za-z]+$/.test(input)) {
      console.log("The word guessed was:", input.toUpperCase());
      onGuess(input.toUpperCase());
      setInput(""); // Clear the input field after submission
    } else {
      console.log("Invalid input, not submitting.");
    }
  };

  const isInputInvalid = input.length !== wordLength;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        label={`Enter a ${wordLength} letter word`}
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

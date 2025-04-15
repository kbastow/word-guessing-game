import React from "react";
import { Box } from "@mui/material";
import WordGuessInput from "./WordGuessInput";
import SubmitButton from "./SubmitButton";
import HintButton from "./HintButton";
import GuessesRemaining from "./GuessesRemaining";

const InputSection: React.FC = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <WordGuessInput />
    <Box display="flex" gap={2}>
      <SubmitButton onSubmit={() => {}} />
      <HintButton onHint={() => {}} />
    </Box>
    <GuessesRemaining guessesLeft={5} />
  </Box>
);

export default InputSection;

import WordDisplay from "../Display/WordDisplay";
import Scoreboard from "../Controls/Scoreboard";
import LetterBank from "../Display/LetterBank";
import InputSection from "../Input/InputSection";
import RestartButton from "../Controls/RestartButton";
import HintDisplay from "../Display/HintDisplay";
import { Box } from "@mui/material";

const GameBoard: React.FC = () => {
  return (
    <Box
      className="flex-center"
      display="flex"
      flexDirection="column"
      gap={4}
      py={4}
    >
      <Scoreboard score={0} />
      <WordDisplay wordState={["_", "_", "_", "_", "_"]} />
      <HintDisplay revealedHints={["Hint 1"]} totalHints={3} />
      <LetterBank guessedLetters={["A", "E", "T"]} />
      <InputSection />
      <RestartButton onRestart={() => {}} />
    </Box>
  );
};

export default GameBoard;

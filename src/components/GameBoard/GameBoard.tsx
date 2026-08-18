import React from "react";
import WordDisplay from "../Display/WordDisplay";
import Scoreboard from "../Display/Scoreboard.tsx";
import LetterBank from "../Display/LetterBank";
import InputSection from "../Input/InputSection";
import RestartButton from "../Controls/RestartButton";
import HintDisplay from "../Display/HintDisplay";
import HintButton from "../Controls/HintButton";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useWordGame } from "../../hooks/useWordGame";
import { useGuessLogic } from "../../hooks/useGuessLogic";
import { useScore } from "../../hooks/useScore";
import { useHintManager } from "../../hooks/useHintManager";
import { useGameResult } from "../../hooks/useGameResult";

const MAX_ATTEMPTS = 5;

const GameBoard: React.FC = () => {
  const { currentWord, startNewWord } = useWordGame();
  const {
    inputValue,
    guessedLetters,
    revealedLetters,
    attempts,
    submitGuess,
    addLetterToInput,
    updateInput,
    resetGuessState,
  } = useGuessLogic(currentWord.word, MAX_ATTEMPTS);
  const {
    currentScore,
    totalScore,
    applyHintPenalty,
    recordRoundWin,
    resetRoundScore,
    resetTotalScore,
  } = useScore();
  const {
    revealedHints,
    hintDialogOpen,
    revealHint,
    closeHintDialog,
    resetHints,
  } = useHintManager(currentWord.hints.length);
  const {
    gameWon,
    gameLost,
    resultDialogOpen,
    openWinDialog,
    openLossDialog,
    closeResultDialog,
    resetResult,
  } = useGameResult();

  const handleGuess = (guess: string) => {
    const result = submitGuess(guess);
    if (!result) return;

    if (result.correct) {
      recordRoundWin(result.attempts, revealedHints);
      openWinDialog();
    } else if (result.attemptsExhausted) {
      openLossDialog();
    }
  };

  const handleGetHint = () => {
    revealHint();
    applyHintPenalty();
  };

  const resetGameState = (isRestart: boolean) => {
    const newWord = startNewWord();
    resetGuessState(newWord.word.length);
    resetHints();
    resetResult();
    resetRoundScore();
    if (isRestart) {
      resetTotalScore();
    }
  };

  const handleRestart = () => {
    resetGameState(true);
  };

  const handleContinuePlaying = () => {
    resetGameState(false);
  };

  return (
    <Box
      className="flex-center"
      display="flex"
      flexDirection="column"
      gap={4}
      pt={16}
      pb={4}
      sx={{ position: "relative" }}
    >
      <WordDisplay wordState={revealedLetters} />
      <HintDisplay
        open={hintDialogOpen}
        onClose={closeHintDialog}
        revealedHints={[currentWord.hints[revealedHints - 1]]}
        totalHints={currentWord.hints.length}
        currentHintIndex={revealedHints}
      />
      <HintButton
        onHint={handleGetHint}
        disabled={revealedHints >= currentWord.hints.length}
        hintsRemaining={currentWord.hints.length - revealedHints}
      />
      <LetterBank
        guessedLetters={guessedLetters}
        wordLetters={currentWord.word.toUpperCase().split("")}
        onLetterClick={addLetterToInput}
      />
      <Dialog
        open={resultDialogOpen && gameWon}
        onClose={closeResultDialog}
        aria-labelledby="win-dialog-title"
        slotProps={{
          paper: {
            sx: (theme) => ({
              borderRadius: `${theme.shape.borderRadius}px`, py: 4, px: 8,
            }),
          },
        }}
      >
        <DialogTitle id="win-dialog-title" sx={{ textAlign: "center" }}>
          You Win!
          <IconButton
            aria-label="close"
            onClick={closeResultDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 4, py: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={1} justifyContent="center">
            <CheckCircleIcon color="success" fontSize="large" />
            <Typography variant="h5" color="text.primary">
              You scored {currentScore} points this round.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              closeResultDialog();
              handleContinuePlaying();
            }}
          >
            Next Round
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={resultDialogOpen && gameLost}
        onClose={closeResultDialog}
        aria-labelledby="loss-dialog-title"
        slotProps={{
          paper: {
            sx: (theme) => ({
              borderRadius: `${theme.shape.borderRadius}px`, py: 4, px: 8,
            }),
          },
        }}
      >
        <DialogTitle id="loss-dialog-title" sx={{ textAlign: "center" }}>
          Game Over
          <IconButton
            aria-label="close"
            onClick={closeResultDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 4, py: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={1} justifyContent="center">
            <CancelIcon color="error" fontSize="large" />
            <Typography variant="h5" color="text.primary">
              The word was '
              {currentWord.word.toUpperCase()}'.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              closeResultDialog();
              handleRestart();
            }}
          >
            Restart
          </Button>
        </DialogActions>
      </Dialog>
      {}
      {gameWon ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={4} p={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinuePlaying}
          >
            Next Round
          </Button>
        </Box>
      ) : gameLost ? null : (
        <InputSection
          inputValue={inputValue}
          onInputChange={updateInput}
          onGuess={handleGuess}
          wordLength={currentWord.word.length}
          attemptsRemaining={MAX_ATTEMPTS - attempts}
        />
      )}
      <Box sx={{ position: "absolute", top: 2, left: 2, zIndex: 1 }}>
        <RestartButton onRestart={handleRestart} />
      </Box>
      <Box sx={{ position: "absolute", top: 2, right: 2, zIndex: 1 }}>
        <Scoreboard score={totalScore} />
      </Box>
    </Box>
  );
};

export default GameBoard;

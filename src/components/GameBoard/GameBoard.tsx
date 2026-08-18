import React, { useState } from "react";
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
import { wordList } from "../../data/wordList.ts";

const MAX_ATTEMPTS = 5;
const POINTS_PER_GUESS = 20;
const POINTS_PER_HINT = 10;

const GameBoard: React.FC = () => {
  // Initialise random word
  const generateRandomWord = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("The word to guess is:", randomWord.word.toUpperCase());
    return { word: randomWord.word, hints: randomWord.hints };
  };

  // State
  const [currentWord, setCurrentWord] = useState(generateRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [revealedLetters, setRevealedLetters] = useState<string[]>(
    Array(currentWord.word.length).fill("_")
  );
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [hintDialogOpen, setHintDialogOpen] = useState<boolean>(false);
  const [resultDialogOpen, setResultDialogOpen] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(100);

  // Handle guess function
  const handleGuess = (guess: string) => {
    if (guess.length === currentWord.word.length) {
      const newAttempts = attempts + 1;
      if (guess.toUpperCase() === currentWord.word.toUpperCase()) {
        // Correct word guessed: reveal the entire word
        console.log("Correct word guessed! Score for round is:", {
          currentScore,
        });
        setRevealedLetters(currentWord.word.split(""));
        setGameWon(true);
        setResultDialogOpen(true);
        const scoreForRound = Math.max(
          0,
          100 -
            (newAttempts - 1) * POINTS_PER_GUESS -
            (revealedHints - 1) * POINTS_PER_HINT
        );
        setCurrentScore(scoreForRound);
        setTotalScore((prev) => prev + scoreForRound);
      } else {
        // Incorrect word guessed: reveal only the correctly guessed letters
        setRevealedLetters((prev) =>
          currentWord.word
            .split("")
            .map((char, index) =>
              guess
                .split("")
                .some(
                  (guessedChar) =>
                    guessedChar.toUpperCase() === char.toUpperCase()
                )
                ? currentWord.word[index].toUpperCase()
                : prev[index]
            )
        );

        // Check if maximum attempts is reached
        if (newAttempts >= MAX_ATTEMPTS) {
          console.log("Game lost :(");
          setGameLost(true);
          setResultDialogOpen(true);
        }
      }

      setAttempts(newAttempts);

      // Add all letters from the guessed word to guessedLetters
      const newGuessedLetters = guess.toUpperCase().split("");
      setGuessedLetters((prev) => [
        ...new Set([...prev, ...newGuessedLetters]),
      ]);
      setInputValue("");
    } else {
      console.log("Invalid guess length");
    }
  };

  const handleLetterClick = (letter: string) => {
    setInputValue((prev) => prev + letter);
    console.log("Letter clicked", letter);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // Helper function to reset the game state
  const resetGameState = (isRestart: boolean) => {
    const newWord = generateRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setInputValue("");
    setRevealedLetters(Array(newWord.word.length).fill("_"));
    setRevealedHints(0);
    setGameWon(false);
    setGameLost(false);
    setAttempts(0);
    setCurrentScore(100);
    setHintDialogOpen(false);
    setResultDialogOpen(false);
    if (isRestart) {
      setTotalScore(0);
      console.log("Game reset!");
    } else {
      console.log("Next round.");
    }
  };

  // Handle restart function
  const handleRestart = () => {
    resetGameState(true);
  };

  // Handle continue playing function
  const handleContinuePlaying = () => {
    resetGameState(false);
  };

  // Handle hint function
  const handleGetHint = () => {
    if (revealedHints < currentWord.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
    setCurrentScore((prev) => Math.max(0, prev - POINTS_PER_HINT));
    setHintDialogOpen(true);
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
        onClose={() => setHintDialogOpen(false)}
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
        onLetterClick={handleLetterClick}
      />
      <Dialog
        open={resultDialogOpen && gameWon}
        onClose={() => setResultDialogOpen(false)}
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
            onClick={() => setResultDialogOpen(false)}
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
              setResultDialogOpen(false);
              handleContinuePlaying();
            }}
          >
            Next Round
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={resultDialogOpen && gameLost}
        onClose={() => setResultDialogOpen(false)}
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
            onClick={() => setResultDialogOpen(false)}
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
              setResultDialogOpen(false);
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
          onInputChange={handleInputChange}
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

import React, { useState } from "react";
import WordDisplay from "../Display/WordDisplay";
import Scoreboard from "../Display/Scoreboard.tsx";
import LetterBank from "../Display/LetterBank";
import InputSection from "../Input/InputSection";
import RestartButton from "../Controls/RestartButton";
import HintDisplay from "../Display/HintDisplay";
import HintButton from "../Controls/HintButton";
import { Box, Button, Typography } from "@mui/material";
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
  const [revealedLetters, setRevealedLetters] = useState<string[]>(
    Array(currentWord.word.length).fill("_")
  );
  const [revealedHints, setRevealedHints] = useState<number>(1);
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
        }
      }

      setAttempts(newAttempts);

      // Add all letters from the guessed word to guessedLetters
      const newGuessedLetters = guess.toUpperCase().split("");
      setGuessedLetters((prev) => [
        ...new Set([...prev, ...newGuessedLetters]),
      ]);
    } else {
      console.log("Invalid guess length");
    }
  };

  // Handle restart function
  const handleRestart = () => {
    const newWord = generateRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setRevealedLetters(Array(newWord.word.length).fill("_"));
    setRevealedHints(1);
    setGameWon(false);
    setGameLost(false);
    setAttempts(0);
    setCurrentScore(100);
    setTotalScore(0);
    console.log("Game reset!");
  };

  // Handle continue playing function
  const handleContinuePlaying = () => {
    const newWord = generateRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setRevealedLetters(Array(newWord.word.length).fill("_"));
    setRevealedHints(1);
    setGameWon(false);
    setGameLost(false);
    setAttempts(0);
    setCurrentScore(100);
    console.log("Next round.");
  };

  // Handle hint function
  const handleGetHint = () => {
    if (revealedHints < currentWord.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
    setCurrentScore((prev) => Math.max(0, prev - POINTS_PER_HINT));
  };

  return (
    <Box
      className="flex-center"
      display="flex"
      flexDirection="column"
      gap={4}
      py={4}
    >
      <Scoreboard score={totalScore} />
      <WordDisplay wordState={revealedLetters} />
      <HintDisplay
        revealedHints={[currentWord.hints[revealedHints - 1]]}
        totalHints={currentWord.hints.length}
        currentHintIndex={revealedHints}
      />
      <HintButton
        onHint={handleGetHint}
        disabled={revealedHints >= currentWord.hints.length}
      />
      <LetterBank guessedLetters={guessedLetters} />
      {gameWon ? (
        <Box display="flex" flexDirection="column" gap={4} py={4}>
          <Typography variant="h5" color="success.main">
            Congratulations! You guessed the word. Score for this round is:{" "}
            {currentScore}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinuePlaying}
          >
            Next Word
          </Button>
        </Box>
      ) : gameLost ? (
        <Box display="flex" flexDirection="column" gap={4} py={4}>
          <Typography variant="h5" color="success.main">
            You lose! The correct word was "{currentWord.word.toUpperCase()}".
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinuePlaying}
          >
            Next Word
          </Button>
        </Box>
      ) : (
        <InputSection
          onGuess={handleGuess}
          wordLength={currentWord.word.length}
        />
      )}
      <RestartButton onRestart={handleRestart} />
    </Box>
  );
};

export default GameBoard;

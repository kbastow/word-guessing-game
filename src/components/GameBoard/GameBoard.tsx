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
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);

  // Helper function for upperCase conversion
  const isCaseInsensitiveMatch = (a: string, b: string): boolean => {
    return a.toUpperCase() === b.toUpperCase();
  };

  // Handle guess function
  const handleGuess = (guess: string) => {
    if (guess.length === currentWord.word.length) {
      if (isCaseInsensitiveMatch(guess, currentWord.word)) {
        // Correct word guessed: reveal the entire word
        console.log("Correct word guessed!");
        setRevealedLetters(currentWord.word.split(""));
        setGameWon(true);
        setCorrectGuesses((prev) => prev + 1);
      } else {
        // Incorrect word guessed: reveal only the correctly guessed letters
        setRevealedLetters((prev) =>
          currentWord.word
            .split("")
            .map((char, index) =>
              guess
                .split("")
                .some((guessedChar) =>
                  isCaseInsensitiveMatch(guessedChar, char)
                )
                ? currentWord.word[index].toUpperCase()
                : prev[index]
            )
        );
      }

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
    setCorrectGuesses(0);
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
    console.log("Contining to next word...");
  };

  // Handle hint function
  const handleGetHint = () => {
    if (revealedHints < currentWord.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  return (
    <Box
      className="flex-center"
      display="flex"
      flexDirection="column"
      gap={4}
      py={4}
    >
      <Scoreboard score={correctGuesses} />
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
            Congratulations! You guessed the word.
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

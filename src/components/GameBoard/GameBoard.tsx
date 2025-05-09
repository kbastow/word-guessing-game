import React, { useState } from "react";
import WordDisplay from "../Display/WordDisplay";
import Scoreboard from "../Controls/Scoreboard";
import LetterBank from "../Display/LetterBank";
import InputSection from "../Input/InputSection";
import RestartButton from "../Controls/RestartButton";
import HintDisplay from "../Display/HintDisplay";
import { Box } from "@mui/material";
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

  const handleRestart = () => {
    const newWord = generateRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setRevealedLetters(Array(newWord.word.length).fill("_"));
    console.log("Game reset!");
  };

  return (
    <Box
      className="flex-center"
      display="flex"
      flexDirection="column"
      gap={4}
      py={4}
    >
      <Scoreboard score={0} />
      <WordDisplay wordState={revealedLetters} />
      <HintDisplay revealedHints={["Hint 1"]} totalHints={3} />
      <LetterBank guessedLetters={guessedLetters} />
      <InputSection
        onGuess={handleGuess}
        wordLength={currentWord.word.length}
      />
      <RestartButton onRestart={handleRestart} />
    </Box>
  );
};

export default GameBoard;

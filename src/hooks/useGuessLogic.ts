import { useState } from "react";
import type { GuessResult } from "../types/guess";

export const useGuessLogic = (word: string, maxAttempts: number) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [revealedLetters, setRevealedLetters] = useState<string[]>(
    Array(word.length).fill("_")
  );
  const [attempts, setAttempts] = useState<number>(0);

  const submitGuess = (guess: string): GuessResult | null => {
    if (guess.length !== word.length) {
      return null;
    }

    const newAttempts = attempts + 1;
    const isCorrect = guess.toUpperCase() === word.toUpperCase();

    if (isCorrect) {
      setRevealedLetters(word.split(""));
    } else {
      setRevealedLetters((prev) =>
        word
          .split("")
          .map((char, index) =>
            guess
              .split("")
              .some(
                (guessedChar) => guessedChar.toUpperCase() === char.toUpperCase()
              )
              ? word[index].toUpperCase()
              : prev[index]
          )
      );
    }

    setAttempts(newAttempts);
    setGuessedLetters((prev) => [
      ...new Set([...prev, ...guess.toUpperCase().split("")]),
    ]);
    setInputValue("");

    return {
      correct: isCorrect,
      attempts: newAttempts,
      attemptsExhausted: !isCorrect && newAttempts >= maxAttempts,
    };
  };

  const addLetterToInput = (letter: string) => {
    setInputValue((prev) => prev + letter);
  };

  const updateInput = (value: string) => {
    setInputValue(value);
  };

  const resetGuessState = (newWordLength: number) => {
    setGuessedLetters([]);
    setInputValue("");
    setRevealedLetters(Array(newWordLength).fill("_"));
    setAttempts(0);
  };

  return {
    inputValue,
    guessedLetters,
    revealedLetters,
    attempts,
    submitGuess,
    addLetterToInput,
    updateInput,
    resetGuessState,
  };
};

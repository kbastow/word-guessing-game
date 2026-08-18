import { useState } from "react";
import { wordList } from "../data/wordList";
import type { WordEntry } from "../types/word";

const pickRandomWord = (): WordEntry => {
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  return { word: randomWord.word, hints: randomWord.hints };
};

export const useWordGame = () => {
  const [currentWord, setCurrentWord] = useState<WordEntry>(pickRandomWord);

  const startNewWord = (): WordEntry => {
    const newWord = pickRandomWord();
    setCurrentWord(newWord);
    return newWord;
  };

  return { currentWord, startNewWord };
};

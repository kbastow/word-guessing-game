# Word Guessing Game

This is a small frontend game I built with React + TypeScript where the player guesses a hidden word using progressive hints and a letter bank.

## Tech stack

- **React 19** for UI composition
- **TypeScript** for typed component/state logic
- **Vite** for local dev server and production builds
- **Material UI (MUI)** for basic UI components
- **ESLint** for linting
- **gh-pages** for deployment to GitHub Pages

## Codebase structure

```text
src/
  components/
    Controls/      # Buttons for submit, hint, restart actions
    Display/       # Word, score, hint, and letter-bank presentation
    GameBoard/     # Main game container and stateful orchestration
    Input/         # Guess input and submit behavior
  data/
    wordList.ts    # Word + hints data source
  styles/
    theme.ts       # Material UI theme configuration
  hooks/
    useWordGame.ts     # Picks and tracks the current word
    useGuessLogic.ts   # Guess submission and letter-reveal state
    useScore.ts        # Round and total score calculation
    useHintManager.ts  # Hint reveal state and hint dialog
    useGameResult.ts   # Win/loss state and result dialog
  types/
    word.ts        # WordEntry type
    guess.ts       # GuessResult type
  App.tsx          # App shell and theme provider
  main.tsx         # React entry point
```

## How the game logic is organized

`GameBoard.tsx` handles orchestration and rendering; each hook owns its own slice of state and logic.

- `useWordGame` — picks a random word from `wordList` and exposes a function to start a new one
- `useGuessLogic` — tracks input value, guessed letters, and revealed letters; validates guesses against the target word and tracks attempts
- `useScore` — tracks round and total score, applying the hint-penalty and win-scoring rules
- `useHintManager` — tracks how many hints are revealed and controls the hint dialog
- `useGameResult` — tracks win/loss state and controls the result dialog

`GameBoard` wires these hooks together, decides when to call each one in response to a guess or hint request, and resets them all on restart or next-word.

### Scoring model

- Start each round at **100** points
- Subtract **20** for each incorrect attempt before the winning guess
- Subtract **10** for each extra hint requested after the first visible hint
- Winning round score formula in code:
  `100 - ((attempts - 1) * 20) - ((revealedHints - 1) * 10)`
- Add round score to cumulative total on win

### Round progression

1. Player enters a guess (same length as target word)
2. If correct, reveal word and award round score
3. If incorrect, reveal matching letters by character presence and increment attempt count
4. Lose state is reached at 5 attempts
5. Player can continue to next word or restart entire game

## UI composition

`GameBoard` renders and coordinates these child components:

- `Scoreboard` — cumulative score display
- `WordDisplay` — current revealed letters/underscores
- `HintDisplay` + `HintButton` — currently revealed hint and hint progress
- `LetterBank` — clickable A–Z chips, disabled when guessed
- `InputSection` + `SubmitButton` — typed guess input and submit handling
- `RestartButton` — full reset of score + round state

## Data model

- `src/data/wordList.ts` exports an array of entries:
  - `word: string`
  - `hints: string[]`

## What I'd do differently if I built this again

- Integrate an LLM-backed content pipeline to generate and validate wordList entries (word + progressive hints) so game content can scale with less manual authoring.

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
  hooks/           # Placeholder directory (currently empty; future custom hooks)
  types/           # Placeholder directory (currently empty; future shared types)
  App.tsx          # App shell and theme provider
  main.tsx         # React entry point
```

## How the game logic is organized

Most logic currently lives in:

- `src/components/GameBoard/GameBoard.tsx`

### Responsibilities in `GameBoard`

- Picks a random word from `wordList`
- Tracks round state (`inputValue`, `guessedLetters`, `revealedLetters`, attempts, hints)
- Handles validation of word-length guesses
- Applies scoring rules
- Moves between game states (playing, won, lost)
- Handles full restart vs next-word flow

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

- Build in TypeScript
- Develop using an MUI theme to enagance UI styling
- `src/hooks` and `src/types` are present but empty. The game works as-is, to grow this app, a good next step is to extract scoring/guess/hint state from `GameBoard` into custom hooks and shared types.
- Integrate an LLM-backed content pipeline to generate and validate wordList entries (word + progressive hints) so game content can scale with less manual authoring.

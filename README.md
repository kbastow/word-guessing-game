# Word Guessing Game

This is a small frontend game I built with React + TypeScript where the player guesses a hidden word using progressive hints and a letter bank.

## Tech stack

- **React 19** for UI composition
- **TypeScript** for typed component/state logic
- **Vite** for local dev server and production builds
- **Material UI (MUI)** for UI components and theming
- **ESLint** for linting
- **gh-pages** for deployment to GitHub Pages

## How to run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL (typically `http://localhost:5173`).

## Build, lint, and preview

```bash
npm run lint
npm run build
npm run preview
```

## Deployment

This app is configured for GitHub Pages at:

- `https://kbastow.github.io/word-guessing-game/`

Relevant config:

- `package.json` scripts: `predeploy`, `deploy`
- `vite.config.ts` sets `base: "/word-guessing-game/"`

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
  hooks/           # Placeholder hooks (currently unused/empty)
  types/           # Placeholder types (currently unused/empty)
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
- Subtract **20** per incorrect guess attempt (implicitly through final round score calculation)
- Subtract **10** when requesting a hint
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

This is the only game content source right now. Expanding gameplay mostly means expanding this list or moving it to an API/back-end source.

## Notes for future refactoring

You’ll notice `src/hooks` and `src/types` are present but empty. The game works as-is, but if we grow the app, a good next step is extracting scoring/guess/hint state from `GameBoard` into custom hooks and shared types.

import { createTheme, Theme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#213547",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // MUI's default disabled opacity (0.38) drops outlined success/error
          // Chip text well below WCAG AA (measured ~1.7:1 on this theme's
          // background). Removing it restores full-strength palette colors
          // (~4.5-4.7:1) since these chips convey guessed-letter state, not
          // an unavailable action.
          "&.Mui-disabled": {
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;

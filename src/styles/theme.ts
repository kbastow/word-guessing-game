import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/Chip" {
  interface ChipPropsSizeOverrides {
    letter: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#213547",
    },
    secondary: {
      main: "#4e7da7",
    },
    success: {
      main: "#0F6E56",
      light: "#9FE1CB",
      dark: "#04342C",
    },
    error: {
      main: "#912602",
      light: "#F5C4B3",
      dark: "#4A1B0C",
    },
    background: {
      default: "#fefefe",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#213547",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
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
          "&.Mui-disabled": {
            opacity: 1,
          },
        },
      },
      variants: [
        {
          props: { size: "letter" },
          style: {
            width: 40,
            height: 40,
            borderRadius: "50%",
          },
        },
      ],
    },
  },
});

export default theme;

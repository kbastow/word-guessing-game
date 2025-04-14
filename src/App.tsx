import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import theme from "./styles/theme";
import "./App.css";
import { Container } from "@mui/material";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md" className="flex-center">
      <Typography variant="h1" component="h1">
        Guess the Word
      </Typography>
    </Container>
  </ThemeProvider>
);

export default App;

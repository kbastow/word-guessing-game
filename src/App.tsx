import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";
import "./App.css";
import { Container } from "@mui/material";
import GameBoard from "./components/GameBoard/GameBoard";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">
      <GameBoard />
    </Container>
  </ThemeProvider>
);
export default App;

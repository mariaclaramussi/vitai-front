import React from "react";
import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { Sidebar } from "./components";
import Header from "./components/header/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          <Box component="nav" sx={{ width: "214px", flexShrink: { sm: 0 } }}>
            <Sidebar />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: `calc(100vh - 80px)`,
              width: `calc(100% - 214px)`,
              background: theme.palette.background.default,
              padding: "100px 24px 0",
            }}
          >
            <Routes>
              <Route path="/pedidos" element={<Home />} />
              <Route path="/resultados" element={<About />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;

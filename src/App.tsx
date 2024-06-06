import React from "react";
import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { Sidebar } from "./components";
import Header from "./components/header/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { theme } from "./theme";
import NewCategoriaExame from "./pages/NewCategoriaExame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              minHeight: "100vh",
              width: `calc(100% - 214px)`,
              background: theme.palette.background.default,
              padding: "0 24px"
            }}
          >
            <Routes>
              <Route path="/pedidos" element={<Home />} />
              <Route path="/resultados" element={<Home />} />
              <Route path="/categoria-de-exame/cadastro" element={<NewCategoriaExame />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

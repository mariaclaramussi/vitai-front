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
import { NewExameTipo } from "./pages/ExameTipo/NewExameTipo";
import Pedidos from "./pages/Pedidos/Pedidos";
import NewPedido from "./pages/Pedidos/NewPedido";

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
                padding: "0 24px 40px",
              }}
            >
              <Routes>
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/pedidos/novo" element={<NewPedido />} />
                <Route
                  path="/categoria-de-exame/cadastro"
                  element={<NewCategoriaExame />}
                />
                <Route path="/exame/cadastro" element={<NewExameTipo />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

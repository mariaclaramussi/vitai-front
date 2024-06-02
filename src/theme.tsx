import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: { fontFamily: ["Poppins", "sans-serif"].join(",") },
    palette: {
      primary: { main: "#3AAA99" },
      error: { main: "rgb(191, 35, 35, 0.3)" },
      warning: { main: "rgb(223, 216, 65, 0.3)" },
      success: { main: "rgb(158, 213, 216, 0.3)" },
      background: { default: "#F5F5F5", paper: "#fff" },
    },
  });   
  
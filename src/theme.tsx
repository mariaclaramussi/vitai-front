import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1,
    },
  },
  palette: {
    primary: { main: "#3AAA99" },
    secondary: { main: "#EFEEEE" },
    error: { main: "rgb(191, 35, 35, 0.3)" },
    warning: { main: "rgb(223, 216, 65, 0.3)" },
    success: { main: "rgb(158, 213, 216, 0.3)" },
    background: { default: "#F5F5F5", paper: "#fff" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "32px 24px"
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: '10px 32px',
          fontSize: "16px",
          lineHeight: '24px',
          fontWeight: '700',
          color: "#EFEEEE",
          textTransform: 'inherit'
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: "100%",
          padding: '12px 0',
          maxHeight: '48px',
          borderRadius: "8px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: 0
        },
      },
    },
    MuiInputLabel: { 
      styleOverrides: {
        root: {
          marginBottom: "8px",
          lineHeight: 1
        },
      },
    }
  }
});

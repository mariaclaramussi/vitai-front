import { createTheme } from "@mui/material";

const darkText = "#3D3D3D";

export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: 1,
    },
    h3: {
      fontSize: "24px",
      lineHeight: 1,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: "600",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: "600",
    },
    allVariants: {
      color: darkText,
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  },
  palette: {
    primary: { main: "#3AAA99" },
    secondary: { main: "#EFEEEE" },
    error: { main: "rgb(191, 35, 35, 0.8)" },
    warning: { main: "rgb(223, 216, 65, 0.8)" },
    success: { main: "rgb(158, 213, 216, 0.8)" },
    background: { default: "#F5F5F5", paper: "#fff" },
    text: { primary: darkText },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "32px 24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "700",
          textTransform: "inherit",
          padding: "8px 28px",
        },
        sizeSmall: {
          fontSize: "14px",
          padding: "6px 16px",
        },
        contained: {
          color: "#efeeee",
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
          padding: "12px 0",
          maxHeight: "48px",
          borderRadius: "8px",
          "&.Mui-disabled": {
            backgroundColor: "#F5F5F5",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginBottom: "8px",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "inherit",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 16px",
        },
      },
    },
  },
});

import { AppBar, AppBarProps, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => {
  return {
    "&.MuiAppBar-root": {
      zIndex: 99999,
      height: "60px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      flex: 1,
      padding: "16px 24px",
    },
  };
});

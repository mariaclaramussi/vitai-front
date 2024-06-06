import { AppBar, AppBarProps, IconButton, IconButtonProps, styled } from "@mui/material";

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

export const IconContainer = styled(IconButton)<IconButtonProps>(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,  
  };
});
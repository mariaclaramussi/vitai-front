import styled from "@emotion/styled";
import {
  Drawer,
  DrawerProps,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  ListItemTextProps,
} from "@mui/material";

export const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme }) => {
  return {
    "& .MuiDrawer-paper": {
      backgroundColor: "#fff",
      width: "100%",
      maxWidth: "214px",
      padding: "96px 0 0",
      border: "none",
    },
  };
});

export const StyledList = styled("ul")(() => {
    return {
        listStyle: "none",
        padding:  "0 12px",
        margin: 0,
    };
});

export const StyledListItemMainButton = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => {
    return {
      "&.MuiListItemButton-root": {
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        marginBottom: '8px',
        "&:hover": {
          backgroundColor: "rgba(58, 170, 153, 0.2)",
        },
        "&[aria-expanded='true']": {
            backgroundColor: "rgba(58, 170, 153, 0.2)",
        }
      },
    };
  }
);

export const StyledListItemCollapsedButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => {
    return {
        "&.MuiListItemButton-root": {
            gap: "0.5rem",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
        },
    };

});

export const StyledListItemText = styled(ListItemText)<ListItemTextProps>(() => {
    return {
        "&.MuiListItemText-root .MuiListItemText-primary": {
            fontSize: "14px",
            fontWeight: 600,
        },
    };
});

export const StyledListItemTextCollapse = styled(ListItemText)<ListItemTextProps>(() => {
    return {
        "&.MuiListItemText-root .MuiListItemText-primary": {
            fontSize: "14px",
            paddingLeft: "16px"
        },
    };
});
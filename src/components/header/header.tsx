import { PersonOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "../../images/vitai_logo.svg";
import { StyledAppBar } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <Box sx={{ flexGrow: 1, maxWidth: '90px' }}>
        <Logo />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <IconButton sx={{ p: 0 }}>
          <PersonOutlined />
        </IconButton>
      </Box>
    </StyledAppBar>
  );
};

export default Header;

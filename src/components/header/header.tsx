import { PersonOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "../../images/vitai_logo.svg";
import { IconContainer, StyledAppBar } from "./styles";

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
        <IconContainer>
          <PersonOutlined fontSize="small" />
        </IconContainer>
      </Box>
    </StyledAppBar>
  );
};

export default Header;

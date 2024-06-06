import { Box, Button, Collapse, List, ListItemIcon } from "@mui/material";
import React, { FC, useState } from "react";
import {
  ExpandLess,
  ExpandMore,
  VaccinesOutlined,
  BiotechOutlined,
} from "@mui/icons-material";
import {
  StyledDrawer,
  StyledListItemMainButton,
  StyledListItemText,
  StyledListItemTextCollapse,
  StyledListItemCollapsedButton,
  StyledList,
} from "./styles";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  // adicione as propriedades necessárias aqui
}

const Sidebar: FC<SidebarProps> = () => {
  const [openExam, setOpenExam] = useState(true);
  const [openLab, setOpenLab] = useState(false);

  const [showRegister, setToggleRegister] = useState(false);

  let navigate = useNavigate();

  const itemsList = [
    {
      text: "Exames",
      icon: <VaccinesOutlined />,
      boolean: openExam,
      collapsedClick: () => setOpenExam(!openExam),
      children: [
        {
          text: "Pedidos",
          onClick: () => navigate("/pedidos"),
        },
      ],
    },
    {
      text: "Laboratório",
      icon: <BiotechOutlined />,
      boolean: openLab,
      collapsedClick: () => setOpenLab(!openLab),
      children: [
        {
          text: "Resultados",
          onClick: () => navigate("/resultados"),
        },
      ],
    },
  ];

  const registerItemsList = [
    {
      text: "Categoria de exame",
      onClick: () => navigate("/categoria-de-exame/cadastro"),
    },
  ];

  const drawer = (
    <StyledList>
      {itemsList.map((item, index) => {
        const { text, icon, collapsedClick, boolean, children } = item;
        return (
          <Box mb={2} key={index}>
            <StyledListItemMainButton onClick={collapsedClick}>
              {icon && (
                <ListItemIcon sx={{ minWidth: "inherit" }}>{icon}</ListItemIcon>
              )}

              <StyledListItemText primary={text} />
              {boolean ? <ExpandLess /> : <ExpandMore />}
            </StyledListItemMainButton>
            <Collapse in={boolean} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {children.map((child, index) => {
                  const { text, onClick } = child;
                  return (
                    <StyledListItemCollapsedButton
                      key={index}
                      onClick={onClick}
                    >
                      <StyledListItemTextCollapse primary={text} />
                    </StyledListItemCollapsedButton>
                  );
                })}
              </List>
            </Collapse>
          </Box>
        );
      })}
    </StyledList>
  );

  const registerDrawer = (
    <StyledList>
      {registerItemsList.map((item, index) => {
        const { text, onClick } = item;
        return (
          <Box mb={2} key={index}>
            <StyledListItemMainButton onClick={onClick}>
              <StyledListItemText primary={text} />
            </StyledListItemMainButton>
          </Box>
        );
      })}
    </StyledList>
  );

  return (
    <StyledDrawer variant="permanent" open>
      <Box sx={{ height: "90%", overflow: "auto" }}>
        {showRegister ? registerDrawer : drawer}
      </Box>

      <Box display="flex" justifyContent="center" padding="0 12px">
        <Button
          variant="contained"
          onClick={() => setToggleRegister(!showRegister)}
          fullWidth
          size="small"
        >
          {showRegister ? "Voltar" : "Cadastrar"}
        </Button>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;

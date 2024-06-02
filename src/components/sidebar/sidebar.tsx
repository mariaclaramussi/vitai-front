import { Box, Collapse, List, ListItemIcon } from "@mui/material";
import React from "react";
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

const Sidebar: React.FC<SidebarProps> = () => {
  const [openExam, setOpenExam] = React.useState(true);
  const [openLab, setOpenLab] = React.useState(false);

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
        {
          text: "Cadastrar categoria",
          onClick: () => navigate("/categoria-de-exame/cadastro"),
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
              {openExam ? <ExpandLess /> : <ExpandMore />}
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

  return (
    <StyledDrawer variant="permanent" open>
      {drawer}
    </StyledDrawer>
  );
};

export default Sidebar;

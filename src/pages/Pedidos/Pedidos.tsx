import React, { useState } from "react";
import { Box, Button, Card, Grid, Tab, Tabs, Typography } from "@mui/material";
import { EmptyState } from "../../components/emptyState/emptyState";
import { ReactComponent as EmptyDataIllustration } from "../../images/no_data_pedidos.svg";
import { InputText } from "../../components/form/InputText";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Pedidos = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { control } = useForm<{
    pesquisa: string;
  }>({
    defaultValues: { pesquisa: "" },
  });

  return (
    <>
      <Box mt={12} mb={3}>
        <Grid container alignItems="center">
          <Grid flex={1}>
            <Typography variant="h1">Pedidos de exame</Typography>
          </Grid>
          <Grid>
            <Link to="/pedidos/novo">
              <Button variant="contained">Novo pedido</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Card
        style={{ maxWidth: "60%", marginBottom: "24px", padding: "16px 24px" }}
      >
        <form style={{ flex: 1 }}>
          <Grid container flex={1} gap={1}>
            <Grid item flex={1}>
              <InputText
                name="pesquisa"
                control={control}
                placeholder="Digite o nome do paciente"
              />
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button>Pesquisar</Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      <Card sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Pedidos registrados" {...a11yProps(0)} />
            <Tab label="Exames do pedido" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <EmptyState
          title="Nenhum resultado encontrado"
          description="Tente realizar uma busca para ver os resultados"
        >
          <EmptyDataIllustration />
        </EmptyState>
      </Card>
    </>
  );
};

export default Pedidos;

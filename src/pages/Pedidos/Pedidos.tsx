import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { EmptyState } from "../../components/emptyState/emptyState";
import { ReactComponent as EmptyDataIllustration } from "../../images/no_data_pedidos.svg";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { usePedidosBySearch } from "../../hooks/usePedidosBySearch";
import dayjs from "dayjs";
import { Paciente } from "../../types/Pedido";
import { useAllPacientes } from "../../hooks/usePaciente";
import { useSinglePedido } from "../../hooks/useSinglePedido";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Pedidos = () => {
  const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [pedidoId, setPedidoId] = useState<string | null>(null);

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const { data: allPacientes } = useAllPacientes();
  const { data: allPedidos, isFetched } = usePedidosBySearch(paciente?.id);

  const { data: singlePedido } = useSinglePedido(String(pedidoId));
  console.log(singlePedido);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const loadPedidoInfo = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setTabValue(1);
    setPedidoId(id);
  };

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
              <Autocomplete
                freeSolo
                open={autocompleteOpen}
                options={allPacientes || []}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : `${option.numeroPulseira} - ${option.nome}`
                }
                onChange={(_, value) => {
                  value && setPaciente(value as Paciente);
                }}
                onInputChange={(_, value) => {
                  if (value.length === 0) {
                    if (autocompleteOpen) setAutocompleteOpen(false);
                  } else {
                    if (!autocompleteOpen) setAutocompleteOpen(true);
                  }
                }}
                onClose={() => setAutocompleteOpen(false)}
                clearIcon={
                  <IconButton
                    onClick={() => {
                      setPaciente(null);
                    }}
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Digite o nome do paciente ou número da pulseira"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </Card>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingTop: "16px",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Pedidos registrados" {...a11yProps(0)} />
            <Tab label="Exames do pedido" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          {!isFetched || allPedidos?.length === 0 ? (
            <EmptyState
              title="Nenhum resultado encontrado"
              description="Tente realizar uma busca para ver os resultados"
            >
              <EmptyDataIllustration />
            </EmptyState>
          ) : (
            <Table>
              <TableHead>
                <TableCell>Número do pedido</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Tipo de exame</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell colSpan={2}>Status</TableCell>
              </TableHead>
              <TableBody>
                {allPedidos?.map((pedido, index) => (
                  <TableRow key={index}>
                    <TableCell>{pedido.id}</TableCell>
                    <TableCell>
                      {dayjs(pedido.dataPedido).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{pedido.tipoPedido}</TableCell>
                    <TableCell>{pedido.medico.nome}</TableCell>
                    <TableCell>{pedido.status}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={(e) => loadPedidoInfo(e, pedido.id)}
                      >
                        Carregar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          Exames do pedido
        </CustomTabPanel>
      </Card>
    </>
  );
};

export default Pedidos;

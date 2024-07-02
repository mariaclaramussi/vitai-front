import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputLabel,
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
import { Medico, Paciente, Pedido } from "../../types/Pedido";
import { useAllPacientes } from "../../hooks/usePaciente";
import { useSinglePedido } from "../../hooks/useSinglePedido";
import { useForm } from "react-hook-form";
import { useExamesTipo } from "../../hooks/useExamesTipo";

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
      style={{ display: "flex", flexDirection: "column" }}
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

type FormFieldsType = {
  numeroPedido: string;
  dataPedido: string;
  status: Pedido["status"];
  tipoPedido: Pedido["tipoPedido"];
  nomeMedico: Medico["nome"];
  crmMedico: Medico["crm"];
};

const Pedidos = () => {
  const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [pedidoId, setPedidoId] = useState<string | null>(null);

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const [exameTipoId, setExameTipoId] = useState<number | undefined>(undefined);

  const { register, setValue } = useForm<FormFieldsType>();

  const { data: examesData } = useExamesTipo();

  const { data: allPacientes } = useAllPacientes();

  const {
    data: allPedidos,
    isFetched,
    refetch: refetchPedidos,
  } = usePedidosBySearch(paciente?.id);

  const { data: singlePedido, refetch: refetchSinglePedido } = useSinglePedido(
    String(pedidoId)
  );

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

  const addItemToPedido = async () => {
    fetch("/pedidos-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codExameTipo: exameTipoId,
        codPedido: pedidoId,
        status: "Pendente",
      }),
    })
      .then((response) => response.json())
      .then(() => {
        refetchSinglePedido();
      });
  };

  useEffect(() => {
    if (singlePedido) {
      setValue("numeroPedido", singlePedido.id);
      setValue(
        "dataPedido",
        dayjs(singlePedido.dataPedido).format("DD/MM/YYYY")
      );
      setValue("status", singlePedido.status);
      setValue("tipoPedido", singlePedido.tipoPedido);
      setValue("nomeMedico", singlePedido.medico.nome);
      setValue("crmMedico", singlePedido.medico.crm);
    }
  }, [singlePedido]);

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
                      refetchPedidos();
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
          paddingTop: "16px",
        }}
      >
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "24px" }}
        >
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
          <Grid
            container
            xs={12}
            gap={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <Autocomplete
              size="small"
              style={{ width: "300px" }}
              freeSolo
              options={examesData || []}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.nome
              }
              clearIcon={
                <IconButton
                  onClick={() => {
                    setExameTipoId(undefined);
                  }}
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  <ClearIcon />
                </IconButton>
              }
              onChange={(_, value) => {
                value &&
                  setExameTipoId((value as { id: number; nome: string }).id);
              }}
              renderInput={(params) => {
                return <TextField {...params} placeholder="Pesquisar" />;
              }}
            />
            <Button size="small" variant="contained" onClick={addItemToPedido}>
              Adicionar exame
            </Button>
          </Grid>
          <Grid container spacing={4}>
            <Grid container item xs={6} gap={2}>
              <Grid item xs={5}>
                <InputLabel>Número do pedido</InputLabel>
                <TextField
                  {...register("numeroPedido")}
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel>Status</InputLabel>
                <TextField
                  {...register("status")}
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel>Data do pedido</InputLabel>
                <TextField
                  {...register("dataPedido")}
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel>Tipo de exame</InputLabel>
                <TextField
                  {...register("tipoPedido")}
                  placeholder="Tipo de exame"
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel>Médico</InputLabel>
                <TextField
                  {...register("nomeMedico")}
                  placeholder="Nome do médico"
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel>CRM</InputLabel>
                <TextField
                  {...register("crmMedico")}
                  placeholder="CRM"
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número do exame</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {singlePedido?.pedidosItensList?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.codExameTipo.nome}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Card>
    </>
  );
};

export default Pedidos;

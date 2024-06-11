import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  InputLabel,
  Button,
  MenuItem,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { InputText } from "../components/form/InputText";
import { ExameTipo, Material, Metodo } from "../types/ExameTipo";
import { useQuery } from "@tanstack/react-query";
import { InputSelect } from "../components/form/InputSelect";
import { InputSelectRadio } from "../components/form/InputSelectRadio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { CategoriaExame } from "../types/CategoriaExame";
import { FormDialog } from "../components/form/FormDialog";

const StyledTableGroupHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const StyledTableItemHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const defaultValues = {
  nome: "",
  descricao: "",
  prazoExecucao: 0,
  codCategoria: 0,
  mnemonico: "",
  intervaloPedidos: 0,
  exigeLaudo: false,
  necessitaPreparo: false,
  codTipoMaterial: 0,
  codTipoMetodo: 0,
};

export function NewExameTipo() {
  const [dialogMaterialOpen, setDialogMaterialOpen] = useState<boolean>(false);
  const [dialogMetodoOpen, setDialogMetodoOpen] = useState<boolean>(false);

  const { control, handleSubmit, setValue } = useForm<ExameTipo>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: ExameTipo) => {
    fetch("/exames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const { data: materiaisData } = useQuery<Material[]>({
    queryKey: ["materiais"],
    queryFn: async () => {
      const response = await fetch("/materiais").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  const { data: metodosData } = useQuery<Metodo[]>({
    queryKey: ["metodos"],
    queryFn: async () => {
      const response = await fetch("/metodos").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  const { data: categoriasData } = useQuery<CategoriaExame[]>({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await fetch("/categorias-de-exame").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  const handleMaterialDialog = (state: boolean) => {
    setDialogMaterialOpen(state);
  };

  const handleMetodoDialog = (state: boolean) => {
    setDialogMetodoOpen(state);
  };

  useEffect(() => {
    if (materiaisData) {
      setValue("codTipoMaterial", materiaisData[0].id);
    }
    if (metodosData) {
      setValue("codTipoMetodo", metodosData[0].id);
    }
    if (categoriasData) {
      setValue("codCategoria", categoriasData[0].id);
    }
  });

  return (
    <>
      <Box mt={12} mb={4}>
        <Typography variant="h1">Cadastro de exame</Typography>
      </Box>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Nome</InputLabel>
              <InputText name="nome" placeholder="Nome" control={control} />
            </Grid>

            <Grid item xs={8}>
              <InputLabel>Descrição</InputLabel>
              <InputText
                placeholder="Descrição"
                name="descricao"
                control={control}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Categoria</InputLabel>
              <InputSelect name="codCategoria" control={control}>
                {categoriasData?.map((categoria: CategoriaExame) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </InputSelect>
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Mnemônico</InputLabel>
              <InputText
                placeholder="Mnemônico"
                name="mnemonico"
                control={control}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Prazo de execução (min)</InputLabel>
              <InputText
                placeholder="Prazo de execução"
                name="prazoExecucao"
                control={control}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Intervalo de pedidos (min)</InputLabel>
              <InputText
                placeholder="Intervalo de pedidos"
                name="intervaloPedidos"
                control={control}
              />
            </Grid>

            <Grid item xs={3}>
              <InputLabel>Exige laudo</InputLabel>
              <InputSelectRadio
                placeholder="Exige laudo"
                name="exigeLaudo"
                control={control}
                options={[
                  { label: "Sim", value: true },
                  { label: "Não", value: false },
                ]}
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Necessita preparo</InputLabel>
              <InputSelectRadio
                placeholder="Necessita preparo"
                name="necessitaPreparo"
                control={control}
                options={[
                  { label: "Sim", value: true },
                  { label: "Não", value: false },
                ]}
              />
            </Grid>
            <Grid item xs={3}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <InputLabel sx={{ marginBottom: 0 }}>Material</InputLabel>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => handleMaterialDialog(true)}>
                    <AddCircleOutlineIcon fontSize="small" color="primary" />
                  </IconButton>
                </Grid>
              </Grid>
              <InputSelect name="codTipoMaterial" control={control}>
                {materiaisData?.map((material: Material) => (
                  <MenuItem key={material.id} value={material.id}>
                    {material.nome}
                  </MenuItem>
                ))}
              </InputSelect>
            </Grid>
            <Grid item xs={3}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <InputLabel sx={{ marginBottom: 0 }}>Método</InputLabel>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => handleMetodoDialog(true)}>
                    <AddCircleOutlineIcon fontSize="small" color="primary" />
                  </IconButton>
                </Grid>
              </Grid>
              <InputSelect name="codTipoMetodo" control={control}>
                {metodosData?.map((metodo: Metodo) => (
                  <MenuItem key={metodo.id} value={metodo.id}>
                    {metodo.nome}
                  </MenuItem>
                ))}
              </InputSelect>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" mt={3}>
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      <FormDialog
        title="Novo Material"
        open={dialogMaterialOpen}
        onClose={() => handleMaterialDialog(false)}
        onSubmit={() => console.log("submit")}
      >
        <Grid container gap={2}>
          <Grid item flex={1}>
            <InputLabel>Nome</InputLabel>
            <InputText
              placeholder="Material"
              name="material"
              control={control}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Quantidade</InputLabel>
            <InputText
              placeholder="Quantidade"
              name="qtdMaterial"
              control={control}
            />
          </Grid>
        </Grid>
      </FormDialog>

      <FormDialog
        title="Novo Método"
        open={dialogMetodoOpen}
        onClose={() => handleMetodoDialog(false)}
        onSubmit={() => console.log("submit")}
      >
        <InputLabel>Método</InputLabel>
        <InputText placeholder="Metodo" name="metodo" control={control} />
      </FormDialog>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mt={6}
        mb={4}
      >
        <Typography variant="h2">Itens do exame</Typography>
        <Button variant="outlined" size="small">
          Novo Grupo
        </Button>
      </Grid>

      <Card>
        <Table>
          <TableHead>
            <StyledTableGroupHead>
              <TableCell
                colSpan={4}
                sx={{ borderTopLeftRadius: "8px", overflow: "hidden" }}
              >
                <Typography variant="subtitle1" color="secondary">
                  Nome do grupo
                </Typography>
              </TableCell>
              <TableCell
                colSpan={1}
                sx={{ borderTopRightRadius: "8px", overflow: "hidden" }}
              >
                <Grid container justifyContent="flex-end" pr={3}>
                  <IconButton>
                    <AddCircleOutlineIcon color="secondary" fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <ModeEditIcon color="secondary" fontSize="small" />
                  </IconButton>
                </Grid>
              </TableCell>
            </StyledTableGroupHead>
            <StyledTableItemHead>
              <TableCell>
                <Typography variant="subtitle2">Item</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Unidade</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Mnemônico</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography variant="subtitle2">Valor de referência</Typography>
              </TableCell>
            </StyledTableItemHead>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Item 1</TableCell>
              <TableCell>mg/dL</TableCell>
              <TableCell>Item1</TableCell>
              <TableCell>0 - 100</TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "flex-end", mr: 3 }}
              >
                <IconButton>
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Item 2</TableCell>
              <TableCell>mg/g de creatinina</TableCell>
              <TableCell>UR5</TableCell>
              <TableCell>IBPM ate 5,0 mg/g de creatinina</TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "flex-end", mr: 3 }}
              >
                <IconButton>
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

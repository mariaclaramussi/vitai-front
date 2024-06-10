import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  InputLabel,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { InputText } from "../components/form/InputText";
import { ExameTipo, Material, Metodo } from "../types/ExameTipo";
import { useQuery } from "@tanstack/react-query";
import { InputSelect } from "../components/form/InputSelect";
import { InputSelectRadio } from "../components/form/InputSelectRadio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


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
  const { control, handleSubmit, setValue } = useForm<ExameTipo>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: ExameTipo) => {
    console.log(data);
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

  useEffect(() => {
    if (materiaisData) {
      setValue("codTipoMaterial", materiaisData[0].id);
    }
    if (metodosData) {
      setValue("codTipoMetodo", metodosData[0].id);
    }
  }, [materiaisData, metodosData]);

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

            <Grid item xs={12}>
              <InputLabel>Descrição</InputLabel>
              <InputText
                placeholder="Descrição"
                name="descricao"
                control={control}
              />
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
                  <InputLabel sx={{ marginBottom: 0 }}>Método</InputLabel>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="flex-end">
                  <IconButton>
                    <AddCircleOutlineIcon fontSize="small" color="primary"/>
                  </IconButton>
                </Grid>
              </Grid>
              <InputSelect
                name="codTipoMaterial"
                control={control}
                defaultValue={String(defaultValues.codTipoMaterial)}
              >
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
                  <IconButton>
                    <AddCircleOutlineIcon fontSize="small" color="primary"/>
                  </IconButton>
                </Grid>
              </Grid>
              <InputSelect
                name="codTipoMetodo"
                control={control}
                defaultValue={String(defaultValues.codTipoMetodo)}
              >
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
    </>
  );
}

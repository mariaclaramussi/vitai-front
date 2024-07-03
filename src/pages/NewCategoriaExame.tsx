import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  MenuItem,
  InputLabel,
  Grid,
  Button,
  Box,
  Autocomplete,
  IconButton,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CategoriaExame, Modalidade, Secao } from "../types/CategoriaExame";
import { useForm } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import { InputText } from "../components/form/InputText";
import { InputSelect } from "../components/form/InputSelect";
import { useCategorias } from "../hooks/useCategorias";
import { useSingleCategoria } from "../hooks/useSingleCategoria";

const defaultValues = {
  nome: "",
  descricao: "",
  tipoCategoria: "Patologia clínica" as CategoriaExame["tipoCategoria"],
  codSecao: 1,
  codModalidade: 1,
} as CategoriaExame;

export function NewCategoriaExame() {
  const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const { control, handleSubmit, setValue, reset, register } =
    useForm<CategoriaExame>({
      defaultValues: defaultValues,
    });

  const { data: secoesData } = useQuery<Secao[]>({
    queryKey: ["secoes"],
    queryFn: async () => {
      const response = await fetch("/secoes").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  const { data: modalidadesData } = useQuery<Modalidade[]>({
    queryKey: ["modalidades"],
    queryFn: async () => {
      const response = await fetch("/modalidades").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  const { data: categoriasData, refetch } = useCategorias();

  const { data: singleCategoria } = useSingleCategoria(categoriaId);

  const onSubmit = (data: CategoriaExame) => {
    fetch("/categorias-de-exame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setAlertMessage({
          show: true,
          message: "Novo grupo criado!",
        });
      })
      .then(() => {
        reset(defaultValues);
        refetch();
      });
  };

  useEffect(() => {
    if (secoesData) {
      setValue("codSecao", secoesData[0].id);
    }
    if (modalidadesData) {
      setValue("codModalidade", modalidadesData[0].id);
    }
  });

  useEffect(() => {
    if (categoriaId) {
      reset(singleCategoria);
    }
  }, [singleCategoria]);

  return (
    <>
      {alertMessage ? (
        <Snackbar
          open={alertMessage.show}
          autoHideDuration={6000}
          onClose={() => setAlertMessage({ show: false, message: "" })}
        >
          <Alert
            onClose={() => setAlertMessage({ show: false, message: "" })}
            severity="success"
            variant="filled"
          >
            {alertMessage.message}
          </Alert>
        </Snackbar>
      ) : null}

      <Box mt={12} mb={3}>
        <Grid container alignItems="center">
          <Grid flex={1}>
            <Typography variant="h1">Cadastro de categoria de exame</Typography>
          </Grid>
          <Grid sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              options={categoriasData || []}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.nome
              }
              clearIcon={
                <IconButton
                  onClick={() => {
                    setCategoriaId(undefined);
                    reset(defaultValues);
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
                if (typeof value === "object" && value !== null) {
                  setCategoriaId(value.id);
                }
              }}
              renderInput={(params) => {
                return <TextField {...params} placeholder="Pesquisar" />;
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Nome</InputLabel>
              <InputText
                {...register("nome")}
                placeholder="Nome"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Descrição</InputLabel>
              <InputText
                placeholder="Descrição"
                {...register("descricao")}
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Tipo de exame</InputLabel>
              <InputSelect
                {...register("tipoCategoria")}
                control={control}
                defaultValue={defaultValues.tipoCategoria}
              >
                <MenuItem value="Patologia clínica">Patologia clínica</MenuItem>
                <MenuItem value="Anatomia patológica">
                  Anatomia patológica
                </MenuItem>
                <MenuItem value="Exame de imagem">Exame de imagem</MenuItem>
              </InputSelect>
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Seção</InputLabel>
              <InputSelect {...register("codSecao")} control={control}>
                {secoesData?.map((secao: Secao) => (
                  <MenuItem key={secao.id} value={secao.id}>
                    {secao.nome}
                  </MenuItem>
                ))}
              </InputSelect>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Modalidade</InputLabel>
              <InputSelect {...register("codModalidade")} control={control}>
                {modalidadesData?.map((modalidade: Modalidade) => (
                  <MenuItem key={modalidade.id} value={modalidade.id}>
                    {modalidade.nome}
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

export default NewCategoriaExame;

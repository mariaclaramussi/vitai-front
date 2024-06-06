import {
  Card,
  Typography,
  MenuItem,
  InputLabel,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { CategoriaExame, Modalidade, Secao } from "../types/CategoriaExame";
import { useForm } from "react-hook-form";
import { InputText } from "../components/form/InputText";
import { InputSelect } from "../components/form/InputSelect";

type FormInputProps = {
  nome: string;
  descricao: string;
  tipoCategoria: CategoriaExame["tipoCategoria"];
  secao: string;
  modalidade: string;
};

const defaultValues = {
  nome: "",
  descricao: "",
  tipoCategoria: "Patologia clínica" as CategoriaExame["tipoCategoria"],
  secao: "",
  modalidade: "",
};

export function NewCategoriaExame() {
  const { control, handleSubmit, setValue } = useForm<FormInputProps>({
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

  const onSubmit = (data: FormInputProps) => {
    console.log(data)

    fetch("/categorias-de-exame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    if (secoesData) {
      setValue("secao", secoesData[0].nome);
    }
    if (modalidadesData) {
      setValue("modalidade", modalidadesData[0].nome);
    }
  });

  return (
    <>
      <Box mt={12} mb={4}>
        <Typography variant="h1">Cadastro de categoria de exame</Typography>
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

            <Grid item xs={6}>
              <InputLabel>Tipo de exame</InputLabel>
              <InputSelect
                name="tipoCategoria"
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
              <InputSelect
                name="secao"
                control={control}
                defaultValue={defaultValues.secao}
              >
                {secoesData?.map((secao: Secao) => (
                  <MenuItem key={secao.id} value={secao.nome}>
                    {secao.nome}
                  </MenuItem>
                ))}
              </InputSelect>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Modalidade</InputLabel>
              <InputSelect
                name="modalidade"
                control={control}
                defaultValue={defaultValues.modalidade}
              >
                {modalidadesData?.map((modalidade: Modalidade) => (
                  <MenuItem key={modalidade.id} value={modalidade.nome}>
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

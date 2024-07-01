import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  InputLabel,
  MenuItem,
  Button,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Medico, Paciente, Pedido } from "../../types/Pedido";
import { InputText } from "../../components/form/InputText";
import { InputSelect } from "../../components/form/InputSelect";
import { InputSelectRadio } from "../../components/form/InputSelectRadio";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useAllPacientes } from "../../hooks/usePaciente";
import dayjs from "dayjs";
import { useAllMedicos } from "../../hooks/useMedico";

const defaultValues = {
  dataPedido: new Date(),
  status: "Pendente" as Pedido["status"],
  tipoPedido: "Exame laboratorial" as Pedido["tipoPedido"],
  medico: {
    nome: "",
    crm: "",
    UF: "",
  },
  paciente: {
    nome: "",
    numeroPulseira: 0o0,
  },
};

type FormFieldsType = {
  dataPedido: Date;
  status: Pedido["status"];
  tipoPedido: Pedido["tipoPedido"];
  medico: Medico;
  paciente: Paciente;
};

const NewPedido = () => {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [medico, setMedico] = useState<Medico | null>(null);

  const { control, register, setValue, handleSubmit } = useForm<FormFieldsType>(
    {
      defaultValues: defaultValues,
    }
  );

  const { data: allPacientes } = useAllPacientes();
  const { data: allMedicos } = useAllMedicos();

  const onSubmit: SubmitHandler<FormFieldsType> = (data, event) => {
    const { paciente, medico, ...restData } = data;

    const dataFormatted = {
      ...restData,
      codPaciente: paciente.id,
      codMedico: medico.id,
      dataPedido: dayjs(data.dataPedido),
    };

    event?.preventDefault();
    fetch("/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dataFormatted }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(-1);
      });
  };

  useEffect(() => {
    if (allPacientes && allPacientes.length > 0) {
      setValue("paciente", allPacientes[0]);
    }
    if (allMedicos && allMedicos.length > 0) {
      setValue("medico", allMedicos[0]);
    }
  }, []);

  return (
    <>
      <Box mt={12} mb={3}>
        <Grid container alignItems="center">
          <IconButton sx={{ mr: 2 }} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h1">Novo pedido</Typography>
        </Grid>
      </Box>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Paciente</InputLabel>
              <Autocomplete
                options={allPacientes || []}
                getOptionLabel={(option) =>
                  `${option.numeroPulseira} - ${option.nome}`
                }
                onChange={(_, value) => {
                  value && setPaciente(value as Paciente);
                  setValue("paciente", value as Paciente);
                }}
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
                    placeholder="Digite o nome do paciente"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Data do pedido</InputLabel>
              <TextField
                {...register("dataPedido")}
                type="date"
                placeholder="Data do pedido"
                defaultValue={dayjs(new Date())}
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Status</InputLabel>
              <InputSelect {...register("tipoPedido")} control={control}>
                <MenuItem value={"Exame de imagem"}>Exame de imagem</MenuItem>
                <MenuItem value={"Exame laboratorial"}>
                  Exame laboratorial
                </MenuItem>
              </InputSelect>
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Médico do hospital</InputLabel>
              <InputSelectRadio
                name="medico.hospital"
                control={control}
                placeholder="Medico do hospital"
                options={[
                  { label: "Sim", value: true },
                  { label: "Não", value: false },
                ]}
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Medico</InputLabel>
              <Autocomplete
                options={allMedicos || []}
                getOptionLabel={(option) => `${option.crm} - ${option.nome}`}
                onChange={(_, value) => {
                  setValue("medico", value as Medico);
                  value && setMedico(value as Medico);
                }}
                clearIcon={
                  <IconButton
                    onClick={() => {
                      setMedico(null);
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
                  <TextField {...params} placeholder="Medico" />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel>CRM</InputLabel>
              <InputText
                {...register("medico.crm")}
                control={control}
                placeholder="CRM"
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel>UF</InputLabel>
              <InputText
                {...register("medico.UF")}
                control={control}
                placeholder="UF"
              />
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
};

export default NewPedido;

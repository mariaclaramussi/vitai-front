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
  Alert,
  Snackbar,
  Autocomplete,
  TextField,
  Tooltip,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "../../components/form/InputText";
import { ExameTipo, Material, Metodo } from "../../types/ExameTipo";
import { InputSelect } from "../../components/form/InputSelect";
import { InputSelectRadio } from "../../components/form/InputSelectRadio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { CategoriaExame } from "../../types/CategoriaExame";
import { FormDialog } from "../../components/form/FormDialog";
import { NewSubExameTipoTable } from "./components/SubExameTipoTable";
import { useMetodos } from "../../hooks/useMetodos";
import { useMateriais } from "../../hooks/useMateriais";
import { useCategorias } from "../../hooks/useCategorias";
import { useExamesTipo } from "../../hooks/useExamesTipo";
import { useSingleExameTipo } from "../../hooks/useSingleExameTipo";
import { SubExameTipo } from "../../types/SubExameTipo";

const defaultValues = {
  nome: "",
  prazoExecucao: 0,
  codCategoria: 0,
  mnemonico: "",
  intervaloPedidos: 0,
  exigeLaudo: false,
  necessitaPreparo: false,
  codTipoMaterial: 0,
  codTipoMetodo: 0,
} as ExameTipo;

export function NewExameTipo() {
  const [dialogMaterialOpen, setDialogMaterialOpen] = useState<boolean>(false);
  const [dialogMetodoOpen, setDialogMetodoOpen] = useState<boolean>(false);
  const [dialogSubExameOpen, setDialogSubExameOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const [searchedExame, setSearchedExame] = useState<ExameTipo>();

  const [exameTipoId, setExameTipoId] = useState<number | undefined>(undefined);

  const { control, handleSubmit, setValue, register, reset } =
    useForm<ExameTipo>({
      defaultValues: defaultValues,
    });

  const { control: materialFormControl, handleSubmit: handleSubmitMaterial } =
    useForm<Material>({
      defaultValues: { nome: "", qtdMaxima: 0 },
    });

  const { control: metodoFormControl, handleSubmit: handleSubmitMetodo } =
    useForm<Metodo>({
      defaultValues: { nome: "" },
    });

  const {
    control: subExameFormControl,
    handleSubmit: handleSubmitSubExame,
    reset: resetSubExame,
  } = useForm<SubExameTipo>({
    defaultValues: { nome: "", exameTipoItemsList: [] },
  });

  const { data: materiaisData, refetch: refetchMaterial } = useMateriais();

  const { data: metodosData, refetch: refetchMetodo } = useMetodos();

  const { data: categoriasData } = useCategorias();

  const { data: examesData } = useExamesTipo();

  const { data: singleExameData, refetch: refetchSingleExameTipo } =
    useSingleExameTipo(exameTipoId);

  const onSubmit: SubmitHandler<ExameTipo> = (data, event) => {
    event?.preventDefault();
    fetch("/exames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setExameTipoId(data?.id);
      })
      .then(() => {
        setAlertMessage({
          show: true,
          message: "Exame cadastrado com sucesso!",
        });
      });
  };

  const onSubmitMaterial: SubmitHandler<Material> = (
    data: Material,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();

    fetch("/materiais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setAlertMessage({
          show: true,
          message: "Novo material adicionado!",
        });
      })
      .then(() => {
        setDialogMaterialOpen(false);
        refetchMaterial();
      });
  };

  const onSubmitMetodo: SubmitHandler<Metodo> = (
    data: Metodo,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();

    fetch("/metodos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setAlertMessage({
          show: true,
          message: "Novo método adicionado!",
        });
      })
      .then(() => {
        setDialogMetodoOpen(false);
        refetchMetodo();
      });
  };

  const onSubmitSubExame: SubmitHandler<SubExameTipo> = (
    data: SubExameTipo,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();

    fetch("/sub-exames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, codExameTipo: exameTipoId }),
    })
      .then((response) => response.json())
      .then(() => {
        setAlertMessage({
          show: true,
          message: "Novo grupo criado!",
        });
      })
      .then(() => {
        setDialogSubExameOpen(false);
        refetchSingleExameTipo();
        resetSubExame();
      });
  };

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

  useEffect(() => {
    if (singleExameData) {
      setSearchedExame(singleExameData);
      reset(singleExameData);
    }
  }, [singleExameData]);

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
            <Typography variant="h1">Cadastro de exame</Typography>
          </Grid>
          <Grid sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              options={examesData || []}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.nome
              }
              clearIcon={
                <IconButton
                  onClick={() => {
                    setExameTipoId(undefined);
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
                value &&
                  setExameTipoId((value as { id: number; nome: string }).id);
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

            <Grid item xs={3}>
              <InputLabel>Categoria</InputLabel>
              <InputSelect {...register("codCategoria")} control={control}>
                {categoriasData?.map((categoria: CategoriaExame) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </InputSelect>
            </Grid>

            <Grid item xs={3}>
              <InputLabel>Mnemônico</InputLabel>
              <InputText
                {...register("mnemonico")}
                placeholder="Mnemônico"
                control={control}
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Prazo de execução (min)</InputLabel>
              <InputText
                {...register("prazoExecucao")}
                placeholder="Prazo de execução"
                control={control}
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Intervalo de pedidos (min)</InputLabel>
              <InputText
                {...register("intervaloPedidos")}
                placeholder="Intervalo de pedidos"
                control={control}
              />
            </Grid>

            <Grid item xs={3}>
              <InputLabel>Exige laudo</InputLabel>
              <InputSelectRadio
                {...register("exigeLaudo")}
                placeholder="Exige laudo"
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
                {...register("necessitaPreparo")}
                placeholder="Necessita preparo"
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
                  <Tooltip
                    title="Adicionar material"
                    placement="top-end"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -10],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <IconButton onClick={() => handleMaterialDialog(true)}>
                      <AddCircleOutlineIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <InputSelect {...register("codTipoMaterial")} control={control}>
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
                  <Tooltip
                    title="Adicionar método"
                    placement="top-end"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -10],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <IconButton onClick={() => handleMetodoDialog(true)}>
                      <AddCircleOutlineIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <InputSelect {...register("codTipoMetodo")} control={control}>
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
        onSubmit={handleSubmitMaterial(onSubmitMaterial)}
      >
        <Grid container gap={2}>
          <Grid item flex={1}>
            <InputLabel>Nome</InputLabel>
            <InputText
              placeholder="Material"
              name="nome"
              control={materialFormControl}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Quantidade</InputLabel>
            <InputText
              placeholder="Quantidade"
              name="qtdMaxima"
              control={materialFormControl}
            />
          </Grid>
        </Grid>
      </FormDialog>

      <FormDialog
        title="Novo Método"
        open={dialogMetodoOpen}
        onClose={() => handleMetodoDialog(false)}
        onSubmit={handleSubmitMetodo(onSubmitMetodo)}
      >
        <InputLabel>Método</InputLabel>
        <InputText
          placeholder="Metodo"
          name="nome"
          control={metodoFormControl}
        />
      </FormDialog>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <Typography variant="h2">Itens do exame</Typography>
        {exameTipoId && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => setDialogSubExameOpen(true)}
          >
            Novo Grupo
          </Button>
        )}
      </Grid>

      <FormDialog
        title="Novo Método"
        open={dialogSubExameOpen}
        onClose={() => setDialogSubExameOpen(false)}
        onSubmit={handleSubmitSubExame(onSubmitSubExame)}
      >
        <InputLabel>Nome</InputLabel>
        <InputText
          placeholder="Nome do grupo"
          name="nome"
          control={subExameFormControl}
        />
      </FormDialog>

      <NewSubExameTipoTable
        exameTipoId={exameTipoId}
        subExameData={searchedExame?.subExamesTipoList}
        uploadTableData={refetchSingleExameTipo}
      />
    </>
  );
}

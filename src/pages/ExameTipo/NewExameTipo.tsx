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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { InputText } from "../../components/form/InputText";
import { ExameTipo, Material, Metodo } from "../../types/ExameTipo";
import { InputSelect } from "../../components/form/InputSelect";
import { InputSelectRadio } from "../../components/form/InputSelectRadio";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CategoriaExame } from "../../types/CategoriaExame";
import { FormDialog } from "../../components/form/FormDialog";
import { NewSubExameTipoTable } from "./components/SubExameTipoTable";
import { useMetodos } from "../../hooks/useMetodos";
import { useMateriais } from "../../hooks/useMateriais";
import { useCategorias } from "../../hooks/useCategorias";
import { useExamesTipo } from "../../hooks/useExamesTipo";

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

// const useSubExameByExameTipo = (id?: number) => {
//   return useQuery<SubExameTipo[]>({
//     queryKey: ["subExames"],
//     queryFn: async () => {
//       const response = await fetch(`/exames/${id}/sub-exames`).then(
//         (response) => response.json()
//       );

//       if (response.error) {
//         throw new Error(response.error);
//       }

//       return response;
//     },
//     enabled: !!id && id > 0,
//   });
// };

export function NewExameTipo() {
  const [dialogMaterialOpen, setDialogMaterialOpen] = useState<boolean>(false);
  const [dialogMetodoOpen, setDialogMetodoOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const [searchedExame, setSearchedExame] = useState<ExameTipo>();

  const [exameTipoId, setExameTipoId] = useState<number | undefined>(undefined);

  const { control, handleSubmit, setValue } = useForm<ExameTipo>({
    defaultValues: defaultValues,
  });

  const { data: materiaisData } = useMateriais();

  const { data: metodosData } = useMetodos()

  const { data: categoriasData } = useCategorias();

  const { data: examesData } = useExamesTipo();


  const onSubmit = (data: ExameTipo) => {
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
    fetch(`/exames/${exameTipoId}`)
      .then((response) => response.json())
      .then((data: { exameTipo: ExameTipo }) => {
        setSearchedExame(data.exameTipo);
      });
  }, [exameTipoId]);

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

      <Box mt={12} mb={4}>
        <Grid container>
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
              onChange={(_, value) => {
                value &&
                  setExameTipoId((value as { id: number; nome: string }).id);
              }}
              renderInput={(params) => {
                return <TextField {...params} label="Pesquisa" />;
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
          Novo Grupo {/* = POST new sub exame tipo */}
        </Button>
      </Grid>

      <NewSubExameTipoTable subExameData={searchedExame?.subExamesTipoList} />
    </>
  );
}

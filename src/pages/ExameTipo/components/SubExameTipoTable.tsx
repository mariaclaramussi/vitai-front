import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  Table,
  TableHead,
  TableCell,
  IconButton,
  TableBody,
  TableRow,
  styled,
  InputLabel,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import { ExameTipoItem, SubExameTipo } from "../../../types/SubExameTipo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { EmptyState } from "../../../components/emptyState/emptyState";
import { ReactComponent as EmptyDataIllustration } from "../../../images/no_data.svg";
import { FormDialog } from "../../../components/form/FormDialog";
import { InputText } from "../../../components/form/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { useExameItemTipo } from "../../../hooks/useExameItemTipo";

const StyledTableGroupHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const StyledTableItemHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

type NewSubExameTipoProps = {
  subExameData?: SubExameTipo[];
  exameTipoId?: number;
  uploadTableData?: () => void;
};

export const NewSubExameTipoTable = (props: NewSubExameTipoProps) => {
  const { subExameData, exameTipoId, uploadTableData } = props;
  const [subExameGroupSelected, setSubExameGroupSelected] =
    useState<string>("");

  const [exameItemTipoId, setExameItemTipoId] = useState<string>("");

  const [alertMessage, setAlertMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const [dialogSubExameItemOpen, setDialogSubExameItemOpen] =
    useState<boolean>(false);

  const {
    control: exameItemFormControl,
    handleSubmit: handleSubmitExameItem,
    register,
    reset,
  } = useForm<ExameTipoItem>({
    defaultValues: {
      nome: "",
      mnemonico: "",
      unidade: "",
      valorReferencia: "",
      codSubExameTipo: "",
    },
  });

  const onSubmitMaterial: SubmitHandler<ExameTipoItem> = (
    data: ExameTipoItem,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();

    fetch("/exame-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        codExameTipo: exameTipoId,
        codSubExameTipo: subExameGroupSelected,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setAlertMessage({
          show: true,
          message: "Novo item adicionado!",
        });
      })
      .then(() => {
        setDialogSubExameItemOpen(false);
        uploadTableData && uploadTableData();
      });
  };

  const { data: exameItem } = useExameItemTipo(Number(exameItemTipoId));

  useEffect(() => {
    reset(exameItem);
  }, [exameItem]);

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

      <Card sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {!subExameData || subExameData.length === 0 ? (
          <EmptyState
            title="Não existem itens cadastrados"
            description="Pesquise por um exame e crie um novo grupo para inserir novos itens ao exame"
          >
            <EmptyDataIllustration />
          </EmptyState>
        ) : (
          subExameData?.map((subExame: SubExameTipo) => {
            return (
              <Table key={subExame.id}>
                <TableHead>
                  <StyledTableGroupHead>
                    <TableCell
                      colSpan={4}
                      sx={{ borderTopLeftRadius: "8px", overflow: "hidden" }}
                    >
                      <Typography variant="subtitle1" color="secondary">
                        {subExame.nome}
                      </Typography>
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      sx={{ borderTopRightRadius: "8px", overflow: "hidden" }}
                    >
                      <Grid container justifyContent="flex-end" pr={3}>
                        <Tooltip
                          title="Adicionar item ao grupo"
                          placement="top"
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
                          <IconButton
                            onClick={() => {
                              setDialogSubExameItemOpen(true);
                              setSubExameGroupSelected(subExame.id);
                            }}
                          >
                            <AddCircleOutlineIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </IconButton>
                        </Tooltip>
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
                      <Typography variant="subtitle2">
                        Valor de referência
                      </Typography>
                    </TableCell>
                  </StyledTableItemHead>
                </TableHead>
                <TableBody>
                  {subExame.exameTipoItemsList &&
                    subExame.exameTipoItemsList.map((item) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell>{item.unidade}</TableCell>
                          <TableCell>{item.mnemonico}</TableCell>
                          <TableCell>{item.valorReferencia}</TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mr: 3,
                            }}
                          >
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                setExameItemTipoId(item.id);
                                setSubExameGroupSelected(subExame.id);
                                setDialogSubExameItemOpen(true);
                              }}
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            );
          })
        )}
      </Card>

      <FormDialog
        title="Novo item"
        maxWidth="sm"
        open={dialogSubExameItemOpen}
        onClose={() => setDialogSubExameItemOpen(false)}
        onSubmit={handleSubmitExameItem(onSubmitMaterial)}
      >
        <Grid container gap={2}>
          <Grid item flex={1}>
            <InputLabel>Nome</InputLabel>
            <InputText
              {...register("nome")}
              placeholder="Nome"
              control={exameItemFormControl}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Mnemônico</InputLabel>
            <InputText
              {...register("mnemonico")}
              placeholder="Mnemônico"
              control={exameItemFormControl}
            />
          </Grid>
        </Grid>
        <Grid container gap={2} mt={2}>
          <Grid item flex={1}>
            <InputLabel>Unidade</InputLabel>
            <InputText
              {...register("unidade")}
              placeholder="Unidade"
              control={exameItemFormControl}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Valor de referência</InputLabel>
            <InputText
              {...register("valorReferencia")}
              placeholder="Valor de referência"
              control={exameItemFormControl}
            />
          </Grid>
        </Grid>
      </FormDialog>
    </>
  );
};

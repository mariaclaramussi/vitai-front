import React from "react";
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
} from "@mui/material";
import { SubExameTipo } from "../../../types/SubExameTipo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { EmptyState } from "../../../components/emptyState/emptyState";
import { ReactComponent as EmptyDataIllustration } from "../../../images/no_data.svg";

const StyledTableGroupHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const StyledTableItemHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

type NewSubExameTipoProps = {
  subExameData?: SubExameTipo[];
};

export const NewSubExameTipoTable = (props: NewSubExameTipoProps) => {
  const { subExameData } = props;

  console.log(subExameData)
  return (
    <Card sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {!subExameData || subExameData.length === 0 ? (
        <EmptyState title="Não existem itens cadastrados" description="Crie um Novo Grupo de itens para inserir novos itens ao exame">
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
                      <IconButton>
                        <AddCircleOutlineIcon
                          color="secondary"
                          fontSize="small"
                        />
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
                          <IconButton>
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
  );
};

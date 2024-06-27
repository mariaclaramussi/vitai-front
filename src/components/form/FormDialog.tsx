import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { theme } from "../../theme";

type FormDialogProps = {
  onClose: () => void;
  open: boolean;
  title: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  children: ReactNode;
  onSubmit?: () => void;
};

export const FormDialog = ({
  open,
  title,
  children,
  maxWidth = "xs",
  onClose,
  onSubmit,
}: FormDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: { borderRadius: "8px", paddingBottom: 2 },
        component: "form",
        onSubmit: onSubmit,
      }}
    >
      <DialogTitle
        sx={{
          background: theme.palette.primary.main,
          marginBottom: "32px",
          color: theme.palette.secondary.main,
          padding: 2,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: 2 }}>{children}</DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="text"
          color="error"
          onClick={onClose}
          sx={{ opacity: 0.7 }}
        >
          Cancelar
        </Button>
        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

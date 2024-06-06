import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

type InputTextProps = {
    name: string;
    control: any;
    placeholder?: string
};

export const InputText = ({ name, control, placeholder }: InputTextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
};

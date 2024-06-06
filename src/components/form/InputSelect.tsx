import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

type InputSelectProps = {
  name: string;
  control: any;
  label?: string;
  defaultValue?: string;
  children: React.ReactNode;
};

export const InputSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}: InputSelectProps) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select labelId={labelId} label={label} {...field}>
            {children}
          </Select>
        )}
      />
    </FormControl>
  );
};

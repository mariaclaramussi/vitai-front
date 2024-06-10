import {
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

type RadioOptions = {
  label: string;
  value: string | boolean | number;
};

type InputSelectProps = {
  name: string;
  control: any;
  placeholder?: string;
  label?: string;
  options: RadioOptions[];
};

export const InputSelectRadio: FC<InputSelectProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption, index) => (
      <FormControlLabel
        key={index}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup value={value} onChange={onChange} sx={{display: 'flex', flexDirection: 'row'}}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

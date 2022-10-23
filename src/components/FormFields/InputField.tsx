import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  type?: string;
  label?: string;
}

export function InputField({
  name,
  control,
  label,
  type = 'text',
  ...inputProps
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      type={type}
      margin="normal"
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      error={!!error}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}

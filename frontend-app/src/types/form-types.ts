import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormData = {
  name: string;
};

export type InputFieldProps = {
  type: string;
  placeholder: string;
  label: string;
  name: 'name';
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = 'name';

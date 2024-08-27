import { FieldError, UseFormRegister } from 'react-hook-form';

export type InputFieldProps = {
  type: string;
  placeholder: string;
  label: string;
  name: ValidFieldNames;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | 'name'
  | 'estimatedHours'
  | 'squadId'
  | 'initialDate'
  | 'endDate';

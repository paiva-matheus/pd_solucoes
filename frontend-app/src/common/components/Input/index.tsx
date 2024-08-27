import { InputFieldProps } from '@/types/form-types';
import styles from './styles.module.css';
import { ErrorIcon } from '../Error';

export const Input = ({
  type,
  placeholder,
  label,
  name,
  register,
  error,
  valueAsNumber,
}: InputFieldProps) => (
  <div className={styles.container}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={styles.input}
    />
    {error && (
      <div className={styles.errorMessage}>
        <ErrorIcon />
        <span>Error: {error.message}</span>
      </div>
    )}
  </div>
);

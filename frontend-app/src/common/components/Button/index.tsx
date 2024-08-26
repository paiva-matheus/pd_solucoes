import { ReactNode } from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.container}>
      {children}
    </button>
  );
};

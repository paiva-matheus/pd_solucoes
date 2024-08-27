import { ReactNode } from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
};

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <>
      {type === 'submit' ? (
        <button type={type} className={styles.container}>
          {children}
        </button>
      ) : (
        <button
          type={type || 'button'}
          onClick={onClick}
          className={styles.container}
        >
          {children}
        </button>
      )}
    </>
  );
};

import { ReactNode } from 'react';
import styles from './table.styles.module.css';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

type TableProps = {
  children: ReactNode;
};

export const Table = ({ children }: TableProps) => {
  return <table className={styles.table}>{children}</table>;
};

Table.Header = TableHeader;
Table.Body = TableBody;

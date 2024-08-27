import { Column } from '../TableBody';
import styles from './styles.module.css';

type TableProps = {
  columns: Column[];
  colSpan?: number;
};

export const TableHeader = ({ columns, colSpan }: TableProps) => {
  return (
    <thead className={styles.container}>
      <tr>
        {columns.map((column) => (
          <th key={column.key} className={styles.head} colSpan={colSpan}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

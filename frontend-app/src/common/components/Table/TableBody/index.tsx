import styles from './styles.module.css';
import Link from 'next/link';

export type Column = {
  key: string;
  title: string;
};

type TableBodyProps = {
  columns: Column[];
  data: Record<string, any>[];
  callToAction?: string;
};

export const TableBody = ({ columns, data, callToAction }: TableBodyProps) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className={styles.row}>
          {columns.map((column, index) => {
            const isLastIndex = index === columns.length - 1;
            return (
              <>
                <td key={`b${column.key}`} className={styles.cell}>
                  {row[column.key]}
                </td>
                <td>
                  {callToAction && isLastIndex ? (
                    <Link href={`/squads/${row['id']}`} className={styles.link}>
                      {callToAction}
                    </Link>
                  ) : null}
                </td>
              </>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

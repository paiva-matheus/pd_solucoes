import { ReactNode } from 'react';
import styles from './styles.module.css';

type SectionProps = {
  children: ReactNode;
  title: string;
};

export const Section = ({ children, title }: SectionProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

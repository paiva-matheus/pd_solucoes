import styles from './styles.module.css';

type InfoSectionProps = {
  title: string;
  info: string;
};

export const InfoSection = ({ title, info }: InfoSectionProps) => {
  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      <p>{info}</p>
    </section>
  );
};

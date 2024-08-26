import Image from 'next/image';
import styles from './styles.module.css';
import { Button } from '@/common/components/Button';

type EmptySectionProps = {
  message: string;
  buttonText: string;
  onClick: () => void;
};

export const EmptySection = ({
  message,
  onClick,
  buttonText,
}: EmptySectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Image
          alt='Emoji de rosto triste'
          src='/sad-face-emoji.png'
          width={128}
          height={128}
        />
        <p className={styles.paragraph}>{message}</p>
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </section>
  );
};

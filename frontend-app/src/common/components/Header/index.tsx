import Image from 'next/image';
import styles from './styles.module.css';
import { Button } from '@/common/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const { asPath } = useRouter();

  const hasPathInPathname = (path: string) => {
    return asPath.includes(path);
  };

  const onClick = () => {};

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            alt='Logo da empresa PD Soluções'
            src='/pds-logo.png'
            width={50}
            height={38}
          />
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>PD Hours</h1>
          <Button onClick={onClick}>Lançar Horas</Button>
        </div>
        <div>
          <nav>
            <ul className={styles.linkList}>
              <li>
                <Link
                  href='/'
                  className={`${styles.link} ${hasPathInPathname('squads') && styles.linkActive} ${asPath === '/' && styles.linkActive}`}
                >
                  Squads
                </Link>
              </li>
              <li>
                <Link
                  href='/employees'
                  className={`${styles.link} ${hasPathInPathname('employees') && styles.linkActive}`}
                >
                  Usuários
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

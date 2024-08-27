import { EmptySection } from '@/common/components/EmptySection';
import { Skeleton } from '@/common/components/Skeleton';
import { Table } from '@/common/components/Table';
import { useFetchSquads } from '@/squad/hooks/useFetchSquads';
import Head from 'next/head';
import styles from '@/styles/pages.styles.module.css';
import { useState } from 'react';
import { Modal } from '@/common/components/Modal';
import { CreateSquadForm } from '@/components/forms/CreateSquadForm';
import { Section } from '@/common/components/Section';
import { Button } from '@/common/components/Button';

export default function Home() {
  const { squads, isLoadingSquads } = useFetchSquads();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'button', title: ' ' },
  ];
  return (
    <>
      <Head>
        <title>PD Soluções</title>
        <meta name='description' content='PD Soluções APP' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Section title='Lista de Squads'>
        {isLoadingSquads ? (
          <div className={styles.skeletonContainer}>
            <Skeleton width='100%' height='100px' borderRadius='4px' />
            <Skeleton width='100%' height='100px' borderRadius='4px' />
            <Skeleton width='100%' height='100px' borderRadius='4px' />
            <Skeleton width='100%' height='100px' borderRadius='4px' />
          </div>
        ) : squads.length > 0 ? (
          <>
            <Table>
              <Table.Header columns={columns} colSpan={2} />
              <Table.Body
                columns={columns}
                data={squads}
                callToAction='Visitar squad'
              />
            </Table>
            <Button onClick={openModal}>Criar Squad</Button>
          </>
        ) : (
          <EmptySection
            message='Nenhuma squad cadastrada. Crie uma squad para começar.'
            onClick={openModal}
            buttonText='Criar squad'
          />
        )}
      </Section>
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Criar Squad'>
        <CreateSquadForm closeForm={closeModal} />
      </Modal>
    </>
  );
}

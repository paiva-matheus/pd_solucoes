import { Button } from '@/common/components/Button';
import { EmptySection } from '@/common/components/EmptySection';
import { InfoSection } from '@/common/components/InfoSection';
import { Modal } from '@/common/components/Modal';
import { Section } from '@/common/components/Section';
import { Skeleton } from '@/common/components/Skeleton';
import { Table } from '@/common/components/Table';
import { CreateEmployeeForm } from '@/components/forms/CreateEmployeeForm';
import { DateFilterForm } from '@/components/forms/DateFilterForm';
import { useFetchReports } from '@/reports/hooks/useFetchReports';
import { useFetchAverageHoursPerDay } from '@/squad/hooks/useFetchAverageHoursPerDay';
import { useFetchSquad } from '@/squad/hooks/useFetchSquad';
import { useFetchTotalHoursPerformed } from '@/squad/hooks/useFetchTotalHoursPerformed';
import styles from '@/styles/pages.styles.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SquadPage() {
  const { query } = useRouter();
  const squadId = query?.id as string;
  const { isLoadingSquad, squad, isSuccessFetchSquad } = useFetchSquad(squadId);
  const [initialDate, setInitialDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { fetchReports, reports, isSuccessFetchReports } = useFetchReports(
    squadId,
    initialDate,
    endDate
  );

  const { totalHoursPerformed, fetchTotalHoursPerformed } =
    useFetchTotalHoursPerformed(squadId, initialDate, endDate);

  const { averageHoursPerDay, fetchAverageHoursPerDay } =
    useFetchAverageHoursPerDay(squadId, initialDate, endDate);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onFilter = (initialDate: string, endDate: string) => {
    setInitialDate(initialDate);
    setEndDate(endDate);
    fetchReports();
    fetchTotalHoursPerformed();
    fetchAverageHoursPerDay();
  };

  const columns = [
    { key: 'name', title: 'Membro' },
    { key: 'description', title: 'Descrição' },
    { key: 'spentHours', title: 'Horas' },
    { key: 'createdAt', title: 'Data' },
  ];

  return (
    <>
      <Head>
        <title>PD Soluções</title>
        <meta name='description' content='PD Soluções APP' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      {isLoadingSquad && (
        <div className={styles.skeletonContainer}>
          <Skeleton width='100%' height='100px' borderRadius='4px' />
          <Skeleton width='100%' height='100px' borderRadius='4px' />
          <Skeleton width='100%' height='100px' borderRadius='4px' />
          <Skeleton width='100%' height='100px' borderRadius='4px' />
        </div>
      )}

      {isSuccessFetchSquad && (
        <Section title={squad!.name}>
          <DateFilterForm onFilter={onFilter} />

          {isSuccessFetchReports && reports.lenght > 0 && (
            <>
              <h3 className={styles.h3}>Horas por membro</h3>
              <Table>
                <Table.Header columns={columns} colSpan={2} />
                <Table.Body columns={columns} data={reports} />
              </Table>
              <Button onClick={openModal}>Criar Squad</Button>

              <InfoSection
                info={totalHoursPerformed}
                title='Horas totais da squad'
              />
              <InfoSection
                info={averageHoursPerDay}
                title='Média de horas por dia'
              />
            </>
          )}

          {isSuccessFetchReports && reports.length === 0 && (
            <EmptySection
              message='Nenhum usuário cadastrado nesta squad. Crie um usuário para começar.'
              onClick={openModal}
              buttonText='Criar usuário'
            />
          )}
        </Section>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title='Criar usuário'>
        <CreateEmployeeForm closeForm={closeModal} />
      </Modal>
    </>
  );
}

import { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/common/components/Button';
import { EmptySection } from '@/common/components/EmptySection';
import { Modal } from '@/common/components/Modal';
import { Section } from '@/common/components/Section';
import { Skeleton } from '@/common/components/Skeleton';
import { Table } from '@/common/components/Table';
import { CreateEmployeeForm } from '@/components/forms/CreateEmployeeForm';
import { useFetchEmployess } from '@/employee/hooks/useFetchEmployees';
import styles from '@/styles/pages.styles.module.css';
import { useFetchSquads } from '@/squad/hooks/useFetchSquads';
import { useRouter } from 'next/router';

export default function EmployeesPage() {
  const router = useRouter()
  const { employees, isLoadingEmployees } = useFetchEmployess();
  const { squads, isLoadingSquads } = useFetchSquads();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const columns = [
    { key: 'name', title: 'Nome' },
    { key: 'estimatedHours', title: 'Horas' },
    { key: 'squadId', title: 'Squad ID' },
  ];

  if(!isLoadingSquads && squads.length === 0){
    router.push('/')
  }
  
  return (
    <>
      <Head>
        <title>PD Soluções - Funcionários</title>
        <meta name='description' content='PD Soluções APP' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <>
      <Section title='Lista de Usuários'>
        {isLoadingEmployees ? (
          <div className={styles.skeletonContainer}>
            <Skeleton width='100%' height='100px' borderRadius='4px' />
            <Skeleton width='100%' height='100px' borderRadius='4px' />
            <Skeleton width='100%' height='100px' borderRadius='4px' />
            <Skeleton width='100%' height='100px' borderRadius='4px' />
          </div>
        ) : employees.length > 0 ? (
          <>
            <Table>
              <Table.Header columns={columns} colSpan={2} />
              <Table.Body
                columns={columns}
                data={employees}
              />
            </Table>
            <Button onClick={openModal}>Criar usuário</Button>
          </>
        ) : (
          <EmptySection
            message='Nenhum usuário cadastrado. Crie um usuário para começar.'
            onClick={openModal}
            buttonText='Criar usuário'
          />
        )}
      </Section>
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Criar usuário'>
        <CreateEmployeeForm closeForm={closeModal} />
      </Modal>
    </>
    </>
  );
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './styles.module.css';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';
import { useCreatReport } from '@/reports/hooks/useCreateReport';

const schema = z.object({
  description: z.string({ required_error: 'Campo obrigatório.' }).min(1),
  spentHours: z
    .number({
      required_error: 'Campo obrigatório.',
    })
    .int()
    .min(1)
    .max(12),
  employeeId: z.number({ required_error: 'Campo obrigatório.' }).int(),
});

type FormData = z.infer<typeof schema>;

interface CreateEmployeeFormProps {
  closeForm: () => void;
}

export const CreateReportForm = ({ closeForm }: CreateEmployeeFormProps) => {
  const { submitNewReport } = useCreatReport();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await submitNewReport(data);
    if (response.status === 201) {
      closeForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        type='number'
        placeholder='Digite o ID do funcionário'
        label='ID do usuário'
        name='employeeId'
        register={register}
        error={errors.employeeId}
        valueAsNumber
      />

      <Input
        type='number'
        placeholder='Digite a quantidade de horas'
        label='Horas Gastas'
        name='spentHours'
        register={register}
        error={errors.spentHours}
        valueAsNumber
      />

      <Input
        type='text'
        placeholder='Exemplo de texto de descrição
da tarefa executada.'
        label='descrição'
        name='description'
        register={register}
        error={errors.description}
      />
      <div className={styles.buttonContainer}>
        <Button type='submit'>Criar lançamento</Button>
      </div>
    </form>
  );
};

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './styles.module.css';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';
import { useCreatEmployee } from '@/employee/hooks/useCreateEmployee';

const schema = z.object({
  name: z.string({ required_error: 'O nome é obrigatório.' }).min(1),
  estimatedHours: z
    .number({
      required_error: 'As horas estimadas de trabalho são obrigatório.',
      message: 'Deve ser um número inteiro de 1 a 12',
    })
    .int()
    .min(1, { message: 'O número deve ser maior ou igual a 1' })
    .max(12, { message: 'O número deve ser menor ou igual a 12' }),
  squadId: z.number({ required_error: 'O id é obrigatório.' }).int(),
});

type FormData = z.infer<typeof schema>;

interface CreateEmployeeFormProps {
  closeForm: () => void;
}

export const CreateEmployeeForm = ({ closeForm }: CreateEmployeeFormProps) => {
  const { submitNewEmployee } = useCreatEmployee();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await submitNewEmployee(data);
    if (response.status === 201) {
      closeForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        type='text'
        placeholder='Digite o nome do usuário'
        label='Nome do usuário'
        name='name'
        register={register}
        error={errors.name}
      />

      <Input
        type='number'
        placeholder='Digite a quantidade de horas'
        label='Horas estimadas de trabalho'
        name='estimatedHours'
        register={register}
        error={errors.estimatedHours}
        valueAsNumber
      />

      <Input
        type='number'
        placeholder='Digite o Id da squad'
        label='Squad'
        name='squadId'
        register={register}
        error={errors.squadId}
        valueAsNumber
      />
      <div className={styles.buttonContainer}>
        <Button type='submit'>Criar usuário</Button>
      </div>
    </form>
  );
};

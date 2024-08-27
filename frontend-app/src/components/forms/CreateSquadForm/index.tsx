import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './styles.module.css';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';
import { useCreatSquad } from '@/squad/hooks/useCreateSquad';

const schema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
});

type FormData = z.infer<typeof schema>;

interface CreateSquadFormProps {
  closeForm: () => void;
}

export const CreateSquadForm = ({ closeForm }: CreateSquadFormProps) => {
  const { submitNewSquad } = useCreatSquad();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await submitNewSquad(data);
    if (response.status === 201) {
      closeForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.squadForm}>
      <Input
        type='text'
        placeholder='Digite o nome do squad'
        label='Nome da squad'
        name='name'
        register={register}
        error={errors.name}
      />
      <div className={styles.buttonContainer}>
        <Button type='submit'>Criar Squad</Button>
      </div>
    </form>
  );
};

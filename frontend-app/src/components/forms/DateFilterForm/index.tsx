import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './styles.module.css';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';

const schema = z.object({
  initialDate: z.string({ required_error: 'Campo obrigatório' }),
  endDate: z.string({ required_error: 'Campo obrigatório' }),
});

type FormData = z.infer<typeof schema>;

interface DateFilterFormProps {
  onFilter: (initialDate: string, endDate: string) => void;
  disable?: boolean;
}

export const DateFilterForm = ({ onFilter }: DateFilterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { initialDate, endDate } = data;
    onFilter(initialDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.content}>
        <Input
          type='date'
          placeholder='Digite a data inicial'
          label='Início'
          name='initialDate'
          register={register}
          error={errors.initialDate}
        />

        <Input
          type='date'
          placeholder='Digite a data final'
          label='Fim'
          name='endDate'
          register={register}
          error={errors.endDate}
        />
        <div className={styles.buttonContainer}>
          <Button type='submit'>Filtrar por data</Button>
        </div>
      </div>
    </form>
  );
};

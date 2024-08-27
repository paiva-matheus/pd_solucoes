import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';
import { toast } from 'react-toastify';

type CreateEmployeeFormData = {
  name: string;
  estimatedHours: number;
  squadId: number;
};

export const postEmployeePath = '/employees';

export const useCreatEmployee = () => {
  const queryClient = useQueryClient();

  const createEmployeeMutation = useMutation({
    mutationKey: ['createEmployee'],
    mutationFn: async (createEmployeeFormData: CreateEmployeeFormData) => {
      return await axiosClient.post(postEmployeePath, createEmployeeFormData);
    },
    onSuccess: () => {
      toast.success(`Sucesso ao criar o usuário`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: () => {
      toast.error('Erro ao criar a usuário. Tente novamente.')
    }
  });

  const submitNewEmployee = async (
    createEmployeeFormData: CreateEmployeeFormData
  ) => {
    return await createEmployeeMutation.mutateAsync(createEmployeeFormData);
  };

  return {
    submitNewEmployee,
  };
};

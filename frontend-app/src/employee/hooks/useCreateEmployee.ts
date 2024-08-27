import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';

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
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
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

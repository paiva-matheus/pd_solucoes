import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';
import { toast } from 'react-toastify';

type CreateReportFormData = {
  description: string;
  spentHours: number;
  employeeId: number;
};

export const postReportPath = '/reports';

export const useCreatReport = () => {
  const queryClient = useQueryClient();

  const createReportMutation = useMutation({
    mutationKey: ['createReport'],
    mutationFn: async (createReportFormData: CreateReportFormData) => {
      return await axiosClient.post(postReportPath, createReportFormData);
    },
    onSuccess: () => {
      toast.success(`Sucesso ao criar o report`);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
    onError: () => toast.error('Erro ao criar o report. Tente novamente.'),
  });

  const submitNewReport = async (
    createReportFormData: CreateReportFormData
  ) => {
    return await createReportMutation.mutateAsync(createReportFormData);
  };

  return {
    submitNewReport,
  };
};

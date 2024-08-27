import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';

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
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
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

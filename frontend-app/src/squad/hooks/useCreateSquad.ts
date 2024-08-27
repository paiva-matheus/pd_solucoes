import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';
import { toast } from 'react-toastify';

type CreateSquadFormData = {
  name: string;
};

export const postSquadPath = '/squads';

export const useCreatSquad = () => {
  const queryClient = useQueryClient();

  const createSquadMutation = useMutation({
    mutationKey: ['createSquad'],
    mutationFn: async (createSquadFormData: CreateSquadFormData) => {
      return await axiosClient.post(postSquadPath, createSquadFormData);
    },
    onSuccess: () => {
      toast.success(`Sucesso ao criar o squad`);
      queryClient.invalidateQueries({ queryKey: ['squads'] });
    },
    onError: () => toast.error('Erro ao criar a squad. Tente novamente.'),
  });

  const submitNewSquad = async (createSquadFormData: CreateSquadFormData) => {
    return await createSquadMutation.mutateAsync(createSquadFormData);
  };

  return {
    submitNewSquad,
  };
};

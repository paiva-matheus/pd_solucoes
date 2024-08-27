import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';

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
      queryClient.invalidateQueries({ queryKey: ['squads'] });
    },
  });

  const submitNewSquad = async (createSquadFormData: CreateSquadFormData) => {
    return await createSquadMutation.mutateAsync(createSquadFormData);
  };

  return {
    submitNewSquad,
  };
};

import { useQuery } from '@tanstack/react-query';
import { SquadDto } from '@/squad/dto/squad.dto';
import { axiosClient } from '@/common/services/axios-client';

export const useFetchSquad = (squadId: string) => {
  const fetchSquadPath = `/squads/${squadId}`;
  const { data, isFetching, isError } = useQuery({
    queryKey: ['squad'],
    queryFn: () =>
      axiosClient
        .get(fetchSquadPath)
        .then((response) => new SquadDto(response.data).toJSON()),
    refetchOnWindowFocus: false,
  });

  return {
    squad: data,
    isLoadingSquad: isFetching,
    isErrorLoadingSquad: isError,
  };
};

import { useQuery } from '@tanstack/react-query';
import { SquadDto } from '@/squad/dto/squad.dto';
import { axiosClient } from '@/common/services/axios-client';

export const fetchSquadsPath = '/squads';

export const useFetchSquads = () => {
  const squadsQuery = useQuery({
    queryKey: ['squads'],
    queryFn: () =>
      axiosClient
        .get(fetchSquadsPath)
        .then((response) => new SquadDto(response.data)),
    refetchOnWindowFocus: false,
  });

  return {
    squads: squadsQuery.data,
    isLoadingSquads: squadsQuery.isFetching,
    isErrorLoadingSquads: squadsQuery.isError,
  };
};

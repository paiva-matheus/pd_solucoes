import { useQuery } from '@tanstack/react-query';
import { Squad, SquadDto } from '@/squad/dto/squad.dto';
import { axiosClient } from '@/common/services/axios-client';

export const fetchSquadsPath = '/squads';

type useFetchSquadsReturn = {
  squads: Array<Squad>;
  isLoadingSquads: boolean;
  isErrorLoadingSquads: boolean;
};

export const useFetchSquads = (): useFetchSquadsReturn => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['squads'],
    queryFn: () =>
      axiosClient
        .get(fetchSquadsPath)
        .then((response) =>
          response.data.map((res: Squad) => new SquadDto(res).toJSON())
        ),
    refetchOnWindowFocus: false,
  });

  return {
    squads: data,
    isLoadingSquads: isFetching,
    isErrorLoadingSquads: isError,
  };
};

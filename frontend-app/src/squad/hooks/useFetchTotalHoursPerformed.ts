import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';

export const useFetchTotalHoursPerformed = (
  squadId: string,
  initialDate: string,
  endDate: string
) => {
  const fetchTotalHoursPerformedPath = `/squads/${squadId}/total-hours-performed?initialDate=${initialDate}&endDate=${endDate}`;
  const { data, isFetching, isError, refetch, isSuccess } = useQuery({
    queryKey: ['totalHoursPerformed'],
    queryFn: () =>
      axiosClient
        .get(fetchTotalHoursPerformedPath)
        .then((response) => response.data.totalHoursPerformed),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const totalHoursPerformed = `${data} Horas`;

  return {
    fetchTotalHoursPerformed: refetch,
    isLoadingSquad: isFetching,
    isErrorLoadingSquad: isError,
    isSuccess: isSuccess,
    totalHoursPerformed,
  };
};

import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';
import { averageFormatter } from '@/utils/formatter';

export const useFetchAverageHoursPerDay = (
  squadId: string,
  initialDate: string,
  endDate: string
) => {
  const fetchAverageHoursPerDayPath = `/squads/${squadId}/average-hours-spent-per-day?initialDate=${initialDate}&endDate=${endDate}`;
  const { data, isFetching, isError, refetch, isSuccess } = useQuery({
    queryKey: ['averageHoursPerDay'],
    queryFn: () =>
      axiosClient
        .get(fetchAverageHoursPerDayPath)
        .then((response) => response.data.averageHoursSpentPerDay),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const averageHoursPerDay = `${averageFormatter(data)} Horas/Dia`;

  return {
    fetchAverageHoursPerDay: refetch,
    averageHoursPerDay: averageHoursPerDay,
    isLoadingAverageHoursPerDay: isFetching,
    isErrorLoadingAverageHoursPerDay: isError,
    isSuccessAverageHoursPerDay: isSuccess,
  };
};

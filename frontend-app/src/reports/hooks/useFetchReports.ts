import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';
import { RemoteReport, ReportDto } from '../dto/report.dto';

export const useFetchReports = (
  squadId: string,
  initialDate: string,
  endDate: string
) => {
  const fetchSquadPath = `/reports?squadId=${squadId}&initialDate=${initialDate}&endDate=${endDate}`;
  const { data, isFetching, isError, refetch, isSuccess } = useQuery({
    queryKey: ['reports'],
    queryFn: () =>
      axiosClient.get(fetchSquadPath).then((response) => response.data.map((report: RemoteReport) => new ReportDto(report).toJSON())),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return {
    fetch: refetch,
    reports: data,
    isLoadingSquad: isFetching,
    isErrorLoadingSquad: isError,
    isSuccess: isSuccess,
  };
};

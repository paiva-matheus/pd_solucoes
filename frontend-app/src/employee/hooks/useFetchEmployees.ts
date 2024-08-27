import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/common/services/axios-client';
import { Employee, EmployeeDto } from '../dto/employee.dto';

export const fetchEmployeesPath = '/employees';

export const useFetchEmployess = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: () =>
      axiosClient
        .get(fetchEmployeesPath)
        .then((response) =>
          response.data.map((res: Employee) => new EmployeeDto(res).toJSON())
        ),
    refetchOnWindowFocus: false,
  });

  return {
    employees: data,
    isLoadingEmployees: isFetching,
    isErrorLoadingEmployees: isError,
  };
};

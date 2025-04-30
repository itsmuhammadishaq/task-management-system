import { useQuery } from '@tanstack/react-query';

import JsonService from 'src/services/jsonService';

import { queryKeys } from '../utils/queryKeys';

const useData = () =>
  useQuery<any[]>({
    queryKey: [queryKeys.tasks],
    queryFn: () => new JsonService().getTasks(),
  });

export default useData;

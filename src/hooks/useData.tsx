import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/utils/queryKeys';

import FirebaseService from 'src/components/services/firebaseService';

const useData = () =>
  useQuery<any[]>({
    queryKey: [queryKeys.tasks],
    queryFn: () => new FirebaseService().getData(),
  });

export default useData;

// src/lib/swr-config.ts
import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr';
import { useAuth } from '../contexts/AuthContext';
import { fetcher } from './fetcher';

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

export const useAuthenticatedSWR = <T = any>(
  query: string, 
  variables?: Record<string, any>
): SWRResponse<T, Error> => {
  const { token } = useAuth();
  
  const key = token ? [query, variables] : null;
  
  return useSWR(
    key,
    () => fetcher(token || '')(query, variables),
    swrConfig,
  );
};


export const useAuthenticatedMutation = () => {
  const { token } = useAuth();
  
  const mutate = async (query: string, variables?: Record<string, any>) => {
    if (!token) {
      throw new Error('No hay token de autenticación');
    }
    
    return fetcher(token)(query, variables);
  };
  
  return { mutate };
};
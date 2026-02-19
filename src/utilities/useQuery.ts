import api, { BASE_URLS } from '@/config/axiosInstance';
import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { getLocalStorageItem } from './localStorage';
import { User } from '@/types/user';

type ServiceType = keyof typeof BASE_URLS;

const constructHeaders = (
  isFormData: boolean = false,
  additionalHeaders: Record<string, string> = {}
) => {
  const baseHeaders = isFormData
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' };

  return {
    ...baseHeaders,
    'X-Handle-Error': 'true',
    ...additionalHeaders
  };
};

type PlainObject = Record<string, any>;

const constructBody = (data: PlainObject | PlainObject[] = {}) => {
  return data;
};


export function usePostItem(
  service: ServiceType,
  key: QueryKey,
  data: any,
  path: string,
  isFormData: boolean,
  headers: Record<string, string> = {},
  id?: string,
) {
  return useMutation({
    mutationKey: [key, id],
    mutationFn: async () => {
      try {
        headers = constructHeaders(isFormData, headers);
        const mainData = constructBody(data);

        const response = await api(service).post(path, mainData, { headers });
        const mainResponse = response.data;
        return mainResponse;
      } catch (error: any) {
        if (error?.response?.data) {
          const mainResponse = error.response.data;
          throw new Error(mainResponse?.Message || mainResponse?.message);
        } else {
          throw new Error(error.message || 'Unhandled server error occurred');
        }
      }
    }
  });
}

export function usePostWithData(
  service: ServiceType,
  key: QueryKey,
  path: string,
  isFormData: boolean,
  headers: Record<string, string> = {},
  id?: string,
  staleTime?: number
) {
  return useMutation({
    mutationKey: [key, id],
    mutationFn: async (data: any) => {
      try {
        headers = constructHeaders(isFormData, headers);
        const mainData = constructBody(data);
        const response = await api(service).post(path, mainData, { headers });
        const mainResponse = response.data;

        return mainResponse;
      } catch (error: any) {
        if (error?.response?.data) {
          const mainResponse = error.response.data;
          throw new Error(mainResponse?.Message || mainResponse?.message);
        } else {
          throw new Error(error.message || 'Unhandled server error occurred');
        }
      }
    }
  });
}

export function usePutWithData(
  service: ServiceType,
  key: QueryKey,
  path: string,
  isFormData: boolean,
  headers: Record<string, string> = {},
  id?: string,
) {
  return useMutation({
    mutationKey: [key, id],
    mutationFn: async (data: any) => {
      try {
        headers = constructHeaders(isFormData, headers);
        const mainData = constructBody(data);
        const response = await api(service).put(path, mainData, { headers });
        const mainResponse = response.data;

        return mainResponse;
      } catch (error: any) {
        if (error?.response?.data) {
          const mainResponse = error.response.data;
          throw new Error(mainResponse?.Message || mainResponse?.message);
        } else {
          throw new Error(error.message || 'Unhandled server error occurred');
        }
      }
    }
  });
}

export function usePutItem(
  service: ServiceType,
  key: QueryKey,
  data: any,
  path: string,
  isFormData: boolean,
  headers: Record<string, string> = {},
  id?: string,
) {
  return useMutation({
    mutationKey: [key, id],
    mutationFn: async () => {
      try {
        headers = constructHeaders(isFormData, headers);
        const mainData = constructBody(data);
        const response = await api(service).put(path, mainData, { headers });
        const mainResponse = response.data;

        return mainResponse;
      } catch (error: any) {
        if (error?.response?.data) {
          const mainResponse = error.response.data;
          throw new Error(mainResponse?.Message || mainResponse?.message);
        } else {
          throw new Error(error.message || 'Unhandled server error occurred');
        }
      }
    }
  });
}

export async function getDataItem(
  service: ServiceType,
  path: string,
  additionalHeaders: Record<string, string> = {}
) {
  const headers = constructHeaders(false, additionalHeaders);
  try {
    const response = await api(service).get(path, {
      headers
    });
    const mainResponse = response.data;
    return mainResponse;
  } catch (error: any) {
    if (error?.response?.data) {
      const mainResponse = error.response.data;
      throw new Error(mainResponse?.Message || mainResponse?.message);
    } else {
      throw new Error(error.message || 'Unhandled server error occurred');
    }
  }
}

export function useFetchItem(
  service: ServiceType,
  key: QueryKey,
  path: string,
  enabled: boolean = true,
  staleTime?: number
) {
  return useQuery({
    queryKey: [key],
    queryFn: () => getDataItem(service, path),
    staleTime: staleTime || 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled
  });
}


export function useDeleteItem(
  service: ServiceType,
  key: QueryKey,
  path: string,
  headers: Record<string, string> = {},
  id?: string
) {
  return useMutation({
    mutationKey: [key, id],
    mutationFn: async () => {
      try {
        headers = constructHeaders(false, headers);
        const response = await api(service).delete(path, { headers });
        const mainResponse = response.data;
        return mainResponse;
      } catch (error: any) {
        if (error?.response?.data) {
          const mainResponse = error.response.data;
          throw new Error(mainResponse?.Message || mainResponse?.message);
        } else {
          throw new Error(error.message || 'Unhandled server error occurred');
        }
      }
    }
  });
}

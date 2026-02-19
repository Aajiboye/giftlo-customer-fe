'use client';

import {getDataItem, useFetchItem } from '@/utilities/useQuery';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo
} from 'react';
import { useUser } from './UserContext';
import { Package } from '@/types/central';
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";



interface CentralContextType {
 
  states: string[];
  lgas: string[];
  activeState: string;
  activeLga: string;
  setActiveState: React.Dispatch<React.SetStateAction<string>>;
  isFetchingStates:boolean;
  isFetchingLGA:boolean;
  packages: Package[];
  fetchDeliverFee: (lga:string) => Promise<number>;
}

const CentralContext = createContext<CentralContextType | undefined>(undefined);

export const CentralProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  
  const [activeState, setActiveState] = useState<string>("");
  const [activeLga, setActiveLga] = useState<string>("");
  const queryClient = useQueryClient();


  const { user } = useUser();
 const { data: statesData, isLoading: isFetchingStates } = useFetchItem(
    'app',
    ['get-all-states'],
    '/locations/states'
  );

  const { data: lgaData, isLoading: isFetchingLGA } = useFetchItem(
    'app',
    ['/v1/locations/lga', activeState],
    `/locations/lga/${activeState}`,
    !!activeState
  );

  const { data: packagesData, isLoading: isFetchingPackages } = useFetchItem(
    'app',
    ['/v1/locations/lga'],
    `/admin/packages`,
  );

  const states: string[] = useMemo(() => {
    if (statesData?.states?.length) {
      // if(!activeState) setActiveState(statesData?.states[0]);
      return statesData?.states;
    }
    return [];
  }, [statesData]);

  const lgas: string[] = useMemo(() => {
    if (lgaData?.lgas?.length) {
        if(!activeLga) setActiveLga(lgaData?.lgas[0]);

      
      return lgaData?.lgas;
    }
    return [];
  }, [lgaData]);

  const packages: Package[] = useMemo(() => {
    if (packagesData?.length) {
      return packagesData;
    }
    return [];
  }, [packagesData]);

  const fetchDeliverFee = async (lga: string) : Promise<number> => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['/v1/logistics/delivery-rate', activeState, lga],
        queryFn: () => getDataItem('app', `/logistics/delivery-rate?state=${activeState}&lga=${lga}`)
      });

      console.log({deliveryFee: data})
      
      return data?.cost;
    } catch (error) {
      console.error("Failed to fetch business data", error);
      throw error;
    }
  };

  
  return (
    <CentralContext.Provider
      value={{
        states, lgas, activeLga, activeState, setActiveState, isFetchingLGA, isFetchingStates, packages, fetchDeliverFee
      }}
    >
      {children}
    </CentralContext.Provider>
  );
};

// ✅ Custom hook to access the context
export const useCentral = () => {
  const context = useContext(CentralContext);
  if (!context) {
    throw new Error('useCentral must be used within a CentralProvider');
  }
  return context;
};

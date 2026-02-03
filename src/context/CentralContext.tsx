'use client';

import {useFetchItem } from '@/utilities/useQuery';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo
} from 'react';
import { useUser } from './UserContext';


interface CentralContextType {
 
  states: string[];
  lgas: string[];
  activeState: string;
  activeLga: string;
  setActiveState: React.Dispatch<React.SetStateAction<string>>;
  isFetchingStates:boolean;
  isFetchingLGA:boolean;

  
}

const CentralContext = createContext<CentralContextType | undefined>(undefined);

export const CentralProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  
  const [activeState, setActiveState] = useState<string>("");
  const [activeLga, setActiveLga] = useState<string>("");

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

  // console.log({lgaData, activeState, statesData, lgas})


  
  return (
    <CentralContext.Provider
      value={{
        states, lgas, activeLga, activeState, setActiveState, isFetchingLGA, isFetchingStates
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

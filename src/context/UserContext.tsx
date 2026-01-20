import { User } from '@/types/user';
import { getLocalStorageItem } from '@/utilities/localStorage';
import { useFetchItem } from '@/utilities/useQuery';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User>({
    passportId: '',
    firstName: '',
    lastName: '',
    otherName: '',
    businessId: '',
    addedBy: '',
    addedOn: '',
    applicationId: '',
    businessPosition: '',
    gender: 0,
    id: 0,
    isActive: false,
    isDelete: false,
    phoneNumber: '',
    lastClientIpAddress: '',
    lastLogin: '',
    marital: 0,
    processStage: 0,
    updatedBy: '',
    updatedOn: '',
    token: '',
    refreshToken:'',
  });


  
  useEffect(() => {
    const storedUser = getLocalStorageItem<User>('giftlo_user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

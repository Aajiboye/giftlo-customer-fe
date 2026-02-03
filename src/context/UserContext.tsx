import { User } from '@/types/user';
import { getLocalStorageItem, setLocalStorageItem } from '@/utilities/localStorage';
import { useFetchItem } from '@/utilities/useQuery';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: User;
  setUser: (details: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUserDetails] = useState<User>({

    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    id: 0,
    phone: '',
    avatarUrl: '',
  });

  const { data: profileData } = useFetchItem(
    'app',
    ['get-user-profile'],
    '/customer/profile'
  );

  console.log({ profileData })



  useEffect(() => {
    const storedUser = getLocalStorageItem<User>('giftlo_user');
    if (storedUser) {
      setUserDetails(storedUser);
    }

    if(profileData){
      setUser({...user, ...profileData})
    }
  }, [profileData]);

  const setUser = (details: User) => {
    setUserDetails(details);
    setLocalStorageItem('giftlo_user', details);
  };

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

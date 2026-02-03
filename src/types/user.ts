
export type User = {
  fullName: string,
  firstName: string,
  lastName: string,
  email: string,
  id: number,
  phone: string,
  avatarUrl: string,
  address?: string,
  token?: string
  userRole?: "CUSTOMER" | "VENDOR"
  verified?: boolean,
  gender?:"male"| "female"| "other";
  dob?:string;
  country?:string;
  state?:string;
  localGovernmentArea?:string;
  postalCode?:string;
  termsAccepted?:boolean;
  notificationPreferences?: {
    allMedium: true,
    emailNotification: true,
    smsNotification: true,
    pushNotification: true
  }
};

import { getLocalStorage, getLocalStorageItem } from '@/utilities/localStorage';
import Cookies from 'js-cookie';
import api from '@/config/axiosInstance';

export const logout = async (isUnAuthorized: boolean = false) => {

  const localStorage = getLocalStorage();

  const pass = process.env.NEXT_PUBLIC_SAMPLE;

  const logoutEverywhere = async (email: string | undefined) => {
    let data = { username: email, password: pass };

    try {
      const res: any = await api('app').post(`/Auth/LogOutUser`, data);
      return { data: res };

    } catch (error: any) {
      //console.error("Logout error", { error });
    }
  };

  if (localStorage) {
    let user: User | null = getLocalStorageItem('giftlo_user');

    if (!isUnAuthorized) {
      let res: any = await logoutEverywhere(user?.email);
      if (res?.data) {
        Cookies.remove('giftlo_token');
        localStorage.removeItem('giftlo_user');
        localStorage.removeItem('giftlo_user_business');
        localStorage.removeItem('selectedIds');
      }
    } else {
      Cookies.remove('giftlo_token');
      localStorage.removeItem('giftlo_user');
      localStorage.removeItem('giftlo_user_business');
      localStorage.removeItem('selectedIds');
    }
  }
  window.location.href = '/';
};

export type UpdateBusinessDetails = {
  alternativeBusinessName: string;
  businessAccountNumber: string;
  businessAddress: string;
  businessEmailAddress: string;
  businessPhoneNumber: string;
  operatingStructureId: number;
  staffStrength: string;
  website: string;
  subSectorId: number;
  subSectorName: string;
  sectorId: number;
  sectorName: string;
};

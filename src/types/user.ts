
export type User = {
  passportId: string;
  firstName: string;
  lastName: string;
  otherName: string;
  businessId: string;
  addedBy: string;
  addedOn: string;
  applicationId: string;
  businessPosition: string;
  gender: number;
  id: number;
  isActive: boolean;
  isDelete: boolean;
  phoneNumber: string;
  lastClientIpAddress: string;
  lastLogin: string;
  marital: number;
  processStage: number;
  updatedBy: string;
  updatedOn: string;
  emailAddress?: string;
  token?: string | null;
  refreshToken?: string | null;
  phone?: string;
  profileCompleted?:boolean;
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
      let res: any = await logoutEverywhere(user?.emailAddress);
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

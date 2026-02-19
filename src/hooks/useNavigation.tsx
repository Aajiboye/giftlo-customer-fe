import { useRouter } from 'next/router';

export const useNavigation = () => {
  const { push, pathname, back, query } = useRouter();

  const navigateToHome = () => {
    push(`/`, `/`);
  };

  const navigateToSignin = (isFirst: boolean = false) => {
    push(`/?isFirst=${isFirst}`, `/`);
  };

  const navigateToSignup = () => {
    push(`/signup`, `/signup`);
  };

  const navigateToResetPassword = () => {
    push(`/forgot-password`, `/forgot-password`);
  };

  const navigateToEmailSent = () => {
    push(`/email-sent`, `/email-sent`);
  };

  const navigateToProfileEdit = () => {
    push(`/home/profile/edit`, `/home/profile/edit`);
  };

  const navigateToProfile = () => {
    push(`/home/profile`, `/home/profile`);
  };

  const navigateToCart = () => {
    push(`/home/profile/cart`, `/home/profile/cart`);
  };

  const navigateToViewProduct = (id: string) => {
    push(`/home/products/${id}`, `/home/products/${id}`);
  };

  const navigateToCheckout = () => {
    push(`/home/profile/cart/checkout`, `/home/profile/cart/checkout`);
  };

  

  const navigateBack = () => back();



  return {
    navigateBack,
    pathname,
    query,
    navigateToHome,
    navigateToSignin,
    navigateToSignup,
    navigateToResetPassword,
    navigateToEmailSent,
    navigateToProfile,
    navigateToProfileEdit,
    navigateToCart,
    navigateToCheckout,
    navigateToViewProduct

  };
};

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { usePostItem } from '@/utilities/useQuery';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import Modal from '@/components/common/modal';
import SuccessMessage from '@/components/Auth/SuccessMessage';
import { useNavigation } from '@/hooks/useNavigation';
import Loading from '@/components/common/Loading';

export default function ActivateAccount() {
  const { toast } = useToast();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { navigateToSignin } = useNavigation()

  const email = searchParams.get('email') || '';
  const linkCode = searchParams.get('token') || '';

  const [showModal, setShowModal] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(true);

  // API call to activate account
  const { mutateAsync: activateAccount, status } = usePostItem(
    'app',
    ['/auth/customer/email/verify'],
    { tokenId:linkCode },
    '/auth/customer/email/verify',
    false
  );

  // API call to resend activation email
  const { mutateAsync: resendActivation, status: resendStatus } = usePostItem(
    'app',
    ['resend-activation'],
    { emailAddress: email },
    '/User/ReSendActivateAccountMail',
    false
  );

  useEffect(() => {
    if (email && linkCode) {
      handleActivation();
    }
  }, [email, linkCode]);

  const handleActivation = async () => {
    try {
      await activateAccount();
      setActivationSuccess(true);
      setShowModal(true);
    } catch (error) {
      setActivationSuccess(false);
      setShowModal(true);
    }
  };

  const handleResend = async () => {
    try {
      await resendActivation();
      push('/check-email');
    } catch (error) {
      toast({
        variant: 'error',
        title: `${error}`,
        description: 'Please try again.',
        action: (
          <ToastAction altText="Retry" onClick={handleResend}>
            Retry
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 text-center">
        {status === 'pending' ? (
          <div className="">
            <Loading />
            <p className="text-lg font-semibold">Activating account...</p>
          </div>
        ) : activationSuccess ? (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            children={
              <Modal isOpen={showModal}
                onClose={() => setShowModal(false)}
                children={<SuccessMessage title="Email activated successfully!" onClose={() => setShowModal(false)} onButtonClick={() => navigateToSignin()} btnText='Go to Login'
                  description={
                    <>
                      <p className="text-gray-600 text-sm mt-2">
                        Your account has been successfully activated. You can now log in.
                      </p>
                    </>
                  }
                />}
              />
            }
          />
        ) : (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            children={
              <SuccessMessage title="Account validation failed!" onClose={() => setShowModal(false)} isSuccess={false} onButtonClick={resendActivation} btnText='Resend Email' isLoading={resendStatus === "pending" ? true : false}
                description={
                  <>
                    <p className="text-gray-600 text-sm mt-2">
                      Validation failed, click button to resend email.
                    </p>
                  </>
                }
              />
            }
          />
        )}
      </div>
    </div>
  );
}

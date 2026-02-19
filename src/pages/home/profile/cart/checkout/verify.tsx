'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Modal from '@/components/common/modal';
import SuccessMessage from '@/components/Auth/SuccessMessage';
import { useNavigation } from '@/hooks/useNavigation';
import Loading from '@/components/common/Loading';
import api from '@/config/axiosInstance';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

export default function VerifyPayment() {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { navigateToCart } = useNavigation()

  //orderId=6996f1bc9562873d2449bed1&trxref=giftlo_6996f1bc9562873d2449bed1_1771499964542&reference=giftlo_6996f1bc9562873d2449bed1_1771499964542

  const orderId = searchParams.get('orderId') || '';
  const trxref = searchParams.get('trxref') || '';
  const reference = searchParams.get('reference') || '';

  const [showModal, setShowModal] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(true);
  const { cart, totalAmount, totalQuantity, refetchUserCart } = useCart();


  useEffect(() => {
    if (orderId && reference) {
      verifyOrder(orderId, reference);
    }
  }, [orderId, reference]);

  const verifyOrder = async (orderId: string, reference: string) => {
    try {
      setLoading(true)
      const res: any = await api('app').post(`/checkout/${orderId}/verify`, { paymentReference: reference });

      console.log({ res });
      setShowModal(true)
      setVerificationSuccess(true);
      refetchUserCart();
      // toast.success('Item deleted from cart successfully');
    } catch (error: any) {
      toast.error(
        `${error}`
      );
    }

    setLoading(false);
    setTimeout(() => {
      navigateToCart();
    }, 5000)
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 text-center">
        {loading ? (
          <div className="">
            <Loading />
            <p className="text-lg font-semibold">Verifying order...</p>
          </div>
        ) : verificationSuccess ? (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            children={
              <Modal isOpen={showModal}
                onClose={() => setShowModal(false)}
                children={<SuccessMessage title="Order completed successfully!" onClose={() => setShowModal(false)} onButtonClick={() => navigateToCart()} btnText='Go to Cart'
                  description={
                    <>
                      <p className="text-gray-600 text-sm mt-2">
                        Your order has been successfully completed. redirecting to your cart in 5 seconds.
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
              <SuccessMessage title="Order failed!" onClose={() => setShowModal(false)} isSuccess={false} onButtonClick={() => navigateToCart()} btnText='Go to cart'
                description={
                  <>
                    <p className="text-gray-600 text-sm mt-2">
                      Order failed, click button to resend email.
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

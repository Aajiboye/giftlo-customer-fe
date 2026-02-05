// src/pages/_app.tsx

import type { AppProps } from 'next/app';
import { NextRouter } from 'next/router';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import AuthLayout from '@/components/Layouts/AuthLayout';
import OnboardingLayout from '@/components/Layouts/OnboardingLayout';
import { WindowWidthProvider } from '@/context/WindowContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/context/UserContext';
import { Instrument_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'sonner';
import { ProductProvider } from '@/context/ProductContext';
import { CentralProvider } from '@/context/CentralContext';
import { CartProvider } from '@/context/CartContext';

// Font
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap'
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
  router
}: AppProps & { router: NextRouter }) {
  const isAppRoute = router.pathname.startsWith('/home');
  const isOnboardingRoute = router.pathname.startsWith('/questionnaire');

  let Layout: React.ComponentType<any> = AuthLayout;
  if (isAppRoute) Layout = DashboardLayout;
  else if (isOnboardingRoute) Layout = OnboardingLayout;

  // ✅ THIS IS THE KEY
  const getLayout =
    (Component as any).getLayout ?? ((page: React.ReactNode) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <WindowWidthProvider>
        <div className={instrumentSans.variable}>
          <UserProvider>
            <CentralProvider>

              <ProductProvider>
                <CartProvider>
                  {getLayout(
                    <Layout pageTitle={pageProps?.pageTitle}>
                      <Component {...pageProps} />
                    </Layout>
                  )}
                </CartProvider>
              </ProductProvider>
            </CentralProvider>

          </UserProvider>

          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              style: { background: 'white' },
              className: 'my-toast'
            }}
          />

          
        </div>
      </WindowWidthProvider>
    </QueryClientProvider>
  );
}

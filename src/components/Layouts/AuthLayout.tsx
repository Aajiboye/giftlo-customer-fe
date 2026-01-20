import React from 'react';
import AuthSideComponent from '../Nav/AuthSideComponent';

export default function AuthLayout({
  children,
  pageTitle = ''
}: {
  children: React.ReactNode;
  pageTitle?: string;
}) {
  return (
    <div className="flex min-h-[100vh] bg-white py-6">

      <main className="w-full md:w-1/2 px-2 md:px-8">
        {children}
      </main>

      <AuthSideComponent />

    </div>
  );
}

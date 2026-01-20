"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Nav/NavBar";


interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({
  children,
}: OnboardingLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {children}
    </main>
  );
}

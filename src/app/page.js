'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function RootPage() {
  const router = useRouter();
  const { onboarded } = useApp();

  useEffect(() => {
    if (onboarded) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [onboarded, router]);

  return null;
}

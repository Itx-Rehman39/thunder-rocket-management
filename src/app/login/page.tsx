'use client';

import React from 'react';
import { AdminLoginGate } from '@/components/auth/AdminLoginGate';
import { useApp } from '@/lib/store/appStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { isAdminAuthenticated } = useApp();
  const router = useRouter();

  if (isAdminAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/dashboard');
    }
  }

  return <AdminLoginGate />;
}

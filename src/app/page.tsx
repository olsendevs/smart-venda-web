'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem('user') || '',
    );
    if (user?.type == 'admin') {
      router.push('/admin/user');
    } else {
      router.push('/store/order');
    }
  }, []);

  return <></>;
}

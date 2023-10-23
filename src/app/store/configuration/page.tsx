'use client';

import React from 'react';

import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Store from './components/store';
import Integration from './components/integration';

export default function Configurations() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [store, setStore] = React.useState({
    name: undefined,
    _id: undefined,
    cnpj: undefined,
    helpMessage: undefined,
    payment: {
      method: 'confirmation',
      apiKey: '',
    },
  });
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const user = JSON.parse(
          localStorage.getItem('user') || '',
        );
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/store/by-user`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        );
        const responseData = await response.json();

        if (!responseData._id) {
          const createdStore = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/store`,
            {
              method: 'POST',
              body: JSON.stringify({
                name: ' ',
                cnpj: ' ',
                userId: user.id,
                payment: {
                  method: 'confirmation',
                  apiKey: '',
                },
              }),
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json',
              },
            },
          );
          setStore(await createdStore.json());
        } else {
          setStore(responseData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    fetchData();
  }, []);
  return (
    <main className="pt-20 pl-5 flex w-[55vw] mr-auto ml-auto">
      <Store storeData={store} setStoreData={setStore} />

      <Integration
        storeData={store}
        setStoreData={setStore}
      />

      <LoadingSpinner visible={isLoading} />
    </main>
  );
}

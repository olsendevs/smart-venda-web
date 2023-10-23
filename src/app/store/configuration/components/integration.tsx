'use client';

import React, { useEffect } from 'react';

import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

export default function Integration({
  storeData,
  setStoreData,
}: any) {
  const [isLoading, setIsLoading] = React.useState(false);

  const FormSchema = z.object({
    method: z.boolean().default(false).optional(),
    apiKey: z.string({
      required_error: 'A Key da API é obrigatória',
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      method: false,
    },
  });

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    setIsLoading(true);
    if (storeData) {
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '',
        ).accessToken;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/store/${storeData._id}`,
          {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const responseData = await response.json();

        if (
          response.status === 500 ||
          response.status === 400
        ) {
          toast({
            title:
              'Erro ao adicionar usuário. Tente novamente.',
            variant: 'destructive',
            description: responseData.message,
          });
          return;
        }

        toast({
          title: 'Usuário adicionado com sucesso!',
          variant: 'default',
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Erro ao adicionar usuário.',
          variant: 'destructive',
        });
      }
      document.getElementById('close')?.click();

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }

  return (
    <Card className="w-[25vw] p-4 mr-auto ml-auto">
      <CardTitle>Integração com MercadoPago</CardTitle>
      <CardDescription>
        Seus clientes podem pagar pelo MercadoPago.
      </CardDescription>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent>
            <div className="mt-9">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>
                          Ativar integração com o
                          MercadoPago
                        </FormLabel>
                        <FormDescription className="w-[90%]">
                          Ao ativar essa opção será possivel
                          automatizar o pagamento.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={true}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="apiKey"
                        className="text-right"
                      >
                        Key da API
                      </Label>
                      <Input
                        id="apiKey"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!form.getValues('method')}
                        className="col-span-3"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full mt-9"
              type="submit"
              id="submit"
              disabled={!form.getValues('method')}
            >
              Salvar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

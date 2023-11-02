'use client';

import React, { useEffect } from 'react';

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
import { Textarea } from '@/components/ui/textarea';

export default function Store({
  storeData,
  setStoreData,
}: any) {
  const [isLoading, setIsLoading] = React.useState(false);

  const FormSchema = z.object({
    name: z.string({
      required_error: 'O nome é obrigatório',
    }),
    cnpj: z.string({
      required_error: 'O CNPJ é obrigatório',
    }),
    helpMessage: z.string().optional(),
  });

  useEffect(() => {
    form.setValue('name', storeData.name);
    form.setValue('cnpj', storeData.cnpj);
    form.setValue('helpMessage', storeData.helpMessage);
  }, [storeData]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
              'Erro ao atualizar loja. Tente novamente.',
            variant: 'destructive',
            description: responseData.message,
          });
          return;
        }

        toast({
          title: 'Loja atualizada com sucesso!',
          variant: 'default',
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Erro ao atualizar loja.',
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
      <CardTitle>Configurações da loja</CardTitle>
      <CardDescription>
        Preencha as informações sobre sua loja.
      </CardDescription>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-auto gap-1 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="name"
                        className="text-right"
                      >
                        Nome*
                      </Label>
                      <Input
                        id="name"
                        onChange={field.onChange}
                        defaultValue={storeData.name}
                        disabled={isLoading}
                        className="col-span-3"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="text"
                        className="text-right"
                      >
                        CNPJ*
                      </Label>
                      <Input
                        id="text"
                        onChange={field.onChange}
                        defaultValue={storeData.cnpj}
                        disabled={isLoading}
                        className="col-span-3"
                        type="text"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="helpMessage"
                  render={({ field }) => (
                    <FormItem className="">
                      <Label
                        htmlFor="helpMessage"
                        className="text-right"
                      >
                        Mensagem enviada no /ajuda
                      </Label>
                      <Textarea
                        id="helpMessage"
                        onChange={field.onChange}
                        defaultValue={storeData.helpMessage}
                        disabled={isLoading}
                        className="col-span-3"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=""></div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              id="submit"
            >
              Salvar
            </Button>
          </CardFooter>
        </form>
        <Toaster />
      </Form>
    </Card>
  );
}

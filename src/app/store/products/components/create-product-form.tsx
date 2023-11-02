import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SelectForm } from './select-type';
import { useLoading } from '@/components/admin/is-loading';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import React, { useState } from 'react';
import UploadZone from './upload-zone';
import { v4 as uuidv4 } from 'uuid';
export function CreateProductForm({
  tableData,
  setTableData,
}: any) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const FormSchema = z.object({
    name: z.string({
      required_error: 'O nome é obrigatório',
    }),
    referenceId: z.string({
      required_error: 'O ID de referencia é obrigatório',
    }),
    description: z.string({
      required_error: 'O descrição é obrigatória',
    }),
    inStock: z.string({
      required_error: 'O estoque é obrigatório',
    }),
    price: z.string({
      required_error: 'O preço é obrigatório',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isLoading, setIsLoading } = useLoading();

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    setIsLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;
      const image: any = uploadedFile;

      console.log(image);

      if (image) {
        const formData = new FormData();

        const uuid: string = uuidv4();

        formData.append('file', image);

        const imageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bucket`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(imageResponse.status);
        if (imageResponse.status == 201) {
          const imageUrl = await imageResponse.text();

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/`,
            {
              method: 'POST',
              body: JSON.stringify({
                ...data,
                image: imageUrl,
              }),
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
                'Erro ao adicionar produto. Tente novamente.',
              variant: 'destructive',
              description: responseData.message,
            });
            return;
          }

          setTableData([...tableData, responseData]);

          toast({
            title: 'Produto adicionado com sucesso!',
            variant: 'default',
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao adicionar produto.',
        variant: 'destructive',
      });
    }
    document.getElementById('close')?.click();

    setTimeout(() => {
      form.reset();
      setUploadedFile(null);
      setIsLoading(false);
    }, 300);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Sheet>
          <SheetTrigger
            id="open-create-form"
            className="hidden"
          ></SheetTrigger>
          <SheetContent
            side={'left'}
            className="w-auto max-w-none"
          >
            <SheetHeader>
              <SheetTitle>Criar produto</SheetTitle>
              <SheetDescription>
                Inseria os dados e em seguida clique em
                salvar.
              </SheetDescription>
            </SheetHeader>
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
                        defaultValue={field.value}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="text"
                        className="text-right"
                      >
                        Descrição*
                      </Label>
                      <Input
                        id="text"
                        onChange={field.onChange}
                        defaultValue={field.value}
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="price"
                        className="text-right"
                      >
                        Preço*
                      </Label>
                      <Input
                        id="price"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="number"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="inStock"
                        className="text-right"
                      >
                        Estoque*
                      </Label>
                      <Input
                        id="inStock"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                        type="number"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="referenceId"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="referenceId"
                        className="text-right"
                      >
                        ID de referencia*
                      </Label>
                      <Input
                        id="referenceId"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="col-span-3"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <UploadZone
              const
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
            />

            <SheetFooter>
              <Button
                type="submit"
                onClick={() => {
                  document
                    .getElementById('submit')
                    ?.click();
                }}
              >
                Salvar
              </Button>
              <SheetClose asChild>
                <Button
                  type="submit"
                  id="close"
                  className="hidden"
                >
                  Salvar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button
          type="submit"
          className="hidden"
          id="submit"
        >
          Salvar
        </Button>
      </form>
      <Toaster />
    </Form>
  );
}

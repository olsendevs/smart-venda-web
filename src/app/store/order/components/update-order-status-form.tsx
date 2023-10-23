import { useLoading } from '@/components/admin/is-loading';
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

import { toast } from '@/components/ui/use-toast';
import { SelectForm } from './select-type';

export function UpdateOrderStatusForm({
  formData,
  setFormData,
  setUpdateData,
}: any) {
  const { setIsLoading } = useLoading();
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem('user') || '',
      ).accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${formData._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            status: formData.status,
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
          title: 'Erro ao editar usuário. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      toast({
        title: 'Usuário editado com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao editar usuário.',
        variant: 'destructive',
      });
    }
    document.getElementById('close')?.click();

    setTimeout(() => {
      setUpdateData(new Date());
      setIsLoading(false);
    }, 300);
  };
  const status: Record<string, string> = {
    created: 'Aguardando pagamento',
    payed: 'Pago',
    onWay: 'A Caminho',
    delivered: 'Entregue',
  };
  return (
    <Sheet key={'left'}>
      <SheetTrigger
        id="open-update-status-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent
        side={'left'}
        className="w-auto max-w-none"
      >
        <SheetHeader>
          <SheetTitle>Alterar status do pedido</SheetTitle>
          <SheetDescription>
            Selecione o status do pedido.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-[30vw]">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              Status do pedido
            </Label>
            <SelectForm
              value={formData.status}
              defaultValue={formData.status}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  status: e,
                });
              }}
            />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={onSubmit}>
              Salvar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

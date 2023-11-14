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
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function EditOrderForm({
  formData,
  setFormData,
  setUpdateData,
}: any) {
  const status: Record<string, string> = {
    created: 'Aguardando pagamento',
    payed: 'Pago',
    onWay: 'A Caminho',
    delivered: 'Entregue',
  };
  return (
    <Sheet>
      <SheetTrigger
        id="open-edit-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>Detalhes do pedido</SheetTitle>
          <SheetDescription>
            Só é possivel visualizar as informações.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-[30vw]">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              ID do pedido
            </Label>
            <Input
              placeholder={formData._id}
              disabled={true}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              Nome do cliente
            </Label>
            <Input
              placeholder={formData.customerId.name}
              defaultValue={formData.customerId.name}
              disabled={false}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              WhatsApp do cliente
            </Label>
            <Input
              placeholder={formData.customerId.whatsapp}
              defaultValue={formData.customerId.whatsapp}
              disabled={false}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              E-mail do cliente
            </Label>
            <Input
              placeholder={formData.customerId.email}
              defaultValue={formData.customerId.email}
              disabled={false}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              Status do pedido
            </Label>
            <Input
              placeholder={status[formData.status]}
              defaultValue={status[formData.status]}
              disabled={true}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              Valor total do pedido
            </Label>
            <Input
              placeholder={formData.totalPrice}
              defaultValue={formData.totalPrice}
              disabled={true}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="_id" className="text-right">
              Endereço
            </Label>
            <Textarea
              placeholder={formData.customerId.address}
              defaultValue={formData.customerId.address}
              disabled={false}
              className="col-span-3"
            />
          </div>
        </div>

        <SheetFooter>
          <div className="w-full flex-column items-center text-center">
            <h1 className="items-center">
              Items comprados
            </h1>
            <div>
              {formData.items.map((item: any) => {
                return (
                  <Card
                    key={item.productId._id}
                    className="p-2 mr-20 ml-20 mt-5 mb-4"
                  >
                    <CardTitle className="mt-4">
                      {item.productId.name}
                    </CardTitle>
                    <CardDescription>
                      {item.productId.description}
                    </CardDescription>
                    <CardContent className="mt-5">
                      <h4>
                        Código de referencia:
                        {item.referenceId}
                      </h4>
                      <h4>Preço: {item.productId.price}</h4>
                      <h4>Quantidade: {item.qtd}</h4>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

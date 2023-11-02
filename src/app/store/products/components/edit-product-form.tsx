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

export function EditProductForm({
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
        `${process.env.NEXT_PUBLIC_API_URL}/product/${formData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            storeId: formData.storeId,
            referenceId: formData.referenceId,
            name: formData.name,
            description: formData.description,
            inStock: formData.inStock,
            image: formData.image,
            price: formData.price,
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
          title: 'Erro ao editar produto. Tente novamente.',
          variant: 'destructive',
          description: responseData.message,
        });
        return;
      }

      toast({
        title: 'Produto editado com sucesso!',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Erro ao editar produto.',
        variant: 'destructive',
      });
    }
    document.getElementById('close')?.click();

    setTimeout(() => {
      setUpdateData(new Date());
      setIsLoading(false);
    }, 300);
  };

  return (
    <Sheet>
      <SheetTrigger
        id="open-edit-form"
        className="hidden"
      ></SheetTrigger>
      <SheetContent className="w-auto max-w-none">
        <SheetHeader>
          <SheetTitle>Editar produto</SheetTitle>
          <SheetDescription>
            Edite os dados e em seguida clique em salvar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-[20vw]">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  storeId: formData.storeId,
                  name: e.target.value,
                  description: formData.description,
                  referenceId: formData.referenceId,
                  inStock: formData.inStock,
                  image: formData.image,
                  price: formData.price,
                  id: formData.id,
                });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right"
            >
              Descrição
            </Label>
            <Input
              value={formData.description}
              onChange={(e) => {
                setFormData({
                  storeId: formData.storeId,
                  name: formData.name,
                  description: e.target.value,
                  inStock: formData.inStock,
                  image: formData.image,
                  referenceId: formData.referenceId,
                  price: formData.price,
                  id: formData.id,
                });
              }}
              id="edit-description"
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inStock" className="text-right">
              Em estoque
            </Label>
            <Input
              value={formData.inStock}
              onChange={(e) => {
                setFormData({
                  storeId: formData.storeId,
                  name: formData.name,
                  description: formData.description,
                  referenceId: formData.referenceId,
                  inStock: e.target.value,
                  image: formData.image,
                  price: formData.price,
                  id: formData.id,
                });
              }}
              id="edit-inStock"
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input
              value={formData.price}
              onChange={(e) => {
                setFormData({
                  storeId: formData.storeId,
                  name: formData.name,
                  description: formData.description,
                  referenceId: formData.referenceId,
                  inStock: formData.inStock,
                  image: formData.image,
                  price: e.target.value,
                  id: formData.id,
                });
              }}
              id="edit-price"
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              ID de referencia
            </Label>
            <Input
              value={formData.referenceId}
              onChange={(e) => {
                setFormData({
                  storeId: formData.storeId,
                  name: formData.name,
                  description: formData.description,
                  referenceId: e.target.value,
                  inStock: formData.inStock,
                  image: formData.image,
                  price: formData.price,
                  id: formData.id,
                });
              }}
              id="edit-image"
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Link da imagem
            </Label>
            <Input
              value={formData.image}
              onChange={(e) => {
                setFormData({
                  storeId: formData.storeId,
                  name: formData.name,
                  description: formData.description,
                  referenceId: formData.referenceId,
                  inStock: formData.inStock,
                  image: e.target.value,
                  price: formData.price,
                  id: formData.id,
                });
              }}
              id="edit-image"
              className="col-span-3"
              type="text"
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

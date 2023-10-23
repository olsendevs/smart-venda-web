'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useLoading } from '@/components/admin/is-loading';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export function Dropdown({
  order,
  setEditFormData,
  tableData,
  setTableData,
}: any) {
  const { setIsLoading } = useLoading();

  function editOrder(order: any) {
    setEditFormData(() => ({
      _id: order._id,
      items: order.items,
      customerId: order.customerId,
      storeId: order.storeId,
      status: order.status,
      totalPrice: order.totalPrice,
      paymentType: order.paymentType,
    }));

    document.getElementById('open-edit-form')?.click();

    return;
  }

  const handleUpdateStatus = (order: any) => {
    setEditFormData(() => ({
      _id: order._id,
      items: order.items,
      customerId: order.customerId,
      storeId: order.storeId,
      status: order.status,
      totalPrice: order.totalPrice,
      paymentType: order.paymentType,
    }));

    document
      .getElementById('open-update-status-form')
      ?.click();

    return;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Ações no pedido
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              editOrder(order);
            }}
          >
            Ver detalhes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleUpdateStatus(order);
            }}
          >
            Alterar Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

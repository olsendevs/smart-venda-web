'use client';

import { ColumnDef } from '@tanstack/react-table';

import React from 'react';
import { Dropdown } from './dropdown';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Order } from '@/types/order';
import { Badge } from '@/components/ui/badge';

export function columns({
  setEditFormData,
  tableData,
  setTableData,
}: any): ColumnDef<Order>[] {
  return [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            ID do pedido
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'customerId.name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            Nome do cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start ml-4">
            {row.original?.customerId.name}
          </div>
        );
      },
    },
    {
      accessorKey: 'totalPrice',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            Valor total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start ml-4">
            {`R$${row.original?.totalPrice}`}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === 'asc',
              )
            }
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const names: Record<string, string> = {
          created: 'Aguardando pagamento',
          payed: 'Pago',
          onWay: 'A Caminho',
          delivered: 'Entregue',
        };
        const item = row.getValue('status') as any;
        const result = names[item] as any;
        return (
          <div className="text-start ml-6">
            <Badge variant={'default'}>{result}</Badge>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;

        return (
          <Dropdown
            order={order}
            setEditFormData={setEditFormData}
            setTableData={setTableData}
            tableData={tableData}
          />
        );
      },
    },
  ];
}

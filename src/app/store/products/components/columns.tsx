'use client';

import { Product } from '@/types/product';

import { ColumnDef } from '@tanstack/react-table';

import React from 'react';
import { Dropdown } from './dropdown';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export function columns({
  setEditFormData,
  tableData,
  setTableData,
}: any): ColumnDef<Product>[] {
  return [
    {
      accessorKey: 'referenceId',
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
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'name',
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
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start ml-4">
            {row.getValue('name')}
          </div>
        );
      },
    },
    {
      accessorKey: 'inStock',
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
            Quantidade em estoque
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start ml-24">
            {row.getValue('inStock')}
          </div>
        );
      },
    },
    {
      accessorKey: 'price',
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
            Preço
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start ml-5">
            {`R$${row.getValue('price')}`}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <Dropdown
            product={product}
            setEditFormData={setEditFormData}
            setTableData={setTableData}
            tableData={tableData}
          />
        );
      },
    },
  ];
}

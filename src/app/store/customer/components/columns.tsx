'use client'

import { Customer } from '@/types/customer'

import { ColumnDef } from '@tanstack/react-table'

import React from 'react'
import { Dropdown } from './dropdown'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

export function columns({
  setEditFormData,
  tableData,
  setTableData,
}: any): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            className="w-44"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            className="w-44"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-start ml-4">{row.getValue('name')}</div>
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            className="w-44"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'whatsapp',
      header: ({ column }) => {
        return (
          <Button
            className="w-44"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            WhatsApp
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-start ml-4">{row.getValue('whatsapp')}</div>
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const customer = row.original

        return (
          <Dropdown
            customer={customer}
            setEditFormData={setEditFormData}
            setTableData={setTableData}
            tableData={tableData}
          />
        )
      },
    },
  ]
}

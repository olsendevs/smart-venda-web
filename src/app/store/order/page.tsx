'use client';

import React from 'react';
import { DataTable } from './components/data-table';

import { columns } from './components/columns';
import 'dotenv/config';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { UpdateOrderStatusForm } from './components/update-order-status-form';
import { EditOrderForm } from './components/edit-order-form';
import { create } from 'domain';
import { Metrics } from './components/metrics';

export default function Order() {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateData, setUpdateData] = React.useState(
    new Date(),
  );

  const [editFormData, setEditFormData] = React.useState({
    items: [],
    customerId: '',
    storeId: '',
    status: '',
    totalPrice: '',
    paymentType: '',
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '',
        ).accessToken;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const responseData = await response.json();

        setTableData(responseData);
      } catch (error) {
        console.error('Error:', error);
        setTableData([]);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    fetchData();
  }, [updateData]);

  return (
    <main className="pt-20 pl-5">
      <h1 className="pb-2">Pedidos</h1>
      <Metrics data={tableData} />
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <UpdateOrderStatusForm
        formData={editFormData}
        setFormData={setEditFormData}
        setUpdateData={setUpdateData}
      />
      <div>
        <EditOrderForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  );
}

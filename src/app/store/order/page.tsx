'use client'

import React, { useContext } from 'react'
import { DataTable } from './components/data-table'

import { columns } from './components/columns'
import 'dotenv/config'
import { LoadingSpinner } from '@/components/admin/loading-spinner'
import { UpdateOrderStatusForm } from './components/update-order-status-form'
import { EditOrderForm } from './components/edit-order-form'
// import { create } from 'domain'
import { Metrics } from './components/metrics'
import { useSearchParams } from 'next/navigation'
import { MetricsDataTypes } from '@/types/order'
import useAdmin from '@/hooks/admin/useAdmin'
import { ViewCustomerContext } from '@/contexts/view-customer-context'
import IsViewingACustomer from '@/components/store/is-viewing-a-customer'
import { user } from '@/constants/user'
import { customers } from '@/constants/customers'

export default function Order() {
  const { isViewingACustomer, viewCustomer, saveCustomer, customerData } =
    useContext(ViewCustomerContext)
  const { customerIsViwedAsAdmin } = useAdmin()

  const searchParams = useSearchParams()
  const customerId = searchParams.get('customerId')

  const [tableData, setTableData] = React.useState<[]>([])
  const [metricsData, setMetricsData] = React.useState<MetricsDataTypes[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [updateData, setUpdateData] = React.useState(new Date())

  const [editFormData, setEditFormData] = React.useState({
    items: [],
    customerId: '',
    storeId: '',
    status: '',
    totalPrice: '',
    paymentType: '',
  })

  React.useEffect(() => {
    async function fetchData() {
      // ALERT - disabled until back-end works again
      // const user = JSON.parse(localStorage.getItem('user') || '')
      const token = user?.accessToken

      const existingMetricsData = await customerIsViwedAsAdmin({
        admin: user,
        customerId: Number(customerId),
        customers,
      })

      try {
        if (!existingMetricsData.isAdmin) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/order/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const responseData = await response.json()

          setTableData(responseData)
        }

        if (existingMetricsData.metrics && existingMetricsData.customer) {
          setMetricsData(existingMetricsData.metrics)
          saveCustomer(existingMetricsData.customer)
          viewCustomer(true)
        }
      } catch (error) {
        console.error('Error:', error)
        setTableData([])
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    fetchData()
  }, [updateData])

  return (
    <main className="pt-20 pl-5 mm:pl-0">
      {isViewingACustomer ? (
        <IsViewingACustomer name={customerData?.name as string} />
      ) : null}

      <h1 className="pb-2">Pedidos</h1>

      {/* tableData */}
      <Metrics data={metricsData} />

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
  )
}

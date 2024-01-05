'use client'

import React, { useContext } from 'react'
import { DataTable } from './components/data-table'
import { Customer } from '@/types/customer'
import { columns } from './components/columns'
import 'dotenv/config'
import { LoadingSpinner } from '@/components/admin/loading-spinner'
import { CreateCustomerForm } from './components/create-customer-form'
import { EditCustomerForm } from './components/edit-customer-form'
import IsViewingACustomer from '@/components/store/is-viewing-a-customer'
import { ViewCustomerContext } from '@/contexts/view-customer-context'
import useAdmin from '@/hooks/admin/useAdmin'
// import { create } from 'domain'

export default function Customer() {
  const { isViewingACustomer, customerData, saveCustomer, viewCustomer } =
    useContext(ViewCustomerContext)
  const { customerIsViwedAsAdmin } = useAdmin()

  const [tableData, setTableData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [updateData, setUpdateData] = React.useState(new Date())

  const [editFormData, setEditFormData] = React.useState({
    name: '',
    email: '',
    type: '',
  })

  React.useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('user') || '')
      const token = user?.accessToken

      const existingMetricsData = await customerIsViwedAsAdmin({
        admin: user,
      })

      try {
        if (!existingMetricsData.isAdmin) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customer/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const responseData = await response.json()

          setTableData(responseData)
        } else if (
          existingMetricsData.isAdmin &&
          existingMetricsData.userViewedByAdmin
        ) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/find-clients/${existingMetricsData?.userViewedByAdmin._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const responseData = await response.json()

          const customerData = {
            _id: existingMetricsData.userViewedByAdmin._id,
            name: existingMetricsData.userViewedByAdmin.name,
          }

          saveCustomer(customerData)
          viewCustomer(true)
          setTableData(responseData?.customers)
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

      <h1 className="pb-2">Clientes</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />
      <CreateCustomerForm tableData={tableData} setTableData={setTableData} />
      <div>
        <EditCustomerForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  )
}

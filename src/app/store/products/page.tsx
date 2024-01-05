'use client'

import React, { useContext } from 'react'
import { DataTable } from './components/data-table'
import { Product } from '@/types/product'
import { columns } from './components/columns'
import 'dotenv/config'
import { LoadingSpinner } from '@/components/admin/loading-spinner'
import { CreateProductForm } from './components/create-product-form'
import { EditProductForm } from './components/edit-product-form'
import useAdmin from '@/hooks/admin/useAdmin'
import { ViewCustomerContext } from '@/contexts/view-customer-context'
import IsViewingACustomer from '@/components/store/is-viewing-a-customer'

export default function Product() {
  const { isViewingACustomer, customerData, viewCustomer, saveCustomer } =
    useContext(ViewCustomerContext)
  const { customerIsViwedAsAdmin } = useAdmin()

  const [tableData, setTableData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [updateData, setUpdateData] = React.useState(new Date())

  const [editFormData, setEditFormData] = React.useState({
    storeId: '',
    referenceId: '',
    name: '',
    description: '',
    inStock: '',
    image: '',
    price: '',
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
            `${process.env.NEXT_PUBLIC_API_URL}/product/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const responseData = await response.json()

          setTableData(responseData)
        } else if (existingMetricsData.userViewedByAdmin) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/find-products/${existingMetricsData.userViewedByAdmin._id}`,
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

          setTableData(responseData)
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

      <h1 className="pb-2">Produtos</h1>
      <DataTable
        columns={columns({
          editFormData,
          setEditFormData,
          tableData,
          setTableData,
        })}
        data={tableData}
      />

      <CreateProductForm tableData={tableData} setTableData={setTableData} />

      <div>
        <EditProductForm
          formData={editFormData}
          setFormData={setEditFormData}
          setUpdateData={setUpdateData}
        />
      </div>
      <LoadingSpinner visible={isLoading} />
    </main>
  )
}

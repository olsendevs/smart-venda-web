'use client'

import React, { useContext } from 'react'

import 'dotenv/config'
import { LoadingSpinner } from '@/components/admin/loading-spinner'
import Store from './components/store'
import Integration from './components/integration'
import { ViewCustomerContext } from '@/contexts/view-customer-context'
import useAdmin from '@/hooks/admin/useAdmin'

import IsViewingACustomer from '@/components/store/is-viewing-a-customer'

export default function Configurations() {
  const { isViewingACustomer, customerData, saveCustomer, viewCustomer } =
    useContext(ViewCustomerContext)
  const { customerIsViwedAsAdmin } = useAdmin()

  const [isLoading, setIsLoading] = React.useState(false)
  const [store, setStore] = React.useState({
    name: undefined,
    _id: undefined,
    cnpj: undefined,
    helpMessage: undefined,
    payment: {
      method: 'confirmation',
      apiKey: '',
    },
  })
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const user = JSON.parse(localStorage.getItem('user') || '')
      const token = user?.accessToken

      const existingMetricsData = await customerIsViwedAsAdmin({
        admin: user,
      })

      try {
        if (!existingMetricsData.isAdmin) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/store/by-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const responseData = await response.json()

          if (!responseData._id) {
            const createdStore = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/store`,
              {
                method: 'POST',
                body: JSON.stringify({
                  name: ' ',
                  cnpj: ' ',
                  userId: user.id,
                  payment: {
                    method: 'confirmation',
                    apiKey: '',
                  },
                }),
                headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            )

            setStore(await createdStore.json())
          } else {
            setStore(responseData)
          }
        } else if (
          existingMetricsData.isAdmin &&
          existingMetricsData.userViewedByAdmin
        ) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/find-user-store-info/${existingMetricsData?.userViewedByAdmin?._id}`,
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

          setStore(responseData)
          saveCustomer(customerData)
          viewCustomer(true)
        }
      } catch (error) {
        console.error('Error:', error)
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    fetchData()
  }, [])
  return (
    <main className="w-full pt-20 flex flex-col">
      {isViewingACustomer ? (
        <IsViewingACustomer name={customerData?.name as string} />
      ) : null}

      <div className="w-full mt-2 flex mm:flex-col md:flex-row w-[55vw] mr-auto ml-auto mm:gap-2 lg:gap-4">
        <Store storeData={store} setStoreData={setStore} />
        <Integration storeData={store} setStoreData={setStore} />
        <LoadingSpinner visible={isLoading} />
      </div>
    </main>
  )
}

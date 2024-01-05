'use client'
import React, { useContext, useEffect, useState } from 'react'
import 'dotenv/config'
import Widget from './components/widget'
import { MdSignalWifi3BarLock } from 'react-icons/md'
import IsViewingACustomer from '@/components/store/is-viewing-a-customer'
import useAdmin from '@/hooks/admin/useAdmin'
import { ViewCustomerContext } from '@/contexts/view-customer-context'

export default function User() {
  const { isViewingACustomer, customerData, saveCustomer, viewCustomer } =
    useContext(ViewCustomerContext)
  const { customerIsViwedAsAdmin } = useAdmin()

  const [status, setStatus] = useState(false)

  const handlerUpdateStatus = (value: any) => {
    setStatus(value)
  }

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('user') || '')
      const token = user?.accessToken

      const existingMetricsData = await customerIsViwedAsAdmin({
        admin: user,
      })
      try {
        if (existingMetricsData.userViewedByAdmin) {
          const customerData = {
            _id: existingMetricsData.userViewedByAdmin._id,
            name: existingMetricsData.userViewedByAdmin.name,
          }

          saveCustomer(customerData)
          viewCustomer(true)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="pt-20 pl-5 text-center mm:pl-0">
      {isViewingACustomer ? (
        <IsViewingACustomer name={customerData?.name as string} />
      ) : null}

      <div
        style={{ marginTop: 20 }}
        className="flex flex-col  justify-between space-y-4"
      >
        <Widget
          icon={<MdSignalWifi3BarLock className="h-10 w-10" />}
          status={status}
          handlerUpdateStatus={handlerUpdateStatus}
        />
      </div>
    </main>
  )
}

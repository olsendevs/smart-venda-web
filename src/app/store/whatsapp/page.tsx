'use client'
import React, { useContext, useEffect, useState } from 'react'
import 'dotenv/config'
import Widget from './components/widget'
import { MdSignalWifi3BarLock } from 'react-icons/md'
import IsViewingACustomer from '@/components/store/is-viewing-a-customer'
import useAdmin from '@/hooks/admin/useAdmin'
import { ViewCustomerContext } from '@/contexts/view-customer-context'
import { customers } from '@/constants/customers'
import { user } from '@/constants/user'

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
      try {
        const existingMetricsData = await customerIsViwedAsAdmin({
          admin: user,
          customerId: isViewingACustomer
            ? (customerData?.id as number)
            : undefined,
          customers,
        })

        if (existingMetricsData.metrics && existingMetricsData.customer) {
          saveCustomer(existingMetricsData.customer)
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

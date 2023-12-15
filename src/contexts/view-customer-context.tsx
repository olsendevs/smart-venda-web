/* eslint-disable @typescript-eslint/no-empty-function */
import { CustomersProps } from '@/types/order'
import { ReactNode, createContext, useState } from 'react'

type ViewCustomerContextProps = {
  isViewingACustomer: boolean
  getViewCustomer: () => boolean
  viewCustomer: (value: boolean) => void
  customerData: CustomersProps | null
  saveCustomer: (data: CustomersProps) => void
  finishCustomerView: () => boolean
}

type ViewCustomerProviderProps = {
  children: ReactNode
}

const initialState = {
  isViewingACustomer: false,
  getViewCustomer: () => false,
  viewCustomer: () => {},
  customerData: null,
  saveCustomer: () => {},
  finishCustomerView: () => false,
}

export const ViewCustomerContext =
  createContext<ViewCustomerContextProps>(initialState)

export const ViewCustomerProvider = ({
  children,
}: ViewCustomerProviderProps) => {
  const [isViewingACustomer, setIsViewingACustomer] = useState(false)
  const [customerData, setCustomerData] = useState<CustomersProps | null>(null)

  function getViewCustomer() {
    return isViewingACustomer
  }

  function viewCustomer(value: boolean) {
    setIsViewingACustomer(value)
  }

  function saveCustomer(data: CustomersProps) {
    setCustomerData(data)
  }

  function finishCustomerView() {
    setIsViewingACustomer(false)
    setCustomerData(null)

    return true
  }

  return (
    <ViewCustomerContext.Provider
      value={{
        isViewingACustomer,
        getViewCustomer,
        viewCustomer,
        customerData,
        saveCustomer,
        finishCustomerView,
      }}
    >
      {children}
    </ViewCustomerContext.Provider>
  )
}

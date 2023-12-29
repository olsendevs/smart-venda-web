import { Customer } from './customer'
import { Product } from './product'

export type Order = {
  _id: string
  items: {
    productId: Product
    qtd: number
  }[]
  customerId: Customer
  storeId: string
  status: 'created' | 'payed' | 'onWay' | 'delivered'
  totalPrice: number
  paymentType: 'mercado_pago' | 'confirmation'
}

// Temp
export type AdminProps = {
  type: string
  accessToken: string
}

export type MetricsDataTypes = {
  _id: number
  status: string
}

export type CustomersProps = {
  _id: string
  name: string
}

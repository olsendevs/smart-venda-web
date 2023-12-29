import { Customer } from './customer'
import { Product } from './product'

export type OrdersProps = {
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

export type MetricsDataProps = {
  orders: OrdersProps[]
  totalAwaitingPayment: number
  totalDelivered: number
  totalOnWay: number
  totalToSend: number
}

export type MetricsProps = {
  data: MetricsDataProps
}

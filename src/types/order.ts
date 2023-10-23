import { Customer } from './customer';
import { Product } from './product';

export type Order = {
  _id: string;
  items: {
    productId: Product;
    qtd: number;
  }[];
  customerId: Customer;
  storeId: string;
  status: 'created' | 'payed' | 'onWay' | 'delivered';
  totalPrice: number;
  paymentType: 'mercado_pago' | 'confirmation';
};

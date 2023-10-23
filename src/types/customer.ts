export type Customer = {
  _id: string;
  name: string;
  whatsapp: string;
  email?: string;
  storeId: string;
  address: {
    street: string;
    complement: string;
    number: string;
    city: string;
    state: string;
  };
};

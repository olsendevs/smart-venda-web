export type User = {
  name: string;
  email: string;
  password: string;
  whatsapp?: string;
  type: 'admin' | 'store_owner';
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
};

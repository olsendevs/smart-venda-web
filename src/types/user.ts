export type User = {
  _id: string
  name: string
  email: string
  password: string
  whatsapp?: string
  type: 'admin' | 'store_owner'
  createAt: Date
  updateAt: Date
  deleted: boolean
}

export type DrowndownProps = {
  user: User
  setEditFormData: any
  tableData: any
  setTableData: any
}

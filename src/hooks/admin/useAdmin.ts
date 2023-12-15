import { AdminProps, CustomersProps, MetricsDataTypes } from '@/types/order'

type ViewedForAdminProps = {
  admin: AdminProps
  customerId?: number
  customers: CustomersProps[]
}

type ViewedForAdminResponse = {
  isAdmin: boolean
  metrics?: MetricsDataTypes[]
  customer?: CustomersProps
}

function useAdmin() {
  async function customerIsViwedAsAdmin({
    admin,
    customerId,
    customers,
  }: ViewedForAdminProps): Promise<ViewedForAdminResponse> {
    // validate if admin is admin
    const isAdmin = admin.type === 'admin'

    if (!isAdmin || !customerId) {
      return {
        isAdmin: false,
      }
    }

    const customer = customers.filter((customer) => customer.id === customerId)

    const metrics = customer[0].data

    // customerAlreadyViewedAsAdmin

    return {
      isAdmin: true,
      metrics,
      customer: customer[0],
    }
  }

  return {
    customerIsViwedAsAdmin,
  }
}

export default useAdmin

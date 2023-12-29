import { AdminProps } from '@/types/order'
import { User } from '@/types/user'

type ViewedForAdminProps = {
  admin: AdminProps
}

type ViewedForAdminResponse = {
  isAdmin: boolean
  userViewedByAdmin?: User
}

function useAdmin() {
  async function customerIsViwedAsAdmin({
    admin,
  }: ViewedForAdminProps): Promise<ViewedForAdminResponse> {
    const isAdmin = admin.type === 'admin'

    if (!isAdmin) {
      return {
        isAdmin: false,
      }
    }

    const data = localStorage.getItem('@admin:viewed-user')
    const viewedUserData = JSON.parse(data || '{}')

    console.log('viewedUserData', viewedUserData)

    return {
      isAdmin: true,
      userViewedByAdmin: viewedUserData,
    }
  }

  return {
    customerIsViwedAsAdmin,
  }
}

export default useAdmin

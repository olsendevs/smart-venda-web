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

    const viewedUserData = JSON.parse(
      localStorage.getItem('@admin:viewed-user') || '',
    )

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

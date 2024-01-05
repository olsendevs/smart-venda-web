'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useLoading } from '@/components/admin/is-loading'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { useRouter } from 'next/navigation'
import { DrowndownProps } from '@/types/user'

export function Dropdown({
  user,
  setEditFormData,
  tableData,
  setTableData,
}: DrowndownProps) {
  const router = useRouter()

  const { setIsLoading } = useLoading()
  function openDashboard(id: string) {
    localStorage.setItem('@admin:viewed-user', JSON.stringify(user))
    router.push(`/store/order?customerId=${id}`)
  }

  async function deleteUser(id: any) {
    setIsLoading(true)
    setEditFormData({
      name: '',
      email: '',
      type: '',
    })

    try {
      const token = JSON.parse(localStorage.getItem('user') || '').accessToken
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 500 || response.status === 400) {
        toast({
          title: 'Erro ao deletar usuário. Tente novamente.',
          variant: 'destructive',
        })
        return
      }

      const tableDataWithoutDeleted = tableData.filter((x: any) => x._id !== id)

      setTableData(tableDataWithoutDeleted)
    } catch (error) {
      console.error('Error:', error)
    }
    setTimeout(() => {
      toast({
        title: 'Usuário deletado com sucesso!',
        variant: 'destructive',
      })
      setIsLoading(false)
    }, 300)
  }

  function editUser(user: any) {
    setEditFormData(() => ({
      name: user.name,
      email: user.email,
      type: user.type,
      id: user._id,
    }))

    document.getElementById('open-edit-form')?.click()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações no usuário</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.email)}
          >
            Copiar e-mail
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.type === 'store_owner' ? (
            <DropdownMenuItem onClick={() => openDashboard(user._id)}>
              Abrir dashboard
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem onClick={() => editUser(user)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteUser(user._id)}>
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

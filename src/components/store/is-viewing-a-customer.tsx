import { ViewCustomerContext } from '@/contexts/view-customer-context'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

type IsViewingACustomerProps = {
  name: string
}

export default function IsViewingACustomer({ name }: IsViewingACustomerProps) {
  const router = useRouter()
  const { finishCustomerView } = useContext(ViewCustomerContext)

  const [isLoading, setIsLoading] = useState(false)

  function endOfViewing() {
    setIsLoading(true)

    const isFinished = finishCustomerView()

    if (isFinished) {
      setIsLoading(false)
      router.push('/admin/user')
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-4 w-max h-10 rounded-3xl pl-4 pr-2 py-1 mb-4 bg-red-700">
        <span>
          {isLoading
            ? 'Encerrando visualização'
            : `Você está visualizando o cliente ${name}`}
        </span>
        <button
          className="rounded-full bg-red-800 px-4 ml-1 h-full text-sm"
          onClick={endOfViewing}
        >
          Sair
        </button>
      </div>
    </div>
  )
}

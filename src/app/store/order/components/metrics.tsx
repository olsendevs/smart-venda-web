'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { MetricsProps } from '@/types/metrics'
import { useEffect, useState } from 'react'

export function Metrics({ data }: MetricsProps) {
  const [ordersData, setOrdersData] = useState({
    created: 0,
    payed: 0,
    onway: 0,
    delivered: 0,
  })

  useEffect(() => {
    const created = data?.filter((e) => e.status === 'created')
    const payed = data?.filter((e) => e.status === 'payed')
    const onWay = data?.filter((e) => e.status === 'onWay')
    const delivered = data?.filter((e) => e.status === 'delivered')

    setOrdersData({
      created: created?.length,
      payed: payed?.length,
      onway: onWay?.length,
      delivered: delivered?.length,
    })
  }, [data])
  return (
    <div className="grid space-x-4 items-center mm:grid-rows-1 mm:gap-2 mm:space-x-0 lg:grid-cols-4">
      <Card className="flex flex-col p-4 text-center mm:w-full h-full justify-center items-center">
        <CardTitle>Pedidos concluidos</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent className="flex flex-col p-0 justify-center items-center">
          <h3 className="font-bold lg:text-5xl mm:text-3xl">
            {ordersData.delivered}
          </h3>
        </CardContent>
      </Card>
      <Card className="flex flex-col p-4 text-center mm:w-full h-full justify-center items-center">
        <CardTitle>Pedidos aguardando pagamento</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent className="flex flex-col p-0 justify-center items-center">
          <h3 className="font-bold lg:text-5xl mm:text-3xl">
            {ordersData.created}
          </h3>
        </CardContent>
      </Card>
      <Card className="flex flex-col p-4 text-center mm:w-full h-full justify-center items-center">
        <CardTitle>Pedidos prontos para enviar</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent className="flex flex-col p-0 justify-center items-center">
          <h3 className="font-bold lg:text-5xl mm:text-3xl">
            {ordersData.payed}
          </h3>
        </CardContent>
      </Card>
      <Card className="flex flex-col p-4 text-center mm:w-full h-full justify-center items-center">
        <CardTitle>Pedidos a caminho</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent className="flex flex-col p-0 justify-center items-center">
          <h3 className="font-bold lg:text-5xl mm:text-3xl">
            {ordersData.onway}
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}

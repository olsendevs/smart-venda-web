'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

export function Metrics({ data }: any) {
  const [ordersData, setOrdersData] = useState({
    created: 0,
    payed: 0,
    onway: 0,
    delivered: 0,
  });

  useEffect(() => {
    const created = data.filter(
      (e: any) => e.status == 'created',
    );
    const payed = data.filter(
      (e: any) => e.status == 'payed',
    );
    const onWay = data.filter(
      (e: any) => e.status == 'onWay',
    );
    const delivered = data.filter(
      (e: any) => e.status == 'delivered',
    );
    setOrdersData({
      created: created.length,
      payed: payed.length,
      onway: onWay.length,
      delivered: delivered.length,
    });
  }, [data]);
  return (
    <div className="flex space-x-4 items-center">
      <Card className="pt-4 pl-4 pr-4 text-center">
        <CardTitle>Pedidos concluidos</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent>
          <h3 className="font-bold text-5xl">
            {ordersData.delivered}
          </h3>
        </CardContent>
      </Card>
      <Card className="pt-4 pl-4 pr-4 text-center">
        <CardTitle>Pedidos aguardando pagamento</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent>
          <h3 className="font-bold text-5xl">
            {ordersData.created}
          </h3>
        </CardContent>
      </Card>
      <Card className="pt-4 pl-4 pr-4 text-center">
        <CardTitle>Pedidos prontos para enviar</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent>
          <h3 className="font-bold text-5xl">
            {ordersData.payed}
          </h3>
        </CardContent>
      </Card>
      <Card className="pt-4 pl-4 pr-4 text-center">
        <CardTitle>Pedidos a caminho</CardTitle>
        <CardDescription>até o momento</CardDescription>
        <CardContent>
          <h3 className="font-bold text-5xl">
            {ordersData.onway}
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}

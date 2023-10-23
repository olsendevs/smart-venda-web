'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectForm({ value, onChange }: any) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="created">
          Aguardando pagamento
        </SelectItem>
        <SelectItem value="payed">Pago</SelectItem>
        <SelectItem value="onWay">A Caminho</SelectItem>
        <SelectItem value="delivered">Entregue</SelectItem>
      </SelectContent>
    </Select>
  );
}

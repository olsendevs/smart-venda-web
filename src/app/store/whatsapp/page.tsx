'use client';
import React, { useState } from 'react';
import 'dotenv/config';
import Widget from './components/widget';
import { MdSignalWifi3BarLock } from 'react-icons/md';

export default function User() {
  const [status, setStatus] = useState(false);

  const handlerUpdateStatus = (value: any) => {
    setStatus(value);
  };

  return (
    <main className="pt-20 pl-5 text-center ">
      <div
        style={{ marginTop: 20 }}
        className="flex flex-col  justify-between space-y-4"
      >
        <Widget
          icon={
            <MdSignalWifi3BarLock className="h-10 w-10" />
          }
          status={status}
          handlerUpdateStatus={handlerUpdateStatus}
        />
      </div>
    </main>
  );
}

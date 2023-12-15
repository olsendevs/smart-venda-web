'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    // ALERT - disabled until back-end works again
    // const user = JSON.parse(localStorage.getItem('user') || '')
    const user = {
      type: 'user',
    }
    if (user?.type === 'admin') {
      router.push('/admin/user')
    } else {
      router.push('/store/order')
    }
  }, [])

  return <></>
}

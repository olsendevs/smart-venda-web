import { HiMenu } from 'react-icons/hi'
import { IoMenu } from 'react-icons/io5'
import { AiOutlineClose } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu'
import { ModeToggle } from '../admin/mode-toggle'
import { navigationMenuTriggerStyle } from '../ui/navigation-menu'

interface MenuMobileProps {
  linkClick: () => void
  logout: () => void
}

export default function MenuMobile({ linkClick, logout }: MenuMobileProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isApple, setIsApple] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      setIsApple(true)
    }
  }, [])

  const handleSelectedMenu = () => {
    setMenuOpen(false)
  }

  const handleLinkClick = () => {
    linkClick()
  }

  return (
    <div className="mm:flex lg:hidden">
      <Button
        className="p-0"
        variant="ghost"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <IoMenu className="h-7 w-7" />
      </Button>

      <div
        className={
          menuOpen
            ? 'flex flex-col fixed left-0 top-0 w-[65%] sm:hidden h-screen p-10 ease-in duration-500 shadow-lg bg-background z-50'
            : 'flex flex-col fixed left-[-100%] h-screen top-0 p-10 ease-in duration-500 shadow-lg z-50'
        }
      >
        <div className="flex w-full items-center justify-end">
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AiOutlineClose className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex-col py-6">
          <ul>
            <Link href="/store/order">
              <li
                className="text-base font-medium transition-colors py-4"
                onClick={handleSelectedMenu}
              >
                Pedidos
              </li>
            </Link>
            <Link href="/store/products">
              <li
                className="text-base font-medium transition-colors py-4"
                onClick={handleSelectedMenu}
              >
                Produtos
              </li>
            </Link>
            <Link href="/store/customer">
              <li
                className="text-base font-medium transition-colors py-4"
                onClick={handleSelectedMenu}
              >
                Clientes
              </li>
            </Link>
            <Link href="/store/whatsapp">
              <li
                className="text-base font-medium transition-colors py-4"
                onClick={handleSelectedMenu}
              >
                Conexão WhatsApp
              </li>
            </Link>
            <Link href="/store/configuration">
              <li
                className="text-base font-medium transition-colors py-4"
                onClick={handleSelectedMenu}
              >
                Configurações
              </li>
            </Link>
          </ul>
        </div>

        <div
          className={`flex ${
            isApple ? 'pb-20' : 'pb-0'
          } items-center justify-between space-x-2`}
        >
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem className="ml-auto" onClick={handleLinkClick}>
            <Link href="/auth/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => {
                  logout()
                  window.location.href = '/auth/login'
                }}
              >
                Sair
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
      </div>
    </div>
  )
}

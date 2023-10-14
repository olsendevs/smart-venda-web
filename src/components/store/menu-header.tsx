import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';

import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { useLogout } from '@/hooks/auth/useLogout';
import Link from 'next/link';
import { ModeToggle } from '../admin/mode-toggle';
import { LoadingSpinner } from '../admin/loading-spinner';
import { useLoading } from '../admin/is-loading';

export default function MenuHeader() {
  const { logout } = useLogout();
  const { isLoading, setIsLoading } = useLoading();

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="shadow-lg border-b-1 py-2 border-gray-200 fixed w-full">
      <div className="container mx-auto px-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex">
            <NavigationMenuItem className="mr-10">
              <Link
                href="/store/order"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={''}
                  onClick={handleLinkClick}
                >
                  <div className="py-1.5 relative flex items-center text-lg font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-6 w-6"
                    >
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    SmartVenda
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="mx-1">
              <Link
                href="/store/order"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Pedidos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/store/products"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Produtos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/store/customer"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Clientes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/store/whatsapp"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Conexão WhatsApp
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/store/configuration"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Configurações
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <NavigationMenuItem className="ml-auto">
                <ModeToggle />
              </NavigationMenuItem>
              <NavigationMenuItem
                className="ml-auto"
                onClick={handleLinkClick}
              >
                <Link
                  href="/auth/login"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={() => {
                      logout();
                      console.log('foi');
                      window.location.href = '/auth/login';
                    }}
                  >
                    Sair
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <LoadingSpinner visible={isLoading} />
    </div>
  );
}

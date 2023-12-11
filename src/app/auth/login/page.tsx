import { Metadata } from 'next'
import { UserAuthForm } from './components/user-auth-form'

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center lg:grid lg:max-w-none sm:grid-cols-2 sm:px-0 mm:flex">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex md:flex-none">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
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
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Conhecer a si mesmo é o primeiro passo para compreender o
                universo&rdquo;
              </p>
              <footer className="text-sm">Sócrates</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-18">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:w-[24vw]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="mm:text-2xl sm:text-3xl font-semibold tracking-tight">
                Olá, tudo bem? 😊
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira seu e-mail e sua senha abaixo para acessar o painel
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}

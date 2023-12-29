import { NextResponse, NextRequest } from 'next/server'

import { authRoutes, protectedRoutes } from './router/routes'
import { authService } from './services'

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete('currentUser')
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('currentUser')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/admin/user', request.url))
  }
}

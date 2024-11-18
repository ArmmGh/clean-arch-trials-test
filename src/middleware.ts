import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession } from './actions/admin/utils'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = req.cookies.get('admin-session')?.value

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    const admin = await validateAdminSession(sessionToken)

    if (!admin) {
      const response = NextResponse.redirect(new URL('/admin/login', req.url))
      response.cookies.delete('admin-session')
      return response
    }
  }

  const token = await getToken({ req })

  if (!token || !token.sub) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin',
    '/admin/:path*',
    '/towers/:path*',
    '/saved/:path*',
    '/settings/:path*',
  ],
}

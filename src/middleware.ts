import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const ACCESS_TOKEN = 'access_token'

export const config = {
  matcher: '/'
}

export function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.clone()

  if ('/'.indexOf(currentUrl.pathname) !== -1) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return NextResponse.next()
}

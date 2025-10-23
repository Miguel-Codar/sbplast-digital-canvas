import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''

  // Libera bots legítimos da Meta
  if (
    ua.includes('facebookexternalhit') ||
    ua.includes('Facebot') ||
    ua.includes('WhatsApp') ||
    ua.includes('Instagram')
  ) {
    return NextResponse.next()
  }

  // Continua normalmente para os outros
  return NextResponse.next()
}

// Opcional: define onde o middleware atua
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

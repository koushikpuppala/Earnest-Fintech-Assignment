import { getCookie } from '@import/cookies'
import { SESSION_NAME } from '@import/constants'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
	try {
		const publicRoutes = ['/login', '/register', '/verify']

		const { pathname } = req.nextUrl

		const token = await getCookie(SESSION_NAME)

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!response.ok && !publicRoutes.includes(pathname))
			return NextResponse.redirect(new URL('/login', req.url), {
				headers: {
					getSetCookie: `${SESSION_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Secure`,
				},
			})

		if (response.ok && publicRoutes.includes(pathname)) return NextResponse.redirect(new URL('/', req.url))

		return NextResponse.next()
	} catch (error) {
		process.env.NODE_ENV === 'development' && console.log(error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*||sitemap.xml|robots.txt)',
}

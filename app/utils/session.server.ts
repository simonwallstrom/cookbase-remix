import { createCookieSessionStorage, redirect } from 'remix'
import bcrypt from 'bcrypt'
import { db } from './db.server'
import { User } from '@prisma/client'

type userData = {
  username: string
  password: string
}

export async function login({ username, password }: userData) {
  let user = await db.user.findUnique({ where: { username } })

  if (!user) return null

  let isCorrectPassword = bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) return null

  return user
}

let sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

let storage = createCookieSessionStorage({
  cookie: {
    name: 'cookbase_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function createUserSession(userId: string, redirectTo: string) {
  let session = await storage.getSession()
  session.set('userId', userId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request)
  let userId = session.get('userId')

  if (!userId || typeof userId !== 'string') return null

  return userId
}

export async function getUser(request: Request): Promise<null | Omit<User, 'passwordHash'>> {
  let userId = await getUserId(request)

  if (typeof userId !== 'string') return null

  try {
    let user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (user) {
      const { passwordHash, ...safeUser } = user
      return safeUser
    }
    return user
  } catch {
    throw logout(request)
  }
}

export async function logout(request: Request) {
  let session = await storage.getSession(request.headers.get('Cookie'))

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

export async function requireAuth(request: Request, redirectTo: string = new URL(request.url).pathname) {
  let session = await getUserSession(request)
  let userId = session.get('userId')
  if (!userId || typeof userId !== 'string') {
    let searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }

  return userId
}

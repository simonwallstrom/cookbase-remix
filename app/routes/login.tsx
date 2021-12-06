import { Link, ActionFunction, useSearchParams } from 'remix'
import { createUserSession, login } from '~/utils/session.server'

export let action: ActionFunction = async ({ request }) => {
  let form = await request.formData()
  let username = form.get('username')
  let password = form.get('password')
  let redirectTo = form.get('redirectTo')

  if (typeof username !== 'string' || typeof password !== 'string' || typeof redirectTo !== 'string') {
    return `Form not submitted correctly`
  }

  let user = await login({ username, password })

  if (!user) {
    console.log('no user found...')
    return null
  }

  return createUserSession(user.id, redirectTo)
}

export default function Login() {
  let [searchParams] = useSearchParams()

  return (
    <main className="space-y-3">
      <div>
        <Link to="/recipes">← Back to start page</Link>
      </div>
      <h1 className="text-3xl">Login</h1>
      <form className="mt-6 space-y-4" method="post">
        <input type="hidden" name="redirectTo" value={searchParams.get('redirectTo') ?? '/dashboard'} />
        <label className="flex flex-col space-y-1" htmlFor="username">
          <span>Username</span>
          <input autoFocus className="border dark:bg-gray-900 dark:border-gray-700 p-2" type="text" name="username" />
        </label>
        <label className="flex flex-col space-y-1" htmlFor="password">
          <span>Password</span>
          <input type="password" className="border dark:bg-gray-900 dark:border-gray-700 p-2" name="password" />
        </label>
        <div>
          <button className="w-full dark:bg-gray-800 border dark:border-gray-700 p-2" type="submit">
            Login
          </button>
        </div>
      </form>
    </main>
  )
}

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useTransition } from 'remix'
import type { LinksFunction } from 'remix'

import tailwindUrl from '~/tailwind.css'

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindUrl }]
}

export let meta = () => {
  return {
    title: 'Cookbase · Create, share and organize your favorite recipes',
    description: 'Create, share and organize your favorite recipes',
  }
}

// type safeUser = null | Omit<User, 'passwordHash'>

// export let loader: LoaderFunction = async ({ request }) => {
//   let data = await getUser(request)

//   return data
// }

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

function Document({ children }: { children: React.ReactNode }) {
  let transition = useTransition()
  let isLoading = transition.state === 'loading'

  return (
    <html className="dark:bg-gray-900" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:text-gray-300 text-sm">
        {children}
        {isLoading ? (
          <div className="fixed top-6 right-6">
            <Spinner />
          </div>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

// function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="mx-auto py-24 max-w-xl">
//       <main>{children}</main>
//     </div>
//   )
// }

// function Layout({ children }: { children: React.ReactNode }) {
//   let user = useLoaderData<safeUser>()

//   return (
//     <div className="mx-auto py-24 max-w-xl">
//       {!!user ? <Sidebar user={user} /> : <Header />}
//       <main>{children}</main>
//     </div>
//   )
// }

// function Sidebar({ user }: { user: safeUser }) {
//   return (
//     <nav className="flex mb-12 space-x-6 text-gray-500">
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/dashboard">
//         {user?.username}
//       </NavLink>
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/recipes">
//         Recipes
//       </NavLink>
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/collections">
//         Collections
//       </NavLink>
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/friends">
//         Friends
//       </NavLink>
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/settings">
//         Settings
//       </NavLink>
//     </nav>
//   )
// }

// function Header() {
//   return (
//     <nav className="flex mb-12 space-x-6 text-gray-500">
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/">
//         Cookbase
//       </NavLink>
//       <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/login">
//         Login
//       </NavLink>
//     </nav>
//   )
// }

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <main className="flex flex-col space-y-6 items-center justify-center min-h-full">
        <h1 className="text-3xl">There was an error</h1>
        <p>{error.message}</p>
      </main>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      break
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document>
      <main className="flex flex-col space-y-6 items-center justify-center min-h-full">
        <h1 className="text-3xl">
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </main>
    </Document>
  )
}

export function Spinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 38 38" stroke="#fff">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}

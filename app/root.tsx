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
    <html className="dark:bg-gray-900 min-h-full h-full" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:text-gray-300 min-h-full text-sm">
        {children}
        {isLoading ? (
          <div className="fixed bottom-6 right-6">
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
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

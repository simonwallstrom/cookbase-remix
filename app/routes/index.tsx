import { LoaderFunction, redirect } from 'remix'
import { getUserId } from '~/utils/session.server'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUserId(request)

  if (user) return redirect('/recipes')

  return null
}

export default function Index() {
  return (
    <main className="bg-red-300">
      <h1 className="text-3xl mb-3">Welcome to Cookbase</h1>
    </main>
  )
}

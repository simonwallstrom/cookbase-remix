import { Link, ActionFunction, redirect, LoaderFunction } from 'remix'
import { db } from '~/utils/db.server'
import { getUserId, requireAuth } from '~/utils/session.server'

export let loader: LoaderFunction = async ({ request }) => {
  await requireAuth(request)

  return null
}

export let action: ActionFunction = async ({ request }) => {
  let userId = await requireAuth(request)
  let form = await request.formData()
  let title = form.get('title')
  let description = form.get('description')

  if (typeof title !== 'string' || typeof description !== 'string') {
    throw new Error(`Form not submitted correctly`)
  }

  let fields = { title, description }

  let recipe = await db.recipe.create({
    data: { ...fields, userId },
  })

  return redirect(`/recipes/${recipe.id}`)
}

export default function NewRecipe() {
  return (
    <main className="space-y-3">
      <div>
        <Link to="/recipes">← Back to recipes</Link>
      </div>
      <h1 className="text-3xl">New recipe</h1>
      <form className="mt-6 space-y-4" method="post">
        <label className="flex flex-col space-y-1" htmlFor="title">
          <span>Title</span>
          <input className="border dark:bg-gray-900 dark:border-gray-700 p-2" type="text" name="title" />
        </label>
        <label className="flex flex-col space-y-1" htmlFor="description">
          <span>Description</span>
          <input className="border dark:bg-gray-900 dark:border-gray-700 p-2" type="text" name="description" />
        </label>
        <div>
          <button type="submit">Add recipe</button>
        </div>
      </form>
    </main>
  )
}
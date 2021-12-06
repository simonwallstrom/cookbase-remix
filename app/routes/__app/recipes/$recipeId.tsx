import { Recipe } from '@prisma/client'
import { Link, LoaderFunction, useCatch, useLoaderData } from 'remix'
import { db } from '~/utils/db.server'

type loaderData = {
  recipe: Recipe
}

export let loader: LoaderFunction = async ({ params }) => {
  let recipe = await db.recipe.findUnique({
    where: { id: params.recipeId },
  })

  if (!recipe)
    throw new Response('Recipe not found...', {
      status: 404,
    })
  let data: loaderData = { recipe }
  return data
}

export default function Recipe() {
  let data = useLoaderData<loaderData>()
  return (
    <main className="space-y-3">
      <div>
        <Link to="/recipes">← Back to recipes</Link>
      </div>
      <h1 className="text-3xl">{data.recipe.title}</h1>
      <p>{data.recipe.description}</p>
    </main>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div className="error-container">There are no recipes to display...</div>
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

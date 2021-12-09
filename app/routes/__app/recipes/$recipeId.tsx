import { Recipe } from '@prisma/client'
import { Link, LoaderFunction, useCatch, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { RecipeWithCollection } from '~/types'
import { db } from '~/utils/db.server'

type loaderData = {
  recipe: RecipeWithCollection
}

export let loader: LoaderFunction = async ({ params }) => {
  let recipe = await db.recipe.findUnique({
    where: { id: params.recipeId },
    include: { collections: true },
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
    <>
      <PageHeader link="/recipes" title="Recipe"></PageHeader>
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl">{data.recipe.title}</h1>
        <p className="mt-4">{data.recipe.description}</p>
        {data.recipe.collections.map((collection) => (
          <div className="mt-4" key={collection.id}>
            Collection: <Link to={`/collections/${collection.id}`}>{collection.title}</Link>
          </div>
        ))}
      </div>{' '}
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div className="error-container">There are no recipes to display...</div>
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

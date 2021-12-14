import { Recipe } from '@prisma/client'
import { Filter, Plus } from 'react-feather'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { db } from '~/utils/db.server'
import { requireAuth } from '~/utils/session.server'

type LoaderData = {
  recipes: Array<Recipe>
}

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await requireAuth(request)
  let data: LoaderData = {
    recipes: await db.recipe.findMany({
      where: { userId: userId },
    }),
  }
  // await new Promise((res) => setTimeout(res, 1500))
  return data
}

export default function Recipes() {
  let data = useLoaderData<LoaderData>()

  return (
    <>
      <PageHeader title="Recipes">
        <div className="flex space-x-6">
          <Link className="text-link flex items-center" to="new">
            <span>Filter</span>
          </Link>
          <Link className="text-link flex items-center space-x-1" to="new">
            <Plus strokeWidth={1.5} size={16} />
            <span>New recipe</span>
          </Link>
        </div>
      </PageHeader>
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <ul className="space-y-6">
          {data.recipes.map((recipe) => (
            <li key={recipe.id}>
              <h2 className="text-lg">
                <Link to={recipe.id}>{recipe.title}</Link>
              </h2>
              <p className="mt-1">{recipe.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

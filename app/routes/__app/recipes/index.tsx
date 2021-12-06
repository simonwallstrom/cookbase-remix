import { Recipe } from '@prisma/client'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import { db } from '~/utils/db.server'

type LoaderData = {
  recipes: Array<Recipe>
}

export let loader: LoaderFunction = async () => {
  let data: LoaderData = {
    recipes: await db.recipe.findMany(),
  }
  // await new Promise((res) => setTimeout(res, 1500))
  return data
}

export default function Recipes() {
  let data = useLoaderData<LoaderData>()

  return (
    <main className="space-y-3">
      <h1 className="text-3xl">Recipes</h1>
      <ul className="list-disc list-inside">
        {data.recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={recipe.id}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Link className="text-indigo-600" to="new">
          New recipe
        </Link>
      </div>
    </main>
  )
}

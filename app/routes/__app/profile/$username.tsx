import { LoaderFunction, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { UserWithRecipesAndCollection } from '~/types'
import { db } from '~/utils/db.server'

type loaderData = {
  user: UserWithRecipesAndCollection
  navigate: boolean
}

export let loader: LoaderFunction = async ({ request, params }) => {
  let url = new URL(request.url)
  let navigate = !!url.searchParams.get('navigate')

  let user = await db.user.findUnique({
    where: { username: params.username },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      recipes: {
        select: {
          id: true,
          title: true,
        },
      },
      collections: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })

  return { user, navigate }
}

export default function Username() {
  let data = useLoaderData<loaderData>()
  console.log(data)

  return (
    <>
      <PageHeader link={data.navigate ? '/friends' : undefined} title="Profile" />
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl">
          {data.user.firstName} {data.user.lastName}
        </h1>
        <p>{data.user.username}</p>
        <ul className="mt-6">
          {data.user.recipes.map((recipe) => (
            <div key={recipe.id}>{recipe.title}</div>
          ))}
        </ul>
        <ul className="mt-6">
          {data.user.collections.map((collection) => (
            <div key={collection.id}>{collection.title}</div>
          ))}
        </ul>
      </div>
    </>
  )
}

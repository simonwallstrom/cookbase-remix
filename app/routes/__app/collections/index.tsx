import { Collection } from '.prisma/client'
import { Plus } from 'react-feather'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { db } from '~/utils/db.server'
import { requireAuth } from '~/utils/session.server'

type LoaderData = {
  collections: Array<Collection>
}

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await requireAuth(request)

  let data: LoaderData = {
    collections: await db.collection.findMany({
      include: { recipes: true },
      where: { userId: userId },
    }),
  }

  return data
}

export default function Collections() {
  let data = useLoaderData<LoaderData>()

  return (
    <>
      <PageHeader title="Collections">
        <Link className="text-link flex items-center space-x-2" to="new">
          <Plus strokeWidth={1.5} size={16} />
          <span>New collection</span>
        </Link>
      </PageHeader>
      <div className="w-full space-y-4 max-w-6xl mx-auto px-8 py-12">
        <ul className="space-y-6">
          {data.collections.map((collection) => (
            <li key={collection.id}>
              <h2 className="text-lg">
                <Link to={collection.id}>{collection.title}</Link>
              </h2>
              <p className="mt-1">{collection.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

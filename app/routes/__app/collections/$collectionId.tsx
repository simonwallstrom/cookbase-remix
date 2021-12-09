import { Collection } from '@prisma/client'
import { LoaderFunction, useCatch, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { db } from '~/utils/db.server'

type loaderData = {
  collection: Collection
}

export let loader: LoaderFunction = async ({ params }) => {
  let collection = await db.collection.findUnique({
    where: { id: params.collectionId },
  })

  if (!collection)
    throw new Response('Collection not found...', {
      status: 404,
    })
  let data: loaderData = { collection }
  return data
}

export default function Collection() {
  let data = useLoaderData<loaderData>()
  return (
    <>
      <PageHeader link="/collections" title="Collection"></PageHeader>
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl">{data.collection.title}</h1>
        <p className="mt-4">{data.collection.description}</p>
      </div>{' '}
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div className="error-container">There are no collection to display...</div>
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

import { LoaderFunction, ActionFunction, Form, redirect, Link } from 'remix'
import PageHeader from '~/components/PageHeader'
import { db } from '~/utils/db.server'
import { requireAuth } from '~/utils/session.server'

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

  let collection = await db.collection.create({
    data: { ...fields, userId },
  })

  return redirect(`/collections/${collection.id}`)
}

export default function NewCollection() {
  return (
    <>
      <PageHeader link="/collections" title="New collection"></PageHeader>
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl">New collection</h1>
        <Form className="mt-6 space-y-6" method="post">
          <label className="flex flex-col space-y-1.5" htmlFor="title">
            <span>Title</span>
            <input type="text" name="title" />
          </label>
          <label className="flex flex-col space-y-1.5" htmlFor="description">
            <span>Description</span>
            <input type="text" name="description" />
          </label>
          <div className="flex items-center space-x-8">
            <button className="btn" type="submit">
              Add collection
            </button>
            <Link className="text-gray-500 hover:text-gray-400" to="/collections">
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}

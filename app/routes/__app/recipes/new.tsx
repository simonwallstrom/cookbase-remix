import { ActionFunction, redirect, LoaderFunction, useLoaderData, Form } from 'remix'
import PageHeader from '~/components/PageHeader'
import TextareaAutosize from 'react-textarea-autosize'
import { db } from '~/utils/db.server'
import { requireAuth } from '~/utils/session.server'
import { Collection, Tag } from '@prisma/client'
import { Disclosure } from '@headlessui/react'

type LoaderData = {
  collections: Array<Collection>
  tags: Array<Tag>
}

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await requireAuth(request)
  let data: LoaderData = {
    collections: await db.collection.findMany({
      where: { userId },
      orderBy: {
        recipes: {
          _count: 'desc',
        },
      },
    }),
    tags: await db.tag.findMany({
      where: { userId },
    }),
  }

  return data
}

export let action: ActionFunction = async ({ request }) => {
  let userId = await requireAuth(request)
  let form = await request.formData()
  let title = form.get('title')
  let description = form.get('description')
  let collection = form.getAll('collection').map((id) => ({ id } as any))
  let tags = form.getAll('tag').map((id) => ({ id } as any))
  let ingredients = form.get('ingredients')
  let instructions = form.get('instructions')

  if (typeof title !== 'string' || typeof description !== 'string') {
    throw new Error(`Form not submitted correctly`)
  }

  let fields = { title, description }

  let recipe = await db.recipe.create({
    data: {
      ...fields,
      user: {
        connect: { id: userId },
      },
      collections: {
        connect: collection,
      },
      tags: {
        connect: tags,
      },
      activity: {
        create: {
          userId,
        },
      },
    },
    include: {
      collections: true,
      user: true,
    },
  })

  return redirect(`/recipes/${recipe.id}`)
}

export default function NewRecipe() {
  let data = useLoaderData<LoaderData>()

  return (
    <>
      <PageHeader link="/recipes" title="New recipe" />
      <div className="w-full max-w-6xl mx-auto px-8 pt-12 pb-44">
        <div className="max-w-2xl mx-auto">
          <Form className="space-y-8" method="post">
            <label className="space-y-2 block dark:text-gray-400 text-gray-600" htmlFor="title">
              <span>Title</span>
              <div className="w-full">
                <input
                  className="dark:placeholder:text-gray-600 placeholder:text-gray-400 w-full"
                  type="text"
                  name="title"
                  id="title"
                  // autoFocus={true}
                  placeholder="Give your recipe a name..."
                />
              </div>
            </label>
            <label className="space-y-2 block dark:text-gray-400 text-gray-600" htmlFor="description">
              <span>Description</span>
              <TextareaAutosize
                className="resize-none w-full"
                name="description"
                id="description"
                maxRows={10}
                rows={1}
                placeholder="Add a description..."
              />
            </label>

            <div className="flex gap-8">
              <div className="flex-1 space-y-2">
                <div className="dark:text-gray-400 text-gray-600">Collections</div>
                <div className="border max-h-28 overflow-scroll px-4 py-3 space-y-2 rounded-md dark:border-gray-800">
                  {data.collections.map((collection) => (
                    <label className="flex space-x-3 items-center" htmlFor={collection.id} key={collection.id}>
                      <input type="checkbox" id={collection.id} value={collection.id} name="collection" />
                      <span>{collection.title}</span>
                    </label>
                  ))}
                  New collection
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="dark:text-gray-400 text-gray-600">Tags</div>
                <div className="border rounded-md dark:border-gray-800 p-4 space-y-2">
                  {data.tags.map((tag) => (
                    <label
                      className="dark:text-gray-400 flex mr-4 space-x-3 items-center text-gray-600"
                      htmlFor={tag.id}
                      key={tag.id}
                    >
                      <input type="checkbox" id={tag.id} value={tag.id} name="tag" />
                      <span>{tag.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <label className="space-y-2 flex-1 block dark:text-gray-400 text-gray-600" htmlFor="servings">
              <span>Servings</span>
              <div className="w-full">
                <input
                  className="dark:placeholder:text-gray-600 placeholder:text-gray-400 w-full"
                  type="number"
                  id="servings"
                  name="servings"
                />
              </div>
            </label>

            <label className="space-y-2 block dark:text-gray-400 text-gray-600" htmlFor="ingredients">
              <div>Ingredients</div>
              <TextareaAutosize
                className="dark:placeholder:text-gray-600 peer placeholder:text-gray-400 dark:text-white resize-none w-full"
                name="ingredients"
                id="ingredients"
                minRows={3}
                rows={3}
                maxRows={10}
                placeholder={`Salt...\nPepper...\nGarlic...`}
              ></TextareaAutosize>
              <div className="text-xs absolute transition-opacity opacity-0 peer-focus:opacity-100 text-gray-500">
                One ingredient per row. Add headings with a colon mark – e.g.{' '}
                <span className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-sm">Tomato sauce:</span>
              </div>
            </label>
            <label className="space-y-2 block dark:text-gray-400 text-gray-600" htmlFor="instructions">
              <div>Instructions</div>
              <TextareaAutosize
                className="dark:placeholder:text-gray-600 placeholder:text-gray-400 peer dark:text-white resize-none w-full"
                name="instructions"
                id="instructions"
                minRows={3}
                rows={3}
                maxRows={10}
                placeholder={`Salt...\nPepper...\nGarlic...`}
              ></TextareaAutosize>
              <div className="text-xs absolute transition-opacity opacity-0 peer-focus:opacity-100 text-gray-500">
                One ingredient per row. Add headings with a colon mark – e.g.{' '}
                <span className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-sm">Tomato sauce:</span>
              </div>
            </label>
            <div className="pt-5">
              <button className="btn block w-full py-3" type="submit">
                Add recipe
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

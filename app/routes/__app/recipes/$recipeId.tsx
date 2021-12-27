import { Recipe } from '@prisma/client'
import { Hash, MoreHorizontal, Pocket, Star } from 'react-feather'
import { Link, LoaderFunction, useCatch, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { RecipeWithCollectionAndTags } from '~/types'
import { db } from '~/utils/db.server'

type loaderData = {
  recipe: RecipeWithCollectionAndTags
}

export let loader: LoaderFunction = async ({ params }) => {
  let recipe = await db.recipe.findUnique({
    where: { id: params.recipeId },
    include: { collections: true, tags: true },
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

  console.log(data)

  return (
    <>
      <PageHeader link="/recipes" title="Recipe"></PageHeader>
      <div className="relative bg-black aspect-[5/2]">
        <img
          src="https://hyjeqtemjypnyfvmaqvd.supabase.in/storage/v1/object/public/cookbase/demo/lasagna.jpg"
          alt="Lasagna"
          className="absolute object-cover w-full h-full"
        />
        <div className="relative h-full flex bg-gray-900 bg-opacity-50">
          <div className="flex w-full max-w-6xl mx-auto px-8 py-12 items-end justify-between">
            <div>
              <h1 style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, .5)' }} className="text-3xl">
                {data.recipe.title}
              </h1>
              <div className="flex items-center gap-8 mt-3">
                <div className="flex items-center space-x-2">
                  <Hash strokeWidth={1.5} className="text-white" size={16} />
                  <a className=" dark:hover:text-white hover:text-black">Varmrätt</a>
                  <span>·</span>
                  <a className=" dark:hover:text-white hover:text-black">Italien</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Star strokeWidth={1.5} className="text-white" size={16} />
                  <a className=" dark:hover:text-white hover:text-black">Weeknight dinners</a>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium transform border border-gray-300 rounded-md shadow-sm active:scale-[.99] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Pocket strokeWidth={1.5} size={16} />
                <span>Save</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <MoreHorizontal strokeWidth={1.5} size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-8">
        {/* <div>
          <img
            src="https://hyjeqtemjypnyfvmaqvd.supabase.in/storage/v1/object/public/cookbase/demo/lasagna.jpg"
            alt="Lasagna"
            className="w-full object-cover rounded-xl aspect-[2/1]"
          />
        </div>
        <div className="flex w-full mt-8 items-center justify-between">
          <div>
            <h1 className="text-2xl">{data.recipe.title}</h1>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium transform border border-gray-300 rounded-md shadow-sm active:scale-[.99] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Pocket strokeWidth={1.5} size={16} />
              <span>Save</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <MoreHorizontal strokeWidth={1.5} size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4 border-b-2 dark:border-gray-800 pb-6 gap-8">
          <div className="flex items-center space-x-2">
            <Hash strokeWidth={1.5} className="dark:text-white" size={16} />
            <a className=" dark:hover:text-white hover:text-black">Varmrätt</a>
            <span>·</span>
            <a className=" dark:hover:text-white hover:text-black">Italien</a>
          </div>
          <div className="flex items-center space-x-2">
            <Star strokeWidth={1.5} className="dark:text-white" size={16} />
            <a className=" dark:hover:text-white hover:text-black">Weeknight dinners</a>
          </div>
        </div> */}
        {/* <p className="text-base text-gray-400 max-w-2xl mt-6">
          Stekt anka med goda tillbehör. Avnjutes bäst med ett glas Pinot Noir, som har bra röd frukt, lagom tanninhalt
          med hög syra, som möter upp både köttet och apelsinsåsen bra!
        </p> */}

        <div className="flex">
          <div className="w-1/3 pt-12 pr-12 pb-44 border-r dark:border-gray-800">
            <h2 className="flex items-baseline justify-between pb-2 mb-5 text-xl border-gray-300 dark:border-gray-800">
              <div>Ingredients</div>
              <div className="font-sans text-sm text-gray-500 border-b border-transparent">4 servings</div>
            </h2>
            {/* <h3 className="mb-3 text-base">Bechamelsåsen</h3> */}
            <ul className="pl-4 list-disc leading-chill">
              <li>Salt</li>
              <li>Peppar</li>
              <li>3 dl crème fraîche</li>
              <li>2 dl grädde</li>
              <li>2 klyftor vitlök</li>
            </ul>
            {/* <h3 className="mt-5 mb-3 text-base">Köttfärssåsen</h3> */}
            <ul className="pl-4 list-disc leading-chill">
              <li>Salt</li>
              <li>Peppar</li>
              <li>3 dl crème fraîche</li>
              <li>2 dl grädde</li>
              <li>2 klyftor vitlök</li>
            </ul>
          </div>
          <div className="w-2/3 pt-12 pl-12 pb-44">
            <h2 className="flex items-baseline justify-between pb-2 mb-5 text-xl border-gray-300 dark:border-gray-800">
              <div>Instructions</div>
            </h2>
            {/* <h3 className="mb-3 text-base">Bechamelsåsen</h3> */}
            <ol className="space-y-4 leading-chill">
              <li className="flex space-x-6">
                <div className="text-black dark:text-white">01</div>
                <div>
                  Häll av vattnet från cashewnötterna och lägg dem och resten av ingredienserna i en
                  höghastighetsblender eller en stark matberedare och mixa i ca 2-3 minuter tills såsen är slät och har
                  tjocknat lite.
                </div>
              </li>
              <li className="flex space-x-6">
                <div className="text-black dark:text-white">02</div>
                <div>
                  Smörj din lasagneform med lite olivolja. Börja med ett tunt lager tomatsås, sedan lasagneplattor,
                  svampfyllning, tomatsås osv. Sista lagret bör vara lasagneplattor och ett tunt lager tomatsås. Häll
                  ostsåsen över och bred ut i ett jämnt lager.
                </div>
              </li>
              <li className="flex space-x-6">
                <div className="text-black dark:text-white">03</div>
                <div>Skiva tomaterna tunt och lägg på ostsåsen. Ringla lite olivolja och strö paprikapulver över.</div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      {/* <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <div className="flex gap-14">
          <div className="flex-1">
            <h1 className="text-3xl">{data.recipe.title}</h1>
            <p className="mt-6 text-base">{data.recipe.description}</p>
          </div>
          <div className="flex-1">
            <img
              src="https://hyjeqtemjypnyfvmaqvd.supabase.in/storage/v1/object/public/cookbase/demo/lasagna.jpg"
              className="w-full rounded-lg object-cover min-h-[200px]"
            />
          </div>
        </div>
        {data.recipe.collections.map((collection) => (
          <div className="mt-4" key={collection.id}>
            Collection: <Link to={`/collections/${collection.id}`}>{collection.title}</Link>
          </div>
        ))}
      </div> */}
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

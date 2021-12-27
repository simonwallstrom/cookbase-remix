import { Activity } from '@prisma/client'
import { LoaderFunction, useLoaderData } from 'remix'
import PageHeader from '~/components/PageHeader'
import { ActivityFeed } from '~/types'
import { db } from '~/utils/db.server'

type LoaderData = {
  activities: Array<ActivityFeed>
}

export let loader: LoaderFunction = async () => {
  let data: LoaderData = {
    activities: await db.activity.findMany({
      select: {
        id: true,
        createdAt: true,
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
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  }

  return data
}

export default function Activity() {
  let data = useLoaderData<LoaderData>()

  return (
    <>
      <PageHeader title="Activity" />
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <ul className="space-y-6">
          {data.activities.map((activity) => (
            <li key={activity.id}>
              <div>{activity.createdAt}</div>
              {activity.recipes ? (
                <div>
                  <div>
                    {activity.user.firstName} {activity.user.lastName} added a new recipe
                  </div>
                  <h2 className="text-lg">{activity.recipes?.title}</h2>
                </div>
              ) : (
                <div>
                  <div>
                    {activity.user.firstName} {activity.user.lastName} added a new collection
                  </div>
                  <h2 className="text-lg">{activity.collections?.title}</h2>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

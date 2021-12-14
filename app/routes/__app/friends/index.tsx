import PageHeader from '~/components/PageHeader'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import { User } from '@prisma/client'
import { db } from '~/utils/db.server'
import { requireAuth } from '~/utils/session.server'

type LoaderData = {
  friends: Array<User>
}

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await requireAuth(request)

  let friends = await db.user.findMany({
    where: {
      following: {
        some: {
          followerId: userId,
        },
      },
    },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      recipes: {
        select: {
          title: true,
        },
      },
    },
  })

  return { friends }
}

export default function Friends() {
  let data = useLoaderData<LoaderData>()
  console.log(data)
  return (
    <>
      <PageHeader title="Friends" />
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl">Friends</h1>
        {data.friends.map((friend) => (
          <div key={friend.username}>
            <Link to={`/profile/${friend.username}?navigate=friends`}>{friend.username}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

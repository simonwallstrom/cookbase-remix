import { Outlet, LoaderFunction, NavLink, useLoaderData, useCatch } from 'remix'
import { getUser } from '~/utils/session.server'

export let loader: LoaderFunction = async ({ request }) => {
  let data = await getUser(request)

  return data
}

export default function AppLayout() {
  let user = useLoaderData()

  return (
    <div>
      <nav className="flex mb-12 space-x-6 text-gray-500">
        <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/profile">
          {user.username}
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/recipes">
          Recipes
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/collections">
          Collections
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/activity">
          Activity
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/friends">
          Friends
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'dark:text-white text-black' : '')} to="/settings">
          Settings
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

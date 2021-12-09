import { Activity, Book, Plus, Search, Settings, Star, Users } from 'react-feather'
import { Outlet, LoaderFunction, NavLink, useLoaderData, Link } from 'remix'
import { getUser } from '~/utils/session.server'

export let loader: LoaderFunction = async ({ request }) => {
  let data = await getUser(request)
  return data
}

export default function AppLayout() {
  let user = useLoaderData()

  return (
    <div className="flex">
      {user ? (
        <nav className="sticky top-0 flex flex-col h-screen px-8 py-5 border-r dark:border-gray-800 w-72">
          <div className="flex-1">
            <CustomNavLink to="/username">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="rounded-full ring-1 ring-gray-900 ring-opacity-10"
                    alt="Avatar"
                    src="https://avatars.githubusercontent.com/u/1715002?v=4"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text">Simon Wallström</div>
                  <div className="text-sm font-normal">{user?.username}</div>
                </div>
              </div>
            </CustomNavLink>

            <div className="flex mt-5 space-x-4">
              <Link
                className="flex items-center justify-center flex-1 px-4 py-2 space-x-1 text-sm font-medium transform border border-gray-300 rounded-md shadow-sm active:scale-[.99] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                to="/recipes/new"
              >
                <Plus strokeWidth={1.5} size={16} />
                <span>New recipe</span>
              </Link>
              <Link
                className="flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                to="/search"
              >
                <Search strokeWidth={1.5} size={16} />
              </Link>
            </div>

            <div className="flex-1 mt-5 space-y-1">
              <CustomNavLink to="/recipes">
                <Book size={16} strokeWidth={1.5} />
                <span>Recipes</span>
              </CustomNavLink>
              <CustomNavLink to="/collections">
                <Star size={16} strokeWidth={1.5} />
                <span>Collections</span>
              </CustomNavLink>
              <CustomNavLink to="/friends">
                <Users size={16} strokeWidth={1.5} />
                <span>Friends</span>
              </CustomNavLink>
              <CustomNavLink to="/activity">
                <Activity size={16} strokeWidth={1.5} />
                <span>Activity</span>
              </CustomNavLink>
              <CustomNavLink to="/settings">
                <Settings size={16} strokeWidth={1.5} />
                <span>Settings</span>
              </CustomNavLink>
            </div>
          </div>
          <div className="flex justify-between text-xs">footer</div>
        </nav>
      ) : null}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

function CustomNavLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'rounded-md flex items-center space-x-2.5 py-2 border border-transparent px-3 font-medium text-black dark:text-white bg-gray-100 dark:bg-opacity-70 dark:bg-gray-800'
          : 'rounded-md flex items-center space-x-2.5 py-2 border border-transparent px-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-opacity-70 hover:text-black dark:hover:text-white'
      }
      to={to}
    >
      {children}
    </NavLink>
  )
}

import { NavLink } from 'remix'

export default function Sidebar() {
  return (
    <nav className="flex mb-12 space-x-6 text-gray-400">
      <NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to="/">
        Cookbase
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to="/recipes">
        Recipes
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to="/collections">
        Collections
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to="/friends">
        Friends
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'text-white' : '')} to="/settings">
        Settings
      </NavLink>
    </nav>
  )
}

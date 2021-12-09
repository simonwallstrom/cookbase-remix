import { Link } from 'remix'
import { ArrowLeft } from 'react-feather'

export default function PageHeader({
  children,
  title,
  link,
}: {
  children?: React.ReactNode
  title: string
  link?: string
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 bg-white border-b dark:bg-gray-900 dark:border-gray-800 dark:bg-opacity-95 bg-opacity-80 backdrop-filter backdrop-blur">
      <div className="relative flex items-center justify-between w-full max-w-6xl px-8 mx-auto">
        <div className="flex items-center space-x-4">
          {link ? (
            <Link
              className="p-1.5 -ml-1.5 text-gray-400 rounded-full dark:hover:bg-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-500 dark:hover:text-white"
              to={link}
            >
              <ArrowLeft size={20} />
            </Link>
          ) : null}
          <div className="text-base font-medium text-gray-900 dark:text-white">{title}</div>
        </div>
        {children}
      </div>
    </header>
  )
}

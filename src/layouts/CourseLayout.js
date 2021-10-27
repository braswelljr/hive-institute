import { useState, Fragment } from 'react'
import { HiChatAlt2, HiPlus } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import Head from 'next/head'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStore from '@/store/index'

const CourseLayout = ({ children }) => {
  const router = useRouter()
  const [menu, setMenu] = useState(true)
  const [dropDown, setDropDown] = useState(false)
  const profile = useStore(state => state.profile)

  return (
    <Fragment>
      <Head>
        <title>{router.pathname.slice(1)}</title>
      </Head>
      <main className="">
        {/* top nav */}
        <nav className="fixed inset-x-0 top-0 z-[17] flex justify-between px-8 py-3 bg-white shadow lg:px-12">
          <Link href="/dashboard/courses">
            <img
              src={require('@/img/logo2.png')}
              alt="Header logo"
              className="w-auto cursor-pointer h-14"
            />
          </Link>
          <div className="flex space-x-5 text-secondary-deep">
            <button type="button">
              <HiChatAlt2 className="w-auto h-8" />
            </button>
            <button
              type="button"
              className={clsx(
                'h-10 w-10 rounded-full overflow-hidden relative my-auto',
                {}
              )}
              onClick={() => setDropDown(!dropDown)}
            >
              {profile !== null ? (
                <img
                  className={clsx('object-cover')}
                  src={profile.profilePic.url}
                  alt="Profile Image"
                />
              ) : (
                <FiUser className="w-auto h-8" />
              )}
            </button>
          </div>
          {/* Drop-down menu */}
          <div
            className={clsx(
              'fixed p-2 bg-secondary-light text-secondary-deep w-[70%] md:w-[45%] lg:w-[30%] right-16 top-12 space-y-5',
              { hidden: !dropDown }
            )}
          >
            <div className="">
              {profile !== null && (
                <h3>{profile.firstname ?? profile.lastname}</h3>
              )}
            </div>
            <button
              type="button"
              className={clsx('bg-yellow-300 w-full text-sm rounded py-1')}
            >
              Sign out
            </button>
          </div>
        </nav>
        {/* menu shadow */}
        <div
          onClick={() => setMenu(!menu)}
          tabIndex={-1}
          className={clsx(
            'fixed inset-0 z-[15] cursor-pointer bg-secondary-light lg:hidden bg-opacity-30',
            { hidden: menu }
          )}
        />
        {/* menu button */}
        <button
          type="button"
          aria-modal
          tabIndex={-1}
          onClick={() => setMenu(!menu)}
          className={clsx(
            'bg-secondary-light p-2 z-[16] lg:hidden transition-all transform transform-gpu text-secondary-deep rounded-full fixed sm:bottom-10 bottom-5 right-5 sm:right-10',
            {
              'rotate-45': !menu
            }
          )}
        >
          <HiPlus className="w-auto h-8" />
        </button>

        <section className="">{children}</section>
      </main>
    </Fragment>
  )
}

export default CourseLayout

import { useState, Fragment } from 'react'
import { HiChatAlt2 } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import Head from 'next/head'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStore from '@/store/index'

const CourseLayout = ({ children }) => {
  const router = useRouter()
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
          <div className="flex space-x-5 text-primary-cheese">
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
              {profile !== null || profile !== undefined ? (
                <img
                  className={clsx('object-cover')}
                  src={profile?.profilePic.url}
                  alt="Profile Image"
                />
              ) : (
                <FiUser className="w-auto h-8" />
              )}
            </button>
          </div>
        </nav>
        <section className="">{children}</section>
      </main>
    </Fragment>
  )
}

export default CourseLayout

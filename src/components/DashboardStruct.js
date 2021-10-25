import { useState, forwardRef, Fragment, useEffect } from 'react'
import { HiChatAlt2, HiPlus } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import Head from 'next/head'
import clsx from 'clsx'
import Link from 'next/link'
import { HiCreditCard, HiCalendar, HiAcademicCap } from 'react-icons/hi'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import shallow from 'zustand/shallow'
import jwt from 'jsonwebtoken'

const MenuTab = forwardRef(({ children, href, setMenu }, ref) => {
  const router = useRouter()
  const appRef = useStore(state => state.appRef)
  const setToken = useStore(state => state.setToken)
  const [payload, setPayload] = useStore(
    state => [state.payload, state.setPayload],
    shallow
  )

  // set payload
  useEffect(() => {
    let tk = JSON.parse(window.localStorage.getItem(appRef))
    if (tk === undefined || tk === null) {
      router.push({ pathname: '/' })
    } else {
      tk = typeof tk === 'object' ? tk.token : tk
      setToken(tk)
      setPayload(jwt.decode(tk))
    }
  }, [])

  return (
    <Link href={encodeURI(href)} ref={ref}>
      <button
        className={clsx(
          'flex items-center rounded-2xl font-bold justify-start px-4 py-1 space-x-3',
          {
            'bg-secondary-light': router.pathname === `${href}`
          }
        )}
        onClick={() => setMenu(true)}
      >
        {children}
      </button>
    </Link>
  )
})

const DashboardStruct = ({ children }) => {
  const router = useRouter()
  const [menu, setMenu] = useState(true)

  // menu tabs
  const locations = [
    {
      name: 'Courses',
      link: '/dashboard/courses',
      icon: <HiAcademicCap className="w-auto h-5" />
    },
    {
      name: 'Events',
      link: '/dashboard/events',
      icon: <HiCalendar className="w-auto h-5" />
    },
    {
      name: 'Profile',
      link: '/dashboard/profile',
      icon: <FiUser className="w-auto h-5" />
    },
    {
      name: 'Account',
      link: '/dashboard/account',
      icon: <HiCreditCard className="w-auto h-5" />
    }
  ]

  return (
    <Fragment>
      <Head>
        <title>
          {locations.map(locat => {
            const first =
              router.pathname.split('/')[2] === locat.link.split('/')[2]
            const second =
              router.pathname.split('/')[3] === locat.link.split('/')[3]
            if (first && second) {
              return `${locat.name} (HIT)`
            }
            return
          })}
        </title>
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
            {
              <Link href="/dashboard/profile">
                <button
                  type="button"
                  className={clsx('', {
                    hidden: router.path === '/dashboard/profile'
                  })}
                >
                  <FiUser className="w-auto h-8" />
                </button>
              </Link>
            }
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
        {/* main menu */}
        <nav
          className={clsx(
            'pt-16 z-[16] w-2/3 bg-white lg:w-[17.5%] transform duration-300 transition-all inset-y-0 left-0 fixed min-h-screen shadow',
            { '-translate-x-full lg:translate-x-0': menu }
          )}
        >
          <div
            className={clsx(
              'flex flex-col mt-12 space-y-4 text-secondary-deep relative font-bold'
            )}
          >
            {locations.map(locat => {
              return (
                <MenuTab href={locat.link} setMenu={setMenu} key={locat.name}>
                  {locat.icon}
                  <span className={clsx('')}>{locat.name}</span>
                </MenuTab>
              )
            })}
          </div>
        </nav>
        <section className="h-auto mt-28 mb-12 mx-8 lg:mx-auto relative z-[8] lg:mt-24 lg:ml-[20%] lg:mr-[2.5%]">
          <section className="max-w-5xl mx-auto">{children}</section>
        </section>
      </main>
    </Fragment>
  )
}

export default DashboardStruct

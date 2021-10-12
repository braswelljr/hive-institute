import { useState } from 'react'
import {
  HiChatAlt2,
  HiCreditCard,
  HiCalendar,
  HiAcademicCap,
  HiPlus
} from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Tabs from '@/components/Tabs'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicEffect'

const DashboardStruct = ({ children }) => {
  const [tab, setTab] = useState('courses')
  const [menu, setMenu] = useState(true)
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    router.push(tab === 'courses' ? '/dashboard' : `/dashboard/${tab}`)
    setMenu(true)
  }, [tab])

  return (
    <main className="">
      {/* top nav */}
      <nav className="fixed inset-x-0 top-0 z-10 flex justify-between px-8 py-3 bg-white shadow lg:px-0 lg:py-0">
        <Link href="/dashboard">
          <img
            src={require('@/img/header.png')}
            alt="Header logo"
            className="hidden lg:block lg:w-[17.5%] h-auto cursor-pointer"
          />
        </Link>
        <Link href="/dashboard">
          <img
            src={require('@/img/logo.png')}
            alt="Header logo"
            className="w-auto h-12 cursor-pointer lg:hidden"
          />
        </Link>
        <div className="flex space-x-5 lg:mr-4 text-secondary-deep">
          <button type="button">
            <HiChatAlt2 className="w-auto h-8" />
          </button>
          <button type="button">
            <FiUser className="w-auto h-8" />
          </button>
        </div>
      </nav>
      {/* menu shadow */}
      <div
        onClick={() => setMenu(!menu)}
        className={clsx(
          'fixed inset-0 z-[8] cursor-pointer bg-secondary-light lg:hidden bg-opacity-30',
          { hidden: menu }
        )}
      />
      {/* menu button */}
      <button
        type="button"
        aria-modal
        onClick={() => setMenu(!menu)}
        className={clsx(
          'bg-secondary-light p-2 z-[9] lg:hidden transition-all transform transform-gpu text-secondary-deep rounded-full fixed sm:bottom-10 bottom-5 right-5 sm:right-10',
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
          'pt-16 z-[9] w-2/3 bg-white lg:w-[17.5%] transform duration-300 transition-all inset-y-0 left-0 fixed min-h-screen shadow',
          { '-translate-x-full lg:translate-x-0': menu }
        )}
      >
        <Tabs
          tabs={{
            courses: (
              <div className="flex items-center justify-start px-4 py-1 space-x-3">
                <HiAcademicCap className="w-auto h-5" />
                <span className="font-semibold">Courses</span>
              </div>
            ),
            events: (
              <div className="flex items-center justify-start px-4 py-1 space-x-3">
                <HiCalendar className="w-auto h-5" />
                <span className="font-semibold">Events</span>
              </div>
            ),
            profile: (
              <div className="flex items-center justify-start px-4 py-1 space-x-3">
                <FiUser className="w-auto h-5" />
                <span className="font-semibold">Profile</span>
              </div>
            ),
            account: (
              <div className="flex items-center justify-start px-4 py-1 space-x-3">
                <HiCreditCard className="w-auto h-5" />
                <span className="font-semibold">Account</span>
              </div>
            )
          }}
          selected={tab}
          onChange={setTab}
          className="flex-col mt-12"
          indicatorClassName="bg-secondary-light rounded-full"
          tabClassName="text-secondary-deep"
          layout="row"
        />
      </nav>
      <section className="h-auto mt-[5.5rem] mx-8 relative z-[8] lg:mt-24 lg:ml-[20%] lg:mr-[2.5%]">
        {children}
      </section>
    </main>
  )
}

export default DashboardStruct

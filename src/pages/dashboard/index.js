import { useState } from 'react'
import clsx from 'clsx'
import Tabs from '@/components/Tabs'

const Dashboard = () => {
  const [courseState, setCourseState] = useState('enrolled') // -> enrolled or unenrolled

  return (
    <main className="text-secondary-deep">
      <h1 className="text-2xl font-bold">Courses</h1>
      <Tabs
        tabs={{
          enrolled: 'Enrolled',
          unenrolled: 'Available Courses'
        }}
        selected={courseState}
        onChange={setCourseState}
        className="mt-5"
        indicatorClassName="bg-secondary-light rounded-full"
        tabClassName="text-secondary-deep px-4 py-1 text-sm font-semibold"
      />
      <section className="mt-2"></section>
    </main>
  )
}

export default Dashboard

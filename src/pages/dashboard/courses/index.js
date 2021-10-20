import { useState } from 'react'
import Tabs from '@/components/Tabs'
import DisClosure from '@/components/DisClosure'
import { motion, AnimateSharedLayout } from 'framer-motion'
import clsx from 'clsx'
import { enrolledCourses, unenrolledCourses } from '../../../data/course'

const Dashboard = () => {
  const [courseState, setCourseState] = useState('enrolled') // -> enrolled or unenrolled
  // list animation
  const listVariant = {
    hidden: { x: 100, opacity: 0 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  // item animation
  const itemVariant = {
    hidden: { opacity: 0, x: 25 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
        stiffness: 260,
        damping: 20
      }
    }
  }

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
      <section className="mt-2">
        <AnimateSharedLayout>
          {courseState === 'enrolled' && (
            <motion.div
              className="space-y-3"
              layout
              variants={listVariant}
              initial="hidden"
              animate="show"
            >
              {enrolledCourses.map(course => (
                <motion.div key={course.id} variants={itemVariant}>
                  <DisClosure
                    title={course.course}
                    description={course.description}
                    cta={
                      <div className={clsx('flex justify-end mt-3')}>
                        <button
                          type="button"
                          className={clsx(
                            'px-4 py-2 bg-secondary-light rounded-md font-bold'
                          )}
                        >
                          View Course
                        </button>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          {courseState === 'unenrolled' && (
            <motion.div
              className="space-y-3"
              layout
              variants={listVariant}
              initial="hidden"
              animate="show"
            >
              {unenrolledCourses.map(course => (
                <motion.div key={course.id} variants={itemVariant}>
                  <DisClosure
                    key={course.id}
                    title={course.course}
                    description={course.description}
                    cta={
                      <div className={clsx('flex justify-end mt-3')}>
                        <button
                          type="button"
                          className={clsx(
                            'px-4 py-2 bg-secondary-light rounded-md font-bold'
                          )}
                        >
                          Enroll
                        </button>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimateSharedLayout>
      </section>
    </main>
  )
}

export default Dashboard

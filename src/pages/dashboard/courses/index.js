import { useState, useEffect } from 'react'
import Tabs from '@/components/Tabs'
import DisClosure from '@/components/DisClosure'
import { motion, AnimateSharedLayout } from 'framer-motion'
import clsx from 'clsx'
import useStore from '@/store/index'
import ProcessSVG from '@/components/ProcessSVG'

const Dashboard = () => {
  const [courseState, setCourseState] = useState('unenrolled') // -> enrolled | unenrolled | all
  const courses = useStore(state => state.courses)
  const [showProcess, setShowProcess] = useState(true)

  // check and set process
  useEffect(() => {
    if (Array.isArray(courses)) setShowProcess(false)
  }, [courses])

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

  if (showProcess) {
    return (
      <main className="text-secondary-deep">
        <h1 className="text-2xl font-bold">Courses</h1>
        <div className="min-h-[75vh] grid place-content-center">
          <ProcessSVG className={clsx('h-7 w-7 md:h-12 md:w-12')} />
        </div>
      </main>
    )
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
      <section className="mt-2 overflow-hidden">
        <AnimateSharedLayout>
          {/* Enrolled */}
          {courseState === 'enrolled' && (
            <motion.div
              className="space-y-3"
              layout
              variants={listVariant}
              initial="hidden"
              animate="show"
            >
              {Array.isArray(courses)
                ? courses.length > 0 &&
                  courses.map(course => (
                    <motion.div key={course.course_id} variants={itemVariant}>
                      <DisClosure
                        key={course.id}
                        title={course.name}
                        description={course.overview}
                        cta={
                          <div className={clsx('flex justify-end mt-3')}>
                            <button
                              type="button"
                              tabIndex={-1}
                              className={clsx(
                                'px-4 py-2 bg-secondary-light rounded-md font-bold'
                              )}
                            >
                              View
                            </button>
                          </div>
                        }
                      />
                    </motion.div>
                  ))
                : undefined}
            </motion.div>
          )}
          {/* Unenrolled */}
          {courseState === 'unenrolled' && (
            <motion.div
              className="space-y-3"
              layout
              variants={listVariant}
              initial="hidden"
              animate="show"
            >
              {Array.isArray(courses)
                ? courses.length > 0 &&
                  courses.map(course => (
                    <motion.div key={course.course_id} variants={itemVariant}>
                      <DisClosure
                        key={course.id}
                        title={course.name}
                        description={course.overview}
                        cta={
                          <div className={clsx('flex justify-end mt-3')}>
                            <button
                              type="button"
                              className={clsx(
                                'px-4 py-2 bg-secondary-light rounded-md font-bold'
                              )}
                            >
                              View
                            </button>
                          </div>
                        }
                      />
                    </motion.div>
                  ))
                : undefined}
            </motion.div>
          )}
        </AnimateSharedLayout>
      </section>
    </main>
  )
}

export default Dashboard

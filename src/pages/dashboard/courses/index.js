import { useState, useEffect } from 'react'
import Tabs from '@/components/Tabs'
import DisClosure from '@/components/DisClosure'
import { motion, AnimateSharedLayout } from 'framer-motion'
import clsx from 'clsx'
import useStore from '@/store/index'
import shallow from 'zustand/shallow'
import jwt from 'jsonwebtoken'
import { getCourses } from '@/internals/courses.internal'
import ProcessSVG from '@/components/ProcessSVG'

const Dashboard = () => {
  const [courseState, setCourseState] = useState('all') // -> enrolled | unenrolled | all
  const appRef = useStore(state => state.appRef)
  const [token, setToken] = useStore(
    state => [state.token, state.setToken],
    shallow
  )
  const [payload, setPayload] = useStore(
    state => [state.payload, state.setPayload],
    shallow
  )
  const [courses, setCourses] = useStore(
    state => [state.courses, state.setCourses],
    shallow
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const [showProcess, setShowProcess] = useState(true)

  // set payload
  useEffect(() => {
    let tk = JSON.parse(window.localStorage.getItem(appRef))
    if (tk !== undefined || tk !== null) {
      tk = typeof tk === 'object' ? tk.token : tk
      setToken(tk)
      setPayload(jwt.decode(tk))
    }
  }, [])

  // check and set process
  useEffect(() => {
    if (Array.isArray(courses)) setShowProcess(false)
  }, [courses])

  if (payload !== null && token !== null) {
    getCourses(payload, token)
      .then(response => {
        if (response.error) {
          setErrorMessage(response.error)
          console.log(response.error)
        } else {
          setCourses(response)
          setShowProcess(false)
        }
      })
      .catch(error => {
        console.error(error)
        // Send error message
        setErrorMessage('Something went wrong!')
      })
  }

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
          <ProcessSVG className={clsx('h-12 w-12')} />
        </div>
      </main>
    )
  }

  return (
    <main className="text-secondary-deep">
      <h1 className="text-2xl font-bold">Courses</h1>
      <Tabs
        tabs={{
          all: 'All Courses',
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
          {/* Enrolled */}
          {courseState === 'enrolled' && (
            <motion.div
              className="space-y-3"
              layout
              variants={listVariant}
              initial="hidden"
              animate="show"
            >
              {/* {enrolledCourses.map(course => (
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
              ))} */}
              enrolled
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
              {/* {unenrolledCourses.map(course => (
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
              ))} */}
              unenrolled
            </motion.div>
          )}
          {/* All courses */}
          {courseState === 'all' && (
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

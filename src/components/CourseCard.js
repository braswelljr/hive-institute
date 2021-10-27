import React from 'react'
import Link from 'next/link'
import DisClosure from '@/components/DisClosure'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const CourseCard = ({ course }) => {
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
    <motion.div variants={itemVariant}>
      <DisClosure
        key={course.id}
        title={course.name}
        description={course.overview}
        cta={
          <div className={clsx('flex justify-end mt-3')}>
            <Link
              href={{
                pathname: `/dashboard/courses/[id]`,
                query: {
                  id: course.course_id
                }
              }}
            >
              <button
                type="button"
                className={clsx(
                  'px-4 py-2 bg-secondary-light rounded-md font-bold'
                )}
              >
                View
              </button>
            </Link>
          </div>
        }
      />
    </motion.div>
  )
}

export default CourseCard

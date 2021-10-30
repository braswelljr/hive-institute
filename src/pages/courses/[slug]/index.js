import { useState, useEffect } from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'
import ProcessSVG from '@/components/ProcessSVG'
import Link from 'next/link'
import Head from 'next/head'
import {
  HiOutlineMail,
  HiPhone,
  HiChevronDown,
  HiBadgeCheck,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Disclosure } from '@headlessui/react'
import { motion } from 'framer-motion'

export const getServerSideProps = async context => {
  const { slug } = context.params // returns an object

  if (slug === null || slug === undefined) {
    return {
      redirect: {
        destination: '/dashboard/courses',
        permanent: false
      }
    }
  }

  return {
    props: { slug } // will be passed to the page component as props
  }
}

const Course = ({ slug }) => {
  const [course, setCourse] = useState(null)
  const [showProcess, setShowProcess] = useState(true)
  const courses = useStore(state => state.courses)
  const allCourses = useStore(state => state.allCourses)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (courses !== null && allCourses !== null) {
      setCourse([...courses, ...allCourses].find(sub => sub.slug === slug))
    }
  }, [courses, allCourses, slug])

  // check and set process
  useEffect(() => {
    if (typeof course === 'object' && course !== null && course !== undefined)
      setShowProcess(false)
  }, [course])

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
    <main className={clsx('text-gray-800')}>
      {typeof course === 'object' && course !== null && course !== undefined && (
        <>
          <Head>
            <title>Course - {course.name}(HIT)</title>
          </Head>
          <header className={clsx('min-h-[40vh] lg:h-[40vh] relative')}>
            {/* banner */}
            <img
              src={course.banner?.url}
              alt={course.name}
              className={clsx('absolute inset-0 object-cover w-full h-full')}
            />
            {/* course description */}
            <div
              className={clsx(
                'absolute inset-0 z-[1] pt-28 lg:pt-24 bg-black text-white bg-opacity-50 px-5 md:px-12 lg:px-24'
              )}
            >
              <div className="space-x-2 text-sm">
                <Link href="/dashboard/courses">
                  <a className="hover:underline">Courses</a>
                </Link>
                <span>&gt;</span>
                <span className="">{course.name}</span>
              </div>
              <h1
                className={clsx(
                  'text-xl lg:text-3xl xl:text-5xl text-center font-black mt-7 md:mt-16'
                )}
              >
                {course.name}
              </h1>
            </div>
          </header>
          <main className="px-5 py-8 md:px-12 lg:px-24">
            <section className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row">
              {course.with_certification === true && (
                <span className="flex items-center space-x-2">
                  <HiBadgeCheck className="w-auto h-6 text-primary-light" />
                  <span>Certified</span>
                </span>
              )}
              <span className="">
                <span className="hidden md:inline">Skill Level : </span>
                <span className="px-2 py-1 text-xs rounded-xl bg-primary-light">
                  {course.skill_level}
                </span>
              </span>
            </section>
            {/* ammount */}
            <div className="py-5">
              <span className="text-3xl font-black">
                GH¢ {course.base_price}
              </span>{' '}
              {/* base price */}
            </div>
            {/* layout - grid */}
            <section className="grid grid-cols-1 gap-16 mt-4 lg:grid-cols-[4fr,2fr]">
              {/* first */}
              <section className="divide-y">
                {/* overview */}
                <section className="py-5">
                  <h3 className="text-lg font-bold text-gray-500 lg:text-2xl">
                    Overview
                  </h3>
                  <p className="">{course.overview}</p>
                </section>
                {/* course path */}
                <section className="py-5 space-y-4">
                  {/* what you'll learn */}
                  <div className="">
                    <h3 className="font-bold text-gray-500 text-md lg:text-xl">
                      What you will learn
                    </h3>
                    <ul className="list-disc pl-7">
                      {course.what_you_will_learn.map(career => (
                        <li key={career.id} className="">
                          {career.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* curriculum */}
                  <section className="py-5">
                    <h3 className="font-bold text-gray-500 text-md lg:text-xl">
                      Curriculum
                    </h3>
                    {course.curriculum.map(curriculum => (
                      <Disclosure key={curriculum.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={clsx(
                                'flex items-center justify-between w-full border-[0.01px] px-4 py-2.5 bg-gray-50'
                              )}
                            >
                              <div className="flex items-center space-x-6">
                                <HiChevronDown
                                  className={clsx(
                                    'w-5 h-5 transform transition-all duration-200',
                                    {
                                      'rotate-180': open
                                    }
                                  )}
                                />
                                <h3 className="text-left">{curriculum.name}</h3>
                              </div>
                              <h4 className="">{curriculum.duration} hrs</h4>
                            </Disclosure.Button>
                            <Disclosure.Panel
                              className={clsx(
                                'w-full border-[0.01px] px-4 py-2.5'
                              )}
                            >
                              <ul className="pl-10 text-sm list-disc">
                                {curriculum.lessons.map(lesson => (
                                  <li key={lesson.id} className="">
                                    {lesson.name}
                                  </li>
                                ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </section>
                  {/* career path */}
                  <div className="">
                    <h3 className="font-bold text-gray-500 text-md lg:text-xl">
                      Career Paths
                    </h3>
                    <ul className="list-disc pl-7">
                      {course.career_paths.map(career => (
                        <li key={career} className="">
                          {career}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* prerequisites */}
                  <div className="">
                    <h3 className="font-bold text-gray-500 text-md lg:text-xl">
                      Prerequisites
                    </h3>
                    <ul className="list-disc pl-7">
                      {course.prerequisites.map(prerequisite => (
                        <li key={prerequisite.id} className="">
                          {prerequisite.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                {/* Description */}
                <section className="py-5">
                  <h3 className="text-lg font-bold text-gray-500 lg:text-2xl">
                    Description
                  </h3>
                  <p className="">
                    {
                      new DOMParser().parseFromString(
                        course.description,
                        'text/html'
                      ).documentElement.textContent
                    }
                  </p>
                </section>
              </section>

              {/* second */}
              <section className={clsx('')}>
                <section className={clsx('relative lg:sticky lg:top-28')}>
                  {/* navigate buttons */}
                  <button
                    type="button"
                    className={clsx(
                      'bg-gray-200 absolute left-0 transform translate-y-[20rem] -translate-x-6 h-8 w-8 md:h-12 md:w-12 rounded-full grid place-items-center',
                      { hidden: active <= 0 }
                    )}
                    onClick={() => {
                      active > 0 ? setActive(active - 1) : undefined
                    }}
                  >
                    <HiChevronLeft className="w-auto h-5 md:h-8" />
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      'bg-gray-200 absolute right-0 transform translate-y-[20rem] translate-x-6 h-8 w-8 md:h-12 md:w-12 rounded-full grid place-items-center',
                      { hidden: active >= course.instructors.length - 1 }
                    )}
                    onClick={() => {
                      active < course.instructors.length
                        ? setActive(active + 1)
                        : undefined
                    }}
                  >
                    <HiChevronRight className="w-auto h-5 md:h-8" />
                  </button>
                  <section
                    className={clsx(
                      'border-[0.1px] rounded-lg overflow-hidden shadow'
                    )}
                  >
                    {/* thumbnail */}
                    <section className="relative h-[25vh]">
                      <img
                        src={course.thumbnail.url}
                        alt={course.thumbnail.id}
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                      <div className="absolute z-[1] inset-0 text-white bg-gray-900 bg-opacity-60" />
                    </section>
                    <section className="py-5">
                      {/* instrutors */}
                      <div className="mt-4">
                        {course.instructors.map(
                          (instructor, i) =>
                            active === i && (
                              <motion.div
                                key={instructor.instructor_id}
                                className={clsx('p-5 space-y-4')}
                              >
                                <img
                                  src={instructor.profile_pic.url}
                                  alt={instructor.firstname}
                                  className="object-cover w-24 h-24 mx-auto -mt-24 md:-mt-32 relative z-[3] rounded-full xs:w-36 xs:h-36"
                                />
                                <div className="space-y-1 text-xs text-gray-500 sm:text-sm">
                                  <h1 className="font-black text-center uppercase sm:text-xl">{`${instructor.firstname} ${instructor.lastname}`}</h1>
                                  {/* social media */}
                                  <div className="flex items-center justify-center py-4 space-x-3">
                                    {instructor.social_media_handles.map(
                                      (handle, i) => {
                                        var Icon
                                        switch (handle.platform) {
                                          case 'LINKEDIN':
                                          Icon = (
                                            <FaLinkedin className="w-auto h-8" />
                                          )

                                            break
                                          case 'FACEBOOK':
                                            Icon = (
                                            <FaFacebook className="w-auto h-8" />
                                          )
                                            break
                                        case 'INSTAGRAM':
                                            Icon = (
                                              <FaInstagram className="w-auto h-8" />
                                          )
                                          break
                                          case 'TWITTER':
                                          Icon = (
                                              <FaTwitter className="w-auto h-8" />
                                          )
                                          break
                                          default:
                                          break
                                        }

                                        return (
                                          <a
                                            key={i}
                                            href={
                                              handle.url == '@url'
                                                ? '#'
                                                : handle.url
                                            }
                                            className="hover:text-gray-800"
                                          >
                                            {Icon}
                                          </a>
                                        )
                                      }
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HiOutlineMail className="w-auto h-5" />
                                    <span className="">{instructor.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HiPhone className="w-auto h-5" />
                                    <span className="">
                                      {instructor.phone_number}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-4 text-gray-500">
                                  {
                                    new DOMParser().parseFromString(
                                      instructor.bio,
                                      'text/html'
                                    ).documentElement.textContent
                                  }
                                </div>
                              </motion.div>
                            )
                        )}
                      </div>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </main>
        </>
      )}
    </main>
  )
}

export default Course

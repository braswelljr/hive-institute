import { useState, useEffect } from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'
import { url } from 'src/globals'
import ProcessSVG from '@/components/ProcessSVG'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { HiOutlineMail, HiPhone } from 'react-icons/hi'

export const getServerSideProps = async context => {
  const { id } = context.params // returns an object

  if (id === null || id === undefined) {
    return {
      redirect: {
        destination: '/dashboard/courses',
        permanent: false
      }
    }
  }

  return {
    props: { id } // will be passed to the page component as props
  }
}

const Course = ({ id }) => {
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const token = useStore(state => state.token)
  const payload = useStore(state => state.payload)
  const [showProcess, setShowProcess] = useState(true)

  // check and set process
  useEffect(() => {
    if (typeof course === 'object' && course !== null) setShowProcess(false)
  }, [course])

  if (course === null && payload !== null && token !== null) {
    fetch(`${url}/students/${payload.sub}/courses/${id}`, {
      method: 'GET',
      withCredentials: true,
      mode: 'cors',
      'Access-Control-Allow-Origin': '*',
      credentials: 'same-origin',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => setCourse(response))
      .catch(error => console.error(error))
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
    <main className={clsx('text-gray-800')}>
      {typeof course === 'object' && course !== null && (
        <>
          <Head>
            <title>Course - {course.name}(HIT)</title>
          </Head>
          <header className={clsx('min-h-[40vh] lg:h-[40vh] relative')}>
            {/* banner */}
            <img
              src={course.banner.url}
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
                  'text-xl lg:text-3xl text-center font-black mt-7 md:mt-16'
                )}
              >
                {course.name}
              </h1>
            </div>
          </header>
          <main className="px-5 py-8 md:px-12 lg:px-24">
            <section className="flex justify-end">
              <span className="">
                Skill Level :{' '}
                <span className="px-2 py-1 rounded-xl bg-secondary-light">
                  {course.skill_level}
                </span>
              </span>
            </section>
            {/* layout - grid */}
            <section className="grid grid-cols-1 gap-16 mt-4 lg:grid-cols-2">
              {/* first */}
              <section className="divide-y">
                {/* overview */}
                <section className="py-5">
                  <h3 className="text-lg font-bold text-gray-500 lg:text-2xl">
                    Overview
                  </h3>
                  <p className="">{course.overview}</p>
                </section>
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
                {/* instrutors */}
                <section className="py-5">
                  <h3 className="text-lg font-bold text-gray-500 lg:text-2xl">
                    Instructors
                  </h3>
                  <div className="grid mt-4">
                    {course.instructors.map(instructor => (
                      <div
                        key={instructor.instructor_id}
                        className={clsx('space-y-1')}
                      >
                        <div className="flex items-center justify-start">
                          <img
                            src={instructor.profile_pic.url}
                            alt={instructor.firstname}
                            className="object-cover w-24 h-24 rounded-full xs:w-36 xs:h-36"
                          />

                          <div className="p-2 space-y-1 text-xs text-gray-500 sm:text-sm">
                            <div className="font-black uppercase sm:text-xl">{`${instructor.firstname} ${instructor.lastname}`}</div>
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
                        </div>
                        <div className="mt-4 text-gray-500">
                          {
                            new DOMParser().parseFromString(
                              instructor.bio,
                              'text/html'
                            ).documentElement.textContent
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </section>
              {/* second */}
              <section className={clsx('border-[0.1px] shadow')}>
                {/* thumbnail */}
                <section className="relative">
                  <img
                    src={course.thumbnail.url}
                    alt={course.thumbnail.id}
                    className="relative inset-0 object-cover w-full h-auto"
                  />
                  <div className="absolute inset-0 text-white bg-gray-900 bg-opacity-60">
                    <div className="">Certification</div>
                  </div>
                </section>
                {/* career paths */}
                <section className="py-5">
                  <h3 className="text-lg font-bold text-gray-500 lg:text-2xl">
                    Career Paths
                  </h3>
                  <div className=""></div>
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

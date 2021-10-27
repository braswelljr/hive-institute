import { useState, useEffect } from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'
import { url } from 'src/gloabals'
import ProcessSVG from '@/components/ProcessSVG'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

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
    <main className={clsx('text-secondary-deep')}>
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
                  'text-xl lg:text-3xl text-center font-bold mt-7 md:mt-16'
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
                <span className="px-1.5 rounded-xl bg-secondary-light">
                  {course.skill_level}
                </span>
              </span>
            </section>
            {/* layout - grid */}
            <section className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6">
              {/* first */}
              <section className="space-y-6">
                <section className="">
                  <h3 className="text-lg font-bold lg:text-2xl">Overview</h3>
                  <p className="">{course.overview}</p>
                </section>
                <section className="">
                  <h3 className="text-lg font-bold lg:text-2xl">Description</h3>
                  <p className="">
                    {
                      new DOMParser().parseFromString(
                        course.description,
                        'text/html'
                      ).documentElement.textContent
                    }
                  </p>
                </section>
                {/* second */}
                <section className="">Second</section>
              </section>
            </section>
          </main>
        </>
      )}
    </main>
  )
}

export default Course

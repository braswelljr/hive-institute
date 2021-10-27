import { useState, useEffect } from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'
import { url } from '@/internals/auth.internal'
import ProcessSVG from '@/components/ProcessSVG'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
      <h1 className="text-2xl font-bold">Courses</h1>
      {typeof course === 'object' && course !== null && (
        <nav className={clsx('space-x-2')}>
          {' '}
          <Link href="/dashboard/courses">
            <a className="underline">Courses</a>
          </Link>
          <span>&gt;</span> <span className="">{course.name}</span>
        </nav>
      )}
    </main>
  )
}

export default Course

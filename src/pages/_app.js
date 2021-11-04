import '../styles/globals.css'
import 'react-phone-number-input/style.css'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import DashboardLayout from '@/layouts/DashboardLayout'
import CourseLayout from '@/layouts/CourseLayout'
import Head from 'next/head'
import useStore from '@/store/index'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicEffect'
import jwt from 'jsonwebtoken'
import shallow from 'zustand/shallow'
import { fetchCourses, fetchAllCourses } from '@/internals/fetches'
import useSWR from 'swr'
import { url } from 'src/globals'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  // store containers
  const appRef = useStore(state => state.appRef)
  const [token, setToken] = useStore(
    state => [state.token, state.setToken],
    shallow
  )
  const [payload, setPayload] = useStore(
    state => [state.payload, state.setPayload],
    shallow
  )
  const [profile, setProfile] = useStore(
    state => [state.profile, state.setProfile],
    shallow
  )
  const [courses, setCourses] = useStore(
    state => [state.courses, state.setCourses],
    shallow
  )
  const [allCourses, setAllCourses] = useStore(
    state => [state.allCourses, state.setAllCourses],
    shallow
  )

  useIsomorphicLayoutEffect(() => {
    let tok = localStorage.getItem(appRef)
    if (tok) {
      tok = JSON.parse(tok)
      tok = tok === null || tok === undefined ? tok : tok.token
      setToken(tok)
      setPayload(jwt.decode(tok))
    }
  }, [])

  // set token onload
  useIsomorphicLayoutEffect(() => {
    const loadStorage = () => {
      // set storage item if not available
      if (typeof Storage !== 'undefined') {
        let tok = localStorage.getItem(appRef)
        if (tok) {
          tok = JSON.parse(tok)
          tok = tok === null || tok === undefined ? tok : tok.token
          setToken(tok)
          setPayload(jwt.decode(tok))
        }
      }
    }

    // set token on load
    // subscribe
    window.addEventListener('load', loadStorage)
    return () => {
      // unsubscribe to load event
      window.removeEventListener('load', loadStorage)
    }
  }, [])

  // route user back to index if user doesn't have a token
  useIsomorphicLayoutEffect(() => {
    let tokenI = window.localStorage.getItem(appRef)
    if (!tokenI) {
      router.push({ pathname: '/' }) //->, undefined, { shallow: true }
    }
  }, [])

  // watch for local storage changes
  useIsomorphicLayoutEffect(() => {
    const loadStorageToken = () => {
      let tok = localStorage.getItem(appRef)
      if (tok) {
        tok = JSON.parse(tok)
        tok = tok === null || tok === undefined ? tok : tok.token
        setToken(tok)
        setPayload(jwt.decode(tok))
      }
    }
    window.addEventListener('storage', loadStorageToken())
    return () => {
      window.removeEventListener('storage', loadStorageToken())
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (payload !== null && token !== null) {
      if (courses === null || courses === undefined)
        fetchCourses(payload, token, setCourses)

      if (allCourses === null || allCourses === undefined)
        fetchAllCourses(token, setAllCourses)
    }
  }, [payload, token, profile, courses, allCourses])

  const options = {
    method: 'GET',
    withCredentials: true,
    mode: 'cors',
    'Access-Control-Allow-Origin': '*',
    credentials: 'same-origin',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

  // Profile
  const { data: profileData, error: profileError } = useSWR(
    payload !== null && token !== null
      ? `${url}/students/${payload.sub}`
      : null,
    url => fetch(url, options).then(res => res.json()),
    { refreshInterval: 1 }
  )
  if (!profileError) setProfile(profileData)

  // Courses
  // const { data: coursesData, error: coursesError } = useSWR(
  //   payload !== null && token !== null
  //     ? `${url}/students/${payload.sub}/courses`
  //     : null,
  //   url => fetch(url, options).then(res => res.json())
  // )
  // coursesError ? console.log(coursesError) : setCourses(coursesData)

  // // AllCourses
  // const { data: AllCoursesData, error: AllCoursesError } = useSWR(
  //   payload !== null && token !== null ? `${url}/courses` : null,
  //   url => fetch(url, options).then(res => res.json())
  // )
  // AllCoursesError ? console.log(AllCoursesError) : setAllCourses(AllCoursesData)

  /**
   * route is a dashboard page || component
   */
  if (router.pathname.split('/')[1] === 'dashboard') {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    )
  }

  if (router.pathname.split('/')[1] === 'courses') {
    return (
      <CourseLayout>
        <Component {...pageProps} />
      </CourseLayout>
    )
  }

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Hive Institute of Technology (HIT)</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link href="/log192.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default App

import '../styles/globals.css'
// import 'react-phone-number-input/style.css'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import DashboardStruct from '@/components/DashboardStruct'
import Head from 'next/head'
import useStore from '@/store/index'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicEffect'
import jwt from 'jsonwebtoken'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  // store containers
  const appRef = useStore(state => state.appRef)
  const setToken = useStore(state => state.setToken)
  const setPayload = useStore(state => state.setPayload)

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
      let tok = localStorage.getItem(appRef)
      if (tok) {
        tok = JSON.parse(tok)
        tok = tok === null || tok === undefined ? tok : tok.token
        setToken(tok)
        setPayload(jwt.decode(tok))
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
      router.push({ pathname: '/' })
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

  /**
   * route is a dashboard page || component
   */
  if (router.pathname.split('/')[1] === 'dashboard') {
    return (
      <DashboardStruct>
        <Component {...pageProps} />
      </DashboardStruct>
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

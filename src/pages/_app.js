import '../styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AppProvider from '../context/AppContext'
import DashboardStruct from '@/components/DashboardStruct'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Hive Institute of Technology</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link href="/log192.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <AppProvider>
        {router.pathname.split('/')[1] === 'dashboard' ? (
          <DashboardStruct>
            <Component {...pageProps} />
          </DashboardStruct>
        ) : (
          <Component {...pageProps} />
        )}
      </AppProvider>
    </>
  )
}

export default App

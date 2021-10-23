import { useState } from 'react'
import clsx from 'clsx'
// import Signup from '@/components/Signup'
import Login from '@/components/Login'

const Index = () => {
  const [auth, setAuth] = useState('login')

  return (
    <main
      className={clsx(
        'w-full min-h-screen lg:h-screen flex flex-col lg:flex-row'
      )}
    >
      <div className="relative h-[50vh] lg:w-1/2 w-full lg:h-full">
        <img
          src={require('@/img/learn3.png')}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-[1] backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-50 grid place-items-center">
          <div className="w-4/5 space-y-8">
            <img
              src={require('@/img/header2.png')}
              alt="logo"
              className="w-auto h-16 mx-auto sm:h-24 md:h-36"
            />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'w-full relative lg:min-h-screen lg:w-1/2 lg:flex lg:items-center'
        )}
      >
        <div className="max-w-2xl px-8 py-12 mx-auto space-y-6 lg:space-y-0 md:px-16">
          {/* Header */}
          <div className="w-full">
            <h1 className="text-3xl font-extrabold text-center capitalize text-primary-semi">
              {auth === 'login' ? 'Sign in' : 'Sign Up'}
            </h1>
          </div>

          {/* {auth === 'signup' ? (
            <Signup setAuth={setAuth} />
          ) : ( */}
          <Login setAuth={setAuth} />
          {/* )} */}
        </div>
      </div>
    </main>
  )
}

export default Index

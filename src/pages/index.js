import { useState } from 'react'
import clsx from 'clsx'
import Signup from '@/components/Signup'
import Login from '@/components/Login'

const Index = () => {
  const [auth, setAuth] = useState('login')

  return (
    <main className={clsx('w-full h-screen flex')}>
      <div className="relative hidden w-1/2 h-full lg:block">
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
              className="w-auto mx-auto h-36"
            />
            hello
          </div>
        </div>
      </div>
      <div
        className={clsx('w-full min-h-screen lg:w-1/2', {
          'lg:flex items-center justify-center': auth == 'login'
        })}
      >
        {/* Header */}
        <div className="max-w-2xl px-8 mx-auto md:px-16">
          <div className="w-full pt-12 space-y-6 lg:space-y-0">
            <div className="flex items-center justify-center w-auto mx-auto space-x-5 lg:hidden">
              <img
                src={require('@/img/logo2.png')}
                alt="logo"
                className="w-auto h-20 md:h-20"
              />
              {/* <div
                className="font-black xs:text-xl md:text3xl w-72 lg:text-5xl"
                style={{ color: '#454e4d' }}
              >
                <div className="">Hive Institute of</div>{' '}
                <div className="">Technology</div>
              </div> */}
            </div>
            <h1 className="text-3xl font-extrabold text-center capitalize text-primary-semi">
              {auth == 'login' ? 'Sign in' : 'Sign Up'}
            </h1>
          </div>

          {auth == 'login' ? (
            <Login setAuth={setAuth} />
          ) : (
            <Signup setAuth={setAuth} />
          )}
        </div>
      </div>
    </main>
  )
}

export default Index

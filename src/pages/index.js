import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const Index = () => {
  const [auth, setAuth] = useState('login')
  const [loginEmail, setLoginEmail] = useState({ value: '', valid: false })
  const [loginPassword, setLoginPassword] = useState({
    value: '',
    valid: false
  })

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
            // Sign in
            <form method="POST" className="mt-12 space-y-5 text-gray-700">
              <div className="text-lg rounded-md">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={loginEmail.value}
                  onChange={e => {
                    setLoginEmail({
                      value: e.target.value,
                      valid: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        e.target.value.trim()
                      )
                        ? true
                        : false
                    })
                  }}
                  className={clsx(
                    'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none',
                    { 'border-red-500': !loginEmail.valid }
                  )}
                />
                {!loginEmail.valid && (
                  <span className="text-red-500">Invalid email</span>
                )}
              </div>
              <div className="text-lg rounded-md">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  type="password"
                  name="email"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={loginPassword.value}
                  onChange={e => {
                    setLoginPassword({
                      value: e.target.value,
                      valid: loginPassword.value.length >= 8 ? true : false
                    })
                    console.log(loginPassword.valid, loginPassword.value.length)
                  }}
                  className={clsx(
                    'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none',
                    { 'border-red-500': !loginPassword.valid }
                  )}
                />
                {!loginPassword.valid && (
                  <span className="text-red-500">Invalid Password</span>
                )}
              </div>
              <Link href="/dashboard/courses">
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-lg font-semibold text-white rounded bg-primary-semi hover:bg-primary-moderate focus:outline-none"
                >
                  Sign In
                </button>
              </Link>
              <p className="text-center">
                Don't have an account,{' '}
                <button
                  type='="button'
                  className="cursor-pointer text-primary-deep"
                  onClick={() => setAuth('signup')}
                >
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            // Sign up
            <form method="POST" className="mt-12 space-y-5 text-gray-700">
              <div className="rounded-md text-md">
                <label htmlFor="name" className="">
                  Fullname
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Fullname"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none"
                />
              </div>
              <div className="rounded-md text-md">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none"
                />
              </div>
              <div className="rounded-md text-md">
                <label htmlFor="phone" className="" aria-label="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder=""
                  autoComplete="off"
                  aria-placeholder="233-500-181-106"
                  className="w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none"
                />
              </div>
              <div className="rounded-md text-md">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  type="password"
                  name="email"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none"
                />
              </div>
              <div className="rounded-md text-md">
                <label htmlFor="confirm-password" className="">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="email"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none"
                />
              </div>
              <Link href="/dashboard/courses">
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-lg font-semibold text-white rounded bg-primary-semi hover:bg-primary-moderate focus:outline-none"
                >
                  Sign Up
                </button>
              </Link>
              <p className="text-center">
                Already have an account,{' '}
                <span
                  className="cursor-pointer text-primary-semi"
                  onClick={() => setAuth('login')}
                >
                  Sign In
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default Index

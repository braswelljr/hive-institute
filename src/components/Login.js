import { useState, useContext, useEffect, Fragment } from 'react'
import clsx from 'clsx'
import { BiError } from 'react-icons/bi'
import { signIn } from 'src/workers/auth.internal'
import { AppContext } from '../context/AppContext'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Login = ({ setAuth }) => {
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState({ value: '', valid: true })
  const [loginPassword, setLoginPassword] = useState({
    value: '',
    valid: true
  })
  const { appRef, token, setToken } = useContext(AppContext)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showProcess, setShowProcess] = useState(false)

  // remove notification alert
  useEffect(() => {
    window.setTimeout(() => setErrorMessage(null), 15000)
  }, [errorMessage])

  const handleSubmit = e => {
    // prevent default behavior
    e.preventDefault()

    if (
      loginEmail.value.length > 0 &&
      loginEmail.valid === true &&
      loginPassword.value.length > 0 &&
      loginPassword.valid === true
    ) {
      // animate spin to show process
      setShowProcess(true)
      // signIn value and set token
      signIn(loginEmail.value, loginPassword.value)
        .then(response => {
          if (response.error) {
            setErrorMessage(response.error)
          } else {
            setToken(response)
            // set storage value with Token
            console.log(token)
            if (typeof Storage !== 'undefined') {
              window.localStorage.setItem(appRef, JSON.stringify(token))
            }
            // route user to dashboard based on token
            router.push('/dashboard/courses')
          }
          // animate process stop
          setShowProcess(false)
        })
        .catch(error => {
          console.log(error)
          // Send error message
          setErrorMessage('Something went wrong!')
          // animate process stop
          setShowProcess(false)
        })
    } else {
      if (loginPassword.value.length <= 0 || loginPassword.valid === false) {
        setLoginPassword({ ...loginPassword, valid: false })
      }
      if (loginEmail.value.length <= 0 || loginEmail.valid === false) {
        setLoginEmail({ ...loginEmail, valid: false })
      }
    }
  }

  return (
    <Fragment>
      {errorMessage !== null && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 200 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                // type: 'spring',
                duration: 0.5
                // stiffness: 260,
                // damping: 20
              }
            }
          }}
          className={clsx(
            'absolute inset-x-0 max-w-lg text-center px-3 py-2 mx-4 text-white rounded-lg sm:mx-auto top-4 bg-primary-light'
          )}
        >
          {errorMessage}
        </motion.div>
      )}
      <form
        method="POST"
        className="mt-12 space-y-5 text-gray-700"
        onSubmit={handleSubmit}
      >
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
            onFocus={() =>
              setLoginEmail({
                ...loginEmail,
                valid: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                  loginEmail.value.trim()
                )
                  ? true
                  : false
              })
            }
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
            <span className="inline-flex items-center text-xs text-red-500">
              <BiError className="inline w-auto h-4 mr-2" />
              <span>Invalid Email</span>
            </span>
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
            onFocus={() =>
              setLoginPassword({
                ...loginPassword,
                valid: loginPassword.value.length > 0 ? true : false
              })
            }
            onChange={e => {
              setLoginPassword({
                value: e.target.value,
                valid: loginPassword.value.length > 0 ? true : false
              })
            }}
            className={clsx(
              'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none',
              { 'border-red-500': !loginPassword.valid }
            )}
          />
          {!loginPassword.valid && (
            <span className="items-center text-xs text-red-500 nline-flex">
              <BiError className="inline w-auto h-4 mr-2" />
              <span>Invalid Password</span>
            </span>
          )}
        </div>
        {/* <Link href="/verify"> */}
        <button
          type="submit"
          className="flex items-center justify-center w-full px-3 py-2 text-lg font-semibold text-white rounded bg-primary-semi hover:bg-primary-moderate focus:outline-none"
        >
          {showProcess ? (
            <svg
              className="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <span className="">Sign In</span>
          )}
        </button>
        {/* </Link> */}
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
    </Fragment>
  )
}

export default Login

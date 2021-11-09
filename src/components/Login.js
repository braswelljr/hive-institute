import { useState, useEffect, Fragment } from 'react'
import clsx from 'clsx'
import { BiError } from 'react-icons/bi'
import { signIn } from 'src/workers/auth.internal'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import useStore from '@/store/index'
import ProcessSVG from '@/components/ProcessSVG'
import jwt from 'jsonwebtoken'

const Login = () => {
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState({ value: '', valid: true })
  const [loginPassword, setLoginPassword] = useState({
    value: '',
    valid: true
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [showProcess, setShowProcess] = useState(false)
  // store containers
  const appRef = useStore(state => state.appRef)
  const setToken = useStore(state => state.setToken)
  const setPayload = useStore(state => state.setPayload)

  // remove notification alert
  useEffect(() => {
    window.setTimeout(() => setErrorMessage(null), 10000)
  }, [errorMessage])

  function handleSubmit(e) {
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
            setToken(response.token)
            // handlestorage
            // set storage value with Token
            window.localStorage.setItem(appRef, JSON.stringify(response))
            // set payload value
            setPayload(jwt.decode(response.token))
            // route user to dashboard based on token
            router.push({ pathname: '/dashboard/courses' })
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
      if (loginEmail.value.length <= 0 || loginEmail.valid === false) {
        setLoginEmail({ ...loginEmail, valid: false })
      }
      if (loginPassword.value.length <= 0 || loginPassword.valid === false) {
        setLoginPassword({ ...loginPassword, valid: false })
      }
    }
  }

  return (
    <Fragment>
      {errorMessage !== null && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                // type: 'spring',
                duration: 0.5,
                // stiffness: 260,
                damping: 20
              }
            }
          }}
          className={clsx(
            'absolute inset-x-0 max-w-lg text-center px-3 py-2 mx-4 text-white rounded-lg sm:mx-auto top-4 bg-primary-cheese'
          )}
        >
          {errorMessage}
        </motion.div>
      )}
      <form
        method="POST"
        className="block w-full mt-16 space-y-5 text-gray-700"
        onSubmit={handleSubmit}
        id="login-form"
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
                value: e.target.value.trim(),
                valid: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                  e.target.value.trim()
                )
                  ? true
                  : false
              })
            }}
            className={clsx(
              'w-full px-3 py-2 bg-primary-thin border rounded focus:outline-none',
              { 'border-red-500': !loginEmail.valid }
            )}
          />
          {!loginEmail.valid && (
            <div className="flex items-center w-full text-xs text-red-500">
              <BiError className="inline w-auto h-4 mr-2" />
              <span>Invalid Email</span>
            </div>
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
                valid: loginPassword.value.trim().length > 5 ? true : false
              })
            }
            onChange={e => {
              setLoginPassword({
                value: e.target.value.trim(),
                valid: e.target.value.trim().length > 5 ? true : false
              })
            }}
            className={clsx(
              'w-full px-3 py-2 bg-primary-thin border rounded focus:outline-none',
              { 'border-red-500': !loginPassword.valid }
            )}
          />
          {!loginPassword.valid && (
            <div className="flex items-center w-full text-xs text-red-500">
              <BiError className="inline w-auto h-4 mr-2" />
              <span>Invalid Password</span>
            </div>
          )}
        </div>
        {/* <Link href="/verify"> */}
        <button
          type="submit"
          disabled={
            loginEmail.value.length > 0 && loginPassword.value.length > 0
              ? false
              : true
          }
          className="flex items-center justify-center w-full px-3 py-2 text-lg font-semibold text-white rounded disabled:bg-primary-light bg-primary-cheese focus:outline-none"
        >
          {showProcess ? (
            <ProcessSVG className="w-5 h-5 text-white" />
          ) : (
            <span className="">Sign In</span>
          )}
        </button>
        {/* </Link> */}
        {/* <p className="text-center">
          Don't have an account,{' '}
          <button
            type='="button'
            className="cursor-pointer text-primary-light"
            onClick={() => setAuth('signup')}
          >
            Sign Up
          </button>
        </p> */}
      </form>
    </Fragment>
  )
}

export default Login

// /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ -> min 8 letter password, with at least a symbol, upper and lower case letters and a number

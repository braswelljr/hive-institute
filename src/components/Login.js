import { useState, useContext } from 'react'
import clsx from 'clsx'
// import Link from 'next/link'
import { BiError } from 'react-icons/bi'
import { signIn } from 'src/workers/auth.internal'
import { AppContext } from '../context/AppContext'
import { useRouter } from 'next/router'
import { Alert } from '@reach/alert'

const Login = ({ setAuth }) => {
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState({ value: '', valid: true })
  const [loginPassword, setLoginPassword] = useState({
    value: '',
    valid: true
  })
  const { appRef, token, setToken } = useContext(AppContext)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = e => {
    // prevent default behavior
    e.preventDefault()

    if (
      loginEmail.value.length > 0 &&
      loginEmail.valid === true &&
      loginPassword.value.length > 0 &&
      loginPassword.valid === true
    ) {
      // signIn value and set token
      signIn(loginEmail.value, loginPassword.value).then(response => {
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
        className="w-full px-3 py-2 text-lg font-semibold text-white rounded bg-primary-semi hover:bg-primary-moderate focus:outline-none"
      >
        Sign In
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
  )
}

export default Login

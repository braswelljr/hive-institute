import { useState } from 'react'
import clsx from 'clsx'
import { BiError } from 'react-icons/bi'
import Link from 'next/link'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

const Signup = ({ setAuth }) => {
  const [signupName, setSignupName] = useState({ value: '', valid: true })
  const [signupEmail, setSignupEmail] = useState({ value: '', valid: true })
  const [signupPhone, setSignupPhone] = useState('')
  const [signupPassword, setSignupPassword] = useState({
    value: '',
    valid: true
  })
  const [signupCPassword, setSignupCPassword] = useState({
    value: '',
    valid: true
  })

  return (
    <form method="POST" className="mt-12 space-y-5 text-gray-700">
      <div className="rounded-md text-md">
        <label htmlFor="name" className="">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          autoComplete="off"
          value={signupName.value}
          onFocus={() =>
            setSignupName({
              ...signupName,
              valid: signupName.value.length > 0 ? true : false
            })
          }
          onChange={e => {
            setSignupName({
              value: e.target.value,
              valid: signupName.value.length > 0 ? true : false
            })
          }}
          className={clsx(
            'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none',
            { 'border-red-500': !signupName.valid }
          )}
        />
        {!signupName.valid && (
          <span className="inline-flex items-center text-xs text-red-500">
            <BiError className="inline w-auto h-4 mr-2" />
            <span>Name field should not be empty</span>
          </span>
        )}
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
          value={signupEmail.value}
          onFocus={() =>
            setSignupEmail({
              ...signupEmail,
              valid: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                signupEmail.value.trim()
              )
                ? true
                : false
            })
          }
          onChange={e => {
            setSignupEmail({
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
            { 'border-red-500': !signupEmail.valid }
          )}
        />
        {!signupEmail.valid && (
          <span className="inline-flex items-center text-xs text-red-500">
            <BiError className="inline w-auto h-4 mr-2" />
            <span>Invalid Email</span>
          </span>
        )}
      </div>
      <div className="rounded-md text-md">
        <label htmlFor="phone" className="" aria-label="phone">
          Phone
        </label>
        <PhoneInput
          flags={flags}
          international
          countryCallingCodeEditable={false}
          withCountryCallingCode={true}
          defaultCountry="GH"
          placeholder="50 018 1106"
          value={signupPhone}
          onChange={setSignupPhone}
          error={
            signupPhone
              ? isValidPhoneNumber(signupPhone)
                ? undefined
                : 'Invalid phone number'
              : 'Phone number required'
          }
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
          value={signupPassword.value}
          onFocus={() =>
            setSignupPassword({
              ...signupPassword,
              valid: signupPassword.value.length >= 8 ? true : false
            })
          }
          onChange={e => {
            setSignupPassword({
              value: e.target.value,
              valid: signupPassword.value.length >= 8 ? true : false
            })
          }}
          className={clsx(
            'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none',
            { 'border-red-500': !signupPassword.valid }
          )}
        />
        {!signupPassword.valid && (
          <span className="inline-flex items-center text-xs text-red-500">
            <BiError className="inline w-auto h-4 mr-2" />
            <span>Password should have a length of 8 or more</span>
          </span>
        )}
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
          value={signupCPassword.value}
          onFocus={() =>
            setSignupCPassword({
              ...signupCPassword,
              valid:
                signupCPassword.value === signupPassword.value ? true : false
            })
          }
          onChange={e => {
            setSignupCPassword({
              value: e.target.value,
              valid:
                signupCPassword.value === signupPassword.value ? true : false
            })
            console.log(signupCPassword, signupPassword)
          }}
          className={clsx(
            'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none',
            { 'border-red-500': !signupCPassword.valid }
          )}
        />
        {!signupCPassword.valid && (
          <span className="inline-flex items-center text-xs text-red-500">
            <BiError className="inline w-auto h-4 mr-2" />
            <span>Passwords do not match</span>
          </span>
        )}
      </div>
      <Link href="/verify">
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
  )
}

export default Signup

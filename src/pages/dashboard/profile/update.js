import { useState, useEffect } from 'react'
import clsx from 'clsx'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import ProcessSVG from '@/components/ProcessSVG'
import useStore from '@/store/index'
import { motion } from 'framer-motion'
import { FiUser } from 'react-icons/fi'
import Link from 'next/link'
import { url } from 'src/globals'

const Update = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState(undefined)
  const [dob, setDob] = useState('')
  const [showProcess, setShowProcess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const profile = useStore(state => state.profile)
  const token = useStore(state => state.token)
  const payload = useStore(state => state.payload)

  // remove notification alert
  useEffect(() => {
    window.setTimeout(() => setErrorMessage(null), 10000)
  }, [errorMessage])

  const handleSubmit = e => {
    e.preventDefault()
    setShowProcess(true)

    if (token !== null || payload !== null || payload !== undefined) {
      fetch(`${url}/students/${payload.sub}`, {
        method: 'PUT',
        withCredentials: true,
        mode: 'cors',
        'Access-Control-Allow-Origin': '*',
        credentials: 'same-origin',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: payload.sub,
          ...(firstname.length > 0 ? { firstname: firstname } : undefined),
          ...(lastname.length > 0 ? { lastname: lastname } : undefined),
          ...(phone !== undefined ? { phoneNumber: phone } : undefined),
          ...(dob > 0 ? { dob: dob } : undefined)
        })
      })
        .then(() => {
          setShowProcess(false)
          setFirstname('')
          setLastname('')
          setDob('')
          setPhone(undefined)
          setErrorMessage('Profile Updated Sucessfully')
        })
        .catch(err => {
          console.log('Oops! Something Happened', err)
          setErrorMessage('Oops! Something Happened')
          setShowProcess(false)
        })
    }
  }

  return (
    <main className="relative text-secondary-deep">
      <nav className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Update Profile</h1>
      </nav>
      <section className={clsx('mt-8')}>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className={clsx('space-y-6 max-w-4xl mx-auto')}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* First name */}
            <div className="">
              <label htmlFor="firstname" className={clsx('')}>
                Firstname
              </label>
              <input
                type="text"
                name=""
                id="firstname"
                value={firstname}
                onChange={e => {
                  setFirstname(e.target.value)
                }}
                autoComplete="off"
                placeholder={
                  profile === null || profile === undefined
                    ? 'Firstname'
                    : profile?.firstname
                }
                className={clsx(
                  'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none'
                )}
              />
            </div>
            {/* Last Name */}
            <div className="">
              <label htmlFor="lastname" className={clsx('')}>
                Lastname
              </label>
              <input
                type="text"
                name=""
                id="laststname"
                value={lastname}
                onChange={e => {
                  setLastname(e.target.value)
                }}
                autoComplete="off"
                placeholder={
                  profile === null || profile === undefined
                    ? 'Lastname'
                    : profile?.lastname
                }
                className={clsx(
                  'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none'
                )}
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="">
            <label htmlFor="dob" className={clsx('')}>
              Date of Birth
            </label>
            <input
              type="date"
              name=""
              id="dob"
              value={dob}
              onChange={e => {
                setDob(e.target.value)
              }}
              autoComplete="off"
              className={clsx(
                'w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none'
              )}
            />
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
              value={phone}
              onChange={setPhone}
              error={
                phone
                  ? isValidPhoneNumber(phone)
                    ? undefined
                    : 'Invalid phone number'
                  : 'Phone number required'
              }
            />
          </div>

          <button
            type="submit"
            disabled={
              firstname.length > 0 ||
              lastname.length > 0 ||
              dob.length > 0 ||
              phone !== undefined
                ? false
                : true
            }
            className="flex items-center justify-center w-full px-3 py-2 text-lg font-semibold rounded disabled:opacity-50 bg-secondary-light focus:outline-none"
          >
            {showProcess ? (
              <ProcessSVG className="w-6 h-6" />
            ) : (
              <span className="">Update</span>
            )}
          </button>
        </form>

        {/*  */}
        <section className="max-w-4xl mx-auto mt-12">
          <div className="flex items-center justify-end">
            {/* Update Button */}
            <Link href="/dashboard/profile">
              <button
                type="button"
                className={clsx(
                  'px-4 text-xs py-2 rounded-md flex space-x-2 items-center font-bold bg-secondary-light transform transition-all hover:translate-y-0.5'
                )}
              >
                <FiUser className="w-auto h-5" />
                <span>View Profile</span>
              </button>
            </Link>
          </div>
        </section>
      </section>

      {/*  */}
      {errorMessage !== null && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -50 },
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
            'relative inset-x-0 max-w-4xl w-full text-center px-3 py-2 mx-4 rounded-lg sm:mx-auto bg-secondary-light mt-10'
          )}
        >
          {errorMessage}
        </motion.div>
      )}
    </main>
  )
}

export default Update

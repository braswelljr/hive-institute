import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const Verify = () => {
  return (
    <main className={clsx('grid min-h-screen px-5 place-items-center')}>
      <div className="w-full max-w-lg p-5 rounded-2xl">
        <h1 className="py-1.5 text-2xl font-black text-center text-primary-semi">
          Verify Email !
        </h1>
        <p className="text-center py-2.5">
          Check the email sent to{' '}
          <em className="text-gray-600">hiveinstitute@gmail.com</em>
        </p>
        <form method="post" className={clsx('mt-5 space-y-8')}>
          <div className="">
            <label htmlFor="otp">Verifcation Code</label>
            <input
              type="text"
              name="otp"
              id="otp"
              className={clsx(
                'w-full mx-auto tracking-widest block px-3 py-2 text-center bg-yellow-100 border rounded focus:outline-none'
              )}
            />
          </div>
          <Link href="/dashboard/courses">
            <button
              type="submit"
              className="block w-full px-3 py-2 mx-auto text-lg font-semibold text-white rounded bg-primary-semi hover:bg-primary-moderate focus:outline-none"
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
    </main>
  )
}

export default Verify

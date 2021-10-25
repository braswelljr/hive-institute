import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { getProfile } from '@/internals/profile.internal'
import useStore from '@/store/index'
import shallow from 'zustand/shallow'
import ProcessSVG from '@/components/ProcessSVG'

const Profile = () => {
  const payload = useStore(state => state.payload)
  const token = useStore(state => state.token)
  const [profile, setProfile] = useStore(
    state => [state.profile, state.setProfile],
    shallow
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const [showProcess, setShowProcess] = useState(true)

  // check and set process
  useEffect(() => {
    if (typeof profile === 'object' && profile !== null) setShowProcess(false)
  }, [profile])

  if (payload !== null && token !== null) {
    getProfile(payload, token)
      .then(response => {
        if (response.error) {
          setErrorMessage(response.error)
          console.log(response.error)
        } else {
          setProfile(response)
          setShowProcess(false)
        }
      })
      .catch(error => {
        console.error(error)
        // Send error message
        setErrorMessage('Something went wrong!')
      })
  }

  if (showProcess) {
    return (
      <main className="text-secondary-deep">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="min-h-[75vh] grid place-content-center">
          <ProcessSVG className={clsx('h-7 w-7 md:h-12 md:w-12')} />
        </div>
      </main>
    )
  }

  return (
    <main className="pb-4 text-secondary-deep">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className={clsx('space-y-6')}>
        {/* Personal Details */}
        <section className={clsx('mt-5')}>
          <div className="px-4 py-2 rounded-md bg-secondary-light">
            <h2 className="text-sm font-bold">Personal Details</h2>
          </div>
          {/* Body */}
          {typeof profile === 'object' && profile !== null && (
            <div className="flex flex-col items-center mt-10 md:flex-row">
              <div className="grid w-full md:w-2/5 md:h-[30vh] place-content-center">
                {/* Image */}
                <div className="w-[12.5rem] h-[12.5rem] lg:w-[16.5rem] lg:h-[16.5rem] overflow-hidden rounded-full">
                  <img
                    src={profile.profilePic.url}
                    alt="Avatar"
                    className={clsx('w-full h-full object-cover')}
                  />
                </div>
              </div>
              {/* Values */}
              <div className="w-full space-y-3 text-xs lg:text-base md:w-3/5">
                {/* name */}
                <div className={clsx('space-x-2 flex items-start')}>
                  <div className="">Name</div> :{' '}
                  <div className="text-gray-800">
                    {profile.firstname + ' ' + profile.lastname}
                  </div>
                </div>
                {/* name */}
                <div className={clsx('space-x-2 flex items-start')}>
                  <div className="">Nationality</div> :{' '}
                  <div className="text-gray-800">{profile.nationality}</div>
                </div>
                {/* name */}
                <div className={clsx('space-x-2 flex items-start')}>
                  <div className="">Name</div> :{' '}
                  <div className="text-gray-800">
                    {profile.firstname + ' ' + profile.lastname}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* Account Details */}
        <section className={clsx('mt-5')}>
          <div className="px-4 py-2 rounded-md bg-secondary-light">
            <h2 className="text-sm font-bold">Account Details</h2>
          </div>
          {/* Body */}
          <div className="w-full mt-4 space-y-3 text-xs md:w-3/5 lg:text-base md:mx-4">
            {}
          </div>
        </section>

        {/* Update Button */}
        <button
          type="button"
          className={clsx(
            'px-4 text-xs py-2 rounded-md font-bold bg-secondary-light transform transition-all hover:translate-y-0.5'
          )}
        >
          Update Profile
        </button>
      </div>
    </main>
  )
}

export default Profile

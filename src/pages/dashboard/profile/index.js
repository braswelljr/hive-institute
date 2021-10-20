import clsx from 'clsx'

const Profile = () => {
  // dummy data
  const profile = {
    Name: 'Felicia Raiden',
    'Date of Birth': '14 / 04 / 1999',
    Nationality: 'Nigerian',
    Email: 'feliciareid@gmail.com',
    'Phone Number': '(233) 547 786 567',
    'House Address': '2972 Westheimer rd. Santa ana. Illinois 85486'
  }
  const account = {
    Status: ['Status'],
    Course: ['UI Development', 'Mobile Development']
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
          <div className="flex flex-col items-center mt-10 md:flex-row">
            <div className="grid w-full md:w-2/5 md:h-[30vh] place-content-center">
              {/* Image */}
              <div className="w-[12.5rem] h-[12.5rem] lg:w-[16.5rem] lg:h-[16.5rem] overflow-hidden rounded-full">
                <img
                  src={require('@/img/profile.png')}
                  alt="Avatar"
                  className={clsx('w-full h-full object-cover')}
                />
              </div>
            </div>
            {/* Values */}
            <div className="w-full space-y-3 text-xs lg:text-base md:w-3/5">
              {Object.entries(profile).map(([key, value], i) => (
                <div className={clsx('space-x-2 flex items-start')} key={i}>
                  <div className="">{key}</div> :{' '}
                  <div className="text-gray-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Account Details */}
        <section className={clsx('mt-5')}>
          <div className="px-4 py-2 rounded-md bg-secondary-light">
            <h2 className="text-sm font-bold">Account Details</h2>
          </div>
          {/* Body */}
          <div className="w-full mt-4 space-y-3 text-xs md:w-3/5 lg:text-base md:mx-4">
            {Object.entries(account).map(([key, value], i) => (
              <div className={clsx('flex items-start space-x-2')} key={i}>
                <div className="">{key} :</div>
                <div className="space-x-1 text-gray-800">
                  {Array.isArray(value)
                    ? value.map((val, k) => (
                        <span key={val}>
                          {k === 0 ? '' : ', '}
                          {val}
                        </span>
                      ))
                    : value}
                </div>
              </div>
            ))}
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

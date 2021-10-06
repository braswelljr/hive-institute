import clsx from 'clsx'

const Index = () => {
  return (
    <main className={clsx('w-full h-screen flex')}>
      <div className="relative hidden w-1/2 h-full lg:block">
        <img
          src={require('@/img/learn3.png')}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-[1] backdrop-filter bg-gray-900 bg-opacity-50 backdrop-blur-sm grid place-items-center">
          <div className="w-4/5 space-y-8">
            <img
              src={require('@/img/logo.png')}
              alt="logo"
              className="w-40 h-auto mx-auto"
            />
            <h1 className="text-4xl font-black text-center text-primary-moderate lg:text-5xl">
              Hive Institute of Technology
            </h1>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="w-full lg:w-1/2">
        <div className="max-w-2xl min-h-screen px-8 mx-auto md:px-16">
          <div className="w-full pt-12 space-y-12">
            <div className="flex justify-center space-x-5 lg:hidden">
              <img
                src={require('@/img/logo.png')}
                alt="logo"
                className="w-auto h-20"
              />
              <div className="text-3xl font-black text-gray-700 w-72 lg:text-5xl">
                Hive Institute of Technology
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-center capitalize text-primary-moderate">
              Sign in
            </h1>
          </div>
          <form method="POST" className="mt-12 space-y-5 text-gray-700">
            <div className="text-xl rounded-md">
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
            <div className="text-xl rounded-md">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                name="email"
                id="password"
                placeholder="Email"
                autoComplete="off"
                className="w-full px-3 py-2 bg-yellow-100 border rounded focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-xl font-bold text-white rounded bg-primary-moderate hover:bg-primary-deep focus:outline-none"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Index

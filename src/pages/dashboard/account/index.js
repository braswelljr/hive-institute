import clsx from 'clsx'

const Account = () => {
  const accountInfo = {
    'Account Name': 'Hive Institute',
    Bank: 'Stanbic Bank',
    'Account Number': '1677745397669',
    'Mobile Network': 'MTN',
    'Mobile Money': '054-778-6567',
    'BTC Signature': '923849808-2347686'
  }
  const accountDetails = {
    'Course Fees': 80.0,
    'Additional Fees': -40.0,
    Total: 40.0
  }

  return (
    <main className="pb-4 text-gray-700">
      <h1 className="text-2xl font-bold">Account</h1>
      <div className={clsx('space-y-6 text-sm')}>
        <section className={clsx('mt-5')}>
          <div className="px-4 py-2 text-base rounded-md bg-primary-thin">
            <h2 className="font-bold">Account Information</h2>
          </div>
          <div className="grid w-full gap-2 mt-4 text-xs lg:text-base md:mx-4 lg:grid-cols-2">
            {Object.entries(accountInfo).map(([key, value], i) => (
              <div className={clsx('space-x-2 flex items-start')} key={i}>
                <div className="text-gray-600">{key}</div> :{' '}
                <div className="font-medium text-gray-800">{value}</div>
              </div>
            ))}
          </div>
        </section>
        <section className={clsx('mt-5')}>
          <div className="px-4 py-2 text-base rounded-md bg-primary-thin">
            <h2 className="font-bold">Account Details</h2>
          </div>

          <div className="w-full mt-4 space-y-2 text-xs lg:text-base md:mx-4">
            {Object.entries(accountDetails).map(([key, value], i) => (
              <div className={clsx('flex items-start space-x-2')} key={i}>
                <div className="text-gray-600">{key} :</div>
                <div className="space-x-1 font-medium text-gray-800">
                  $ {value}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Account

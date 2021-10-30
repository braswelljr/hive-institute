import React from 'react'
import { useRouter } from 'next/router'
import { HiChevronLeft } from 'react-icons/hi'

const Update = () => {
  const router = useRouter()
  return (
    <main>
      <div className="">
        <button
          type="button"
          className="px-3 py-2"
          onClick={() => router.back()}
        >
          <HiChevronLeft className="w-auto h-7" />
        </button>
      </div>
    </main>
  )
}

export default Update

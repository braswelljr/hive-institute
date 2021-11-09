import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi'

const DisClosure = ({ title, description, cta, ctaClassName }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="bg-yellow-50">
          <Disclosure.Button
            tabIndex={-1}
            className="relative flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-600 rounded-lg bg-primary-thin focus:outline-none"
          >
            <span>{title}</span>
            <HiChevronDown
              className={clsx('w-5 h-5 transform transition-all duration-200', {
                'rotate-180': open
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="relative px-4 pt-4 pb-2 text-sm text-gray-500 transition-all duration-200 rounded-lg shadow-sm">
            <p className="first-letter:text-3xl">{description}</p>
            <div className={clsx(ctaClassName)}>{cta}</div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default DisClosure

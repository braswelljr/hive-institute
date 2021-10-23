import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi'

const DisClosure = ({ title, description, cta, ctaClassName }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="bg-yellow-50">
          <Disclosure.Button className="relative flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-secondary-deep bg-secondary-light focus:outline-none ">
            <span>{title}</span>
            <HiChevronDown
              className={clsx(
                'w-5 h-5 transform text-secondary-deep transition-all duration-200',
                {
                  'rotate-180': open
                }
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="relative px-4 pt-4 pb-2 text-sm transition-all duration-200 rounded-lg shadow-sm text-secondary-deep">
            <p className="first-letter:text-3xl">{description}</p>
            <div className={clsx(ctaClassName)}>{cta}</div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default DisClosure

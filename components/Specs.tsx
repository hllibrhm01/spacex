import type { FC, ReactNode, PropsWithChildren } from "react"
import cn from "classnames"

import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"

type SpecsProps = PropsWithChildren<{
  title?: string
  summary?: string
  data?: Array<SpecData>
}>

export type SpecData = {
  title: string
  description: NonNullable<ReactNode>
}

const Specs: FC<SpecsProps> = ({ title, summary, data, children }) => {
  return (
    <div className='first:rounded-t-box last:rounded-b-box w-full overflow-hidden not-prose'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={cn(
                "w-full flex justify-between items-center px-4 py-2 bg-primary text-primary-content text-left",
                "focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75"
              )}
            >
              <>
                <header className='flex flex-col w-full items-start justify-start'>
                  <h4 className='text-lg font-medium leading-6'>{title}</h4>
                  <p className='max-w-2xl text-sm'>{summary}</p>
                </header>
                <ChevronUpIcon
                  title={open ? "down" : "up"}
                  className={cn(
                    "h-5 w-5 text-primary-content transition-transform",
                    {
                      "rotate-180": open,
                    }
                  )}
                />
              </>
            </Disclosure.Button>

            <Transition
              enter='transition-all duration-150 ease-out origin-top'
              enterFrom='scale-y-0 opacity-60'
              enterTo='scale-y-100 opacity-100'
              leave='transition duration-100 ease-out origin-top'
              leaveFrom='scale-y-100 opacity-100'
              leaveTo='scale-y-0 opacity-50'
            >
              <Disclosure.Panel className='overflow-hidden'>
                {data ? (
                  <dl>
                    {data.map(({ title, description }, i) => (
                      <div
                        key={title}
                        className={cn(
                          "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-neutral text-neutral-content border-t first:border-none"
                        )}
                      >
                        <dt className='text-sm font-medium'>{title}</dt>
                        <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                          {description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  children
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Specs

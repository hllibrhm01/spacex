import { Fragment, useState } from "react"
import { Combobox } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/20/solid"
import cn from "classnames"

type FilterComboboxProps = {
  choices: string[]
  initialChoice: string
  setChoice: (name: string) => void
  className?: string
}

const FilterCombobox = ({
  choices,
  initialChoice,
  setChoice,
  className,
}: FilterComboboxProps) => {
  const [selected, setSelected] = useState(initialChoice)
  const [query, setQuery] = useState("")

  const filteredChoices =
    query === ""
      ? choices
      : choices.filter(choice => choice.toLowerCase().includes(query.toLowerCase()))

  return (
    <Combobox value={selected} onChange={setChoice}>
      <Combobox.Input
        onChange={e => setQuery(e.target.value)}
        className={cn(
          className,
          "px-4 py-2 relative rounded-lg bg-gray-100 dark:bg-gray-800"
        )}
      />
      <Combobox.Options className='w-full max-w-md text-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 absolute inset-0 h-full z-50 rounded-lg shadow'>
        {filteredChoices.map(choice => (
          <Combobox.Option key={choice} value={choice} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={cn(
                  "leading-normal px-4 w-full list-none m-0",
                  active
                    ? "text-blue-500 dark:text-blue-600 bg-white dark:bg-gray-600"
                    : "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800",
                  selected && "flex flex-row items-center justify-center gap-x-2"
                )}
              >
                {selected && <CheckIcon className='w-3 h-3' />}
                {choice}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default FilterCombobox

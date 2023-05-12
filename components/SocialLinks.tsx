import { FiExternalLink } from "react-icons/fi"
import { ImWikipedia } from "react-icons/im"
import { TbBrandTwitter } from "react-icons/tb"

type SocialLinksProps = {
  twitter?: string
  name: string
  website: string
  wikipedia: string
}

const SocialLinks = ({ twitter, name, website, wikipedia }: SocialLinksProps) => {
  return (
    <ul className='flex gap-4 mx-0 p-0 list-none'>
      {twitter && (
        <li className='p-0 m-0 focus:outline-none bg-gray-100 dark:bg-gray-900 ring-blue-500 focus:ring-2 focus-within:ring-2  rounded-full hover:ring-2 shadow-inner'>
          <a
            href={twitter}
            className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
          >
            <TbBrandTwitter
              title={`${name} twitter account`}
              className='p-2 w-8 h-8'
            />
          </a>
        </li>
      )}
      <li className='p-0 m-0 focus:outline-none hover:outline-none bg-gray-100 dark:bg-gray-900 ring-blue-500 focus:ring-2 focus-within:ring-2 rounded-full hover:ring-2 shadow-inner'>
        <a
          href={wikipedia}
          className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
        >
          <ImWikipedia title={`${name} wikipedia article`} className='p-2 w-8 h-8' />
        </a>
      </li>
      <li className='p-0 m-0 focus:outline-none hover:outline-none bg-gray-100 dark:bg-gray-900 ring-blue-500 focus:ring-2 focus-within:ring-2 rounded-full hover:ring-2 shadow-inner'>
        <a
          href={website}
          className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
        >
          <FiExternalLink title={name} className='p-2 w-8 h-8' />
        </a>
      </li>
    </ul>
  )
}

export default SocialLinks

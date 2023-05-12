import { useQuery } from "@tanstack/react-query"
import { FiTwitter } from "react-icons/fi"
import { ImFlickr2 } from "react-icons/im"

import Loader from "./LoadingSpinner"
import { companyInfoKey, getCompanyInfo } from "lib/companyInfo"

const Footer: React.FC = () => {
  const { data, isSuccess, isLoading } = useQuery(companyInfoKey, getCompanyInfo, {
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
    select: info => ({
      hq: info.headquarters,
      links: info.links,
    }),
  })

  if (isSuccess) {
    const { hq, links } = data

    return (
      <footer className='footer items-center p-4 bg-neutral text-neutral-content grid-flow-col'>
        <div className='items-center grid-flow-col'>
          <address className='hidden'>
            {hq.address}
            <br />
            {hq.city},&nbsp;{hq.state}
          </address>
        </div>

        <div className='grid-flow-col gap-2 md:gap-4 place-self-center justify-self-end'>
          <a href={links.twitter} className='btn btn-link btn-sm md:btn-md'>
            <FiTwitter
              className='fill-current w-6 h-6'
              aria-label='spacex twitter'
            />
          </a>
          <a href={links.flickr} className='btn btn-link btn-sm md:btn-md'>
            <ImFlickr2 className='fill-current w-6 h-6' aria-label='spacex flickr' />
          </a>
        </div>
      </footer>
    )
  }

  if (isLoading) {
    return (
      <footer className='footer p-6 bg-neutral text-neutral-content'>
        <Loader className='max-w-[10rem] text-inherit' />
      </footer>
    )
  }

  return null
}

export default Footer

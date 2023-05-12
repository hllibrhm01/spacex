import Head from "next/head"
import { useRouter } from "next/router"

type SeoProps = {
  date?: string
  title?: string
  description?: string
  image?: string
  type?: string
}

const Seo: React.FC<SeoProps> = ({
  date,
  title = "SpaceX",
  description = "Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, Elon Musk's tesla roadster, company info, and more.",
  image = "/static/image/rocket-launch-opt.svg",
  type = "website",
}) => {
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={description} />
      <link rel='canonical' href={`https://spacex-one.vercel.app${router.asPath}`} />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/static/favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/static/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/static/favicons/favicon-16x16.png'
      />
      <link rel='manifest' href='/static/favicons/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/static/favicons/safari-pinned-tab.svg'
        color='#888888'
      />
      <link rel='shortcut icon' href='/static/favicons/favicon.ico' />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta
        name='msapplication-config'
        content='/static/favicons/browserconfig.xml'
      />
      <meta name='theme-color' content='#000000' />
      <meta
        property='og:url'
        content={`https://spacex-one.vercel.app${router.asPath}`}
      />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content='SpaceX' />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@tM0Nk3y' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      {date ? <meta property='article:published_time' content={date} /> : null}
    </Head>
  )
}

export default Seo

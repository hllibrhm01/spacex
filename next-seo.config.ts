import type { OpenGraphMedia } from "next-seo/lib/types"
import { DefaultSeoProps } from "next-seo"

export const name = "SpaceX" as const

export const url = "https://spacex-one.vercel.app" as const

export const defaultOgImages: OpenGraphMedia[] = [
  {
    url: `${url}/static/image/launch-og.jpeg`,
    type: "image/jpeg",
    width: 1200,
    height: 603,
  },
  {
    url: `${url}/static/image/dual-landing.jpg`,
    type: "image/jpeg",
  },
]

const config: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    siteName: name,
  },
  twitter: {
    handle: "@tM0Nk3y",
    site: "@tM0Nk3y",
    cardType: "summary_large_image",
  },
  canonical: url,
  titleTemplate: `%s | ${name}`,
  defaultTitle: name,
  themeColor: "#000000",
  additionalLinkTags: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/static/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/static/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/static/favicons/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/static/favicons/site.webmanifest",
    },
    {
      rel: "mask-icon",
      color: "#888888",
      href: "/static/favicons/safari-pinned-tab.svg",
    },
    {
      rel: "shortcut icon",
      href: "/static/favicons/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "google-site-verification",
      content: "aJM45o3rcScxdDA91Ep1O972pOvOds1IeCrOYG-6xHc",
    },
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      name: "msapplication-config",
      content: "/static/favicons/browserconfig.xml",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
  ],
}

export default config

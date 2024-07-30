/* eslint-disable @next/next/next-script-for-ga */
import { Inter, } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { getDictionary } from "./dictionaries";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import Footer from "./components/Footer";
import ProviderContext from "@/store/store";


const inter = Inter({ subsets: ["latin"] });

const socialLinksApi = async () => {
  const baseUrl = process.env.baseUrl
  try {
    const res = await fetch(`${baseUrl}/socials`, {
      headers: {
        "X-localization": "en"
      },
      cache: 'no-store'
    })
    const data = await res.json()
    return data

  } catch (e) {
    return e
  }
}


export default async function RootLayout({ children, params }) {
  const translate = await getDictionary(params.lang)
  const mainUrl = process.env.mainUrl

  const socialLinksReq = await socialLinksApi()
  const socialLinks = await socialLinksReq.data

  const social = socialLinks?.map((item) => item.url)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'housepointegypt.com',
    name: 'House Point Egypt - Real Estate',
    mainEntity: {
      '@id': 'mainEntity',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'HousePointEgyptOrganization',
    name: 'House Point Egypt - Real Estate',
    url: mainUrl,
    logo: mainUrl + '/images/HPlogo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maadi',
      addressRegion: 'Cairo',
      postalCode: '11728',
      streetAddress:
        ' 22 Road 9 , Maadi AI Khabiri Ash sharqeyah , Maadi , Egypt',
      addressCountry: 'Egypt',
    },
    email: '	mailto:info@housepointegypt.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+201221409530',
    },
    sameAs: social
  };

  const realSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'HousePointEgyptOrganization',
  };


  return (
    <html lang={params.lang}>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
          title='favicon'
        />
        <link
          rel='sitemap'
          type='application/xml'
          href={process.env.mainUrl + "/" + params.lang + '/sitemap.xml'}
        />
        <link
          rel='mask-icon'
          href='/safari-pinned-tab.svg'
          color='#5bbad5'
          title='mask-icon'
        />
        <meta name='twitter:site' content='@HousePointE' />
        <meta name='twitter:creator' content='@HousePointE' />
        <meta name='twitter:domain' content={mainUrl} />
        <meta property='twitter:image' content={mainUrl + "/images/HPlogo.png"} />

        <meta
          property="og:image"
          content={mainUrl + "/images/HPlogo.png"}
        />
        <meta
          property="og:image:alt"
          content="House Point Egypt - Real Estate | Logo"
        />
        <meta
          property="og:image:secure_url"
          content={mainUrl + "/images/HPlogo.png"}
        />
        <meta property="og:type" content="website" />
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TGDM45Z');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-XBCPETJP67');`,
          }}
        />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-XBCPETJP67'
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realSchema) }}
        />
      </head>
      <body dir={params.lang === "ar" ? 'rtl' : 'ltr'} className={`${inter.className} `}>
        <ErrorBoundary fallback={<Error />}>
          <ProviderContext>
            <Navbar translate={translate} lang={params.lang} />
            {children}
            <Footer translate={translate} lang={params.lang} />
          </ProviderContext>
        </ErrorBoundary>
      </body>
    </html>
  );
}

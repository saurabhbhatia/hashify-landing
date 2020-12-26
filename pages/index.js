import Head from 'next/head'
import dynamic from 'next/dynamic'
import { builder, BuilderComponent } from '@builder.io/react'

const BUILDER_API_KEY = process.env.BUILDER_API_KEY;
builder.init(BUILDER_API_KEY);

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/tracking'),
  { ssr: false }
)

export const getServerSideProps = async ({res, req, asPath}) => {
  const page = await builder.get('page', { req, res, url: asPath  }).promise();
        
  return {
    props: {
      builderPage: page ? { ...page, testVariationName: page.testVariationName || null } : null,
    },
  }
}

export default function Home({builderPage}) {
  return (
    <>
      <Head>
        <title>Hashify - Share Sensitive Data Securely</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DynamicComponentWithNoSSR />
      <BuilderComponent model="page" content={builderPage} />
    </>
  )
}

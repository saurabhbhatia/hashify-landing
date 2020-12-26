import Head from 'next/head'
import { builder, BuilderComponent } from '@builder.io/react'
import dynamic from 'next/dynamic'

const BUILDER_API_KEY = process.env.BUILDER_API_KEY;
builder.init(BUILDER_API_KEY);

const DynamicComponent = dynamic(() =>
  import('../components/tracking').then((mod) => mod.Tracking),
  { ssr: false }
)

export const getServerSideProps = async ({res, req, asPath}) => {
  const response = await builder.get('page', { req, res, url: asPath  }).promise();
        
  return {
    props: {
      builderPage: response
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
      <DynamicComponent />
      <BuilderComponent model="page" content={builderPage} />
    </>
  )
}

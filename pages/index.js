import Head from 'next/head'
import { builder, BuilderComponent } from '@builder.io/react'

const BUILDER_API_KEY = process.env.BUILDER_API_KEY;
builder.init(BUILDER_API_KEY);

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
      <BuilderComponent model="page" content={builderPage} />
    </>
  )
}

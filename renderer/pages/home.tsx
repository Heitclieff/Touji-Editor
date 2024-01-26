import React from 'react'
import Head from 'next/head'
import SideLayout from '../components/layout/sidelayout'
import Workspace from '../features/workspace'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <Workspace/>
    </React.Fragment>
  )
}

HomePage.getLayout =  function getLayout(page : any) {
    return(
      <SideLayout>
        {page}
      </SideLayout>
    )
}



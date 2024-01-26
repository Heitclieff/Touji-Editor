import React from 'react'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '../styles/globals.css'
import SystemProvider from '../systems/provider/provider'
import { ToastContainer } from "react-toastify"
import '../components/context/style/editContext.css'

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout  || ((page : any) => page)
  return (
    <SystemProvider>
      {getLayout( 
        <Component {...pageProps} />
      )}
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </SystemProvider>
  )
}

export default MyApp

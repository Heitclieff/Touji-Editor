import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import store from '../redux/store'

type providerProps = {
     children : any
}
const SystemProvider : React.FC <providerProps> = ({children}) =>{
  return (
    <NextUIProvider>
     <Provider store={store}>
          {children}
     </Provider>
    </NextUIProvider>
  )
}

export default SystemProvider;

import React from 'react'
import SideBar from '../tabbars/sidebar'
import Topbar from '../tabbars/topbar'
type LayoutProps = { 
     children : any
}
const SideLayout : React.FC <LayoutProps>= ({children}) => {
  return (
     <article className='w-full h-screen flex flex-col'>
          <Topbar/>
          <main className='flex w-full h-full relative overflow-hidden'>
               <SideBar/>
               <div className='w-full h-auto relative z-0 relative overflow-auto'>
                    <div className='dragbar z-10 w-full h-[60px] top-0 fixed'></div>
                    <div className='w-full h-auto'>
                         {children}
                    </div>
               </div>
          </main>
     </article>
  )
}


export default SideLayout;
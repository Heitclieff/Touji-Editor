import React, {useEffect, useState , lazy ,Suspense} from 'react'
import {Chip, useSelect } from "@nextui-org/react";
import { BsDot } from "react-icons/bs";
import { useSelector } from 'react-redux';
import Filetype from '../directory/filetype';
const Foldertype = lazy(() => import('../directory/foldertype'));

const MemorizedFolderType = React.memo(Foldertype);

export const FileExplorer = ({files ,  mainPath} : any) => {  

  if(files){
      return (
        files.children?.map((file , index) => (
          <Suspense key = {index} fallback = {<p>Loading</p>}>
            {file.isDirectory ?
             <MemorizedFolderType 
             folder = {file}
             mainPath = {mainPath}
            />
            :
            <Filetype key = {index} files = {file}/>
          } 
          </Suspense>
        ))
    )
  }
  else {
    return(
      <Filetype files = {files}/>
    )
  }
}

const SideBar : React.FC = () =>  {
  const directoryItems = useSelector((state:any) => state.storage.directory);
  return (
    <section className = "w-[300px] h-auto overflow-auto rounded pl-2 pr-2">
      <div className='flex justify-center pt-2'>
        <Chip variant="flat" color="warning" className='dark' startContent = {<BsDot size={25}/>}>
           Touji Editors
        </Chip>
      </div>
      <div className='mt-4 dark'>
     
        <FileExplorer files ={directoryItems}/>
    </div>
    </section>
  )
}

export default SideBar;

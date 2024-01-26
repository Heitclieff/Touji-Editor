import React, { useEffect, useState } from 'react'
import {Breadcrumbs, BreadcrumbItem, Button, select} from "@nextui-org/react";
import {Tabs, Tab , useDisclosure} from "@nextui-org/react";
import { useSelector ,useDispatch } from 'react-redux';
import { IoIosClose } from "react-icons/io";
import { setFilepath, setTabs , createNewFilepath } from '../../systems/redux/action';
import SpaceAreas from './components/spacearea';
import SearchModal from './components/searchmodal';

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const selectedKey = useSelector((state : any) => state.storage.Tabs);
  const ViewTabs = useSelector((state : any) => state.storage.filePath);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const PathSplit = (filepath) =>  filepath  ?  filepath.split('\\') : "";

  const handleSelectKey = (keys : string) => {
     dispatch(setTabs(keys));
  }

  const RemoveTabs = (keys : string) => {
     const CurrentTabs = ViewTabs.filter((files) => files !== keys)
     dispatch(createNewFilepath(CurrentTabs));
     dispatch(setTabs(CurrentTabs[CurrentTabs.length -1]));
  }


  
  return (
    <div className='flex flex-col relative'>
          <div className='w-full  bg-[#171717]'>
               <header className='dark'>
                 {ViewTabs.length > 0 &&
                    <Tabs aria-label="Dynamic tabs" color ='secondary' onSelectionChange={(key : string) => handleSelectKey(key)}  selectedKey={selectedKey} variant="underlined">
                      {ViewTabs.map((path:string , index:number) => {
                         const splited = PathSplit(path);
                           return(
                              <Tab 
                                key= {path} 
                                title= {
                                <div className='flex items-center relative justify-start p-1 gap-1'>
                                   <p>{splited[splited.length - 1]}</p>
                                   <Button size='sm' variant='light' onClick={() => RemoveTabs(path)} isIconOnly>
                                        <IoIosClose className='text-default-500' size={25} />
                                   </Button>
                                </div>  
                              }
                              >
                                <SpaceAreas current = {path} onOpen= {onOpen}/>
                              </Tab>
                           )
                         })}
                    </Tabs>
                    }
                    </header>
{/* 
                    <footer className='p-2'>
                         {filePath &&
                              <Breadcrumbs variant= 'solid' radius='full' className='dark' size='sm'>
                                   {PathSplit(filePath[0])?.map((directory:string , key:number) => (
                                   <BreadcrumbItem key = {key}>{directory}</BreadcrumbItem>
                                   ))}
                              </Breadcrumbs>
                         }
                    </footer> */}
          </div>
        <SearchModal
          isOpen=  {isOpen}
          onOpenChange = {onOpenChange}
        />
    </div>
  )
}

export default Workspace;
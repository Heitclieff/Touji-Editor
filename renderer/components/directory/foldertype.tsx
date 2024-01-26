import React ,{useState , useEffect} from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";
import Filetype from './filetype';
import { FileExplorer } from '../tabbars/sidebar';
import { Spinner } from '@nextui-org/react';

type FolderProps = {
     folder : any
     mainPath : string

}

const Foldertype : React.FC <FolderProps> = ({folder  , mainPath }) => {
     const [isLoading , setLoading] = useState(true);
     
  return (
     <Accordion isCompact >
          <AccordionItem
          key="theme"
          className='dark pl-3 h-fit hover:bg-[#27272A] rounded-md transition-all'
          aria-label="Theme"
          title= {<p className='text-default-600 text-sm'>{folder.name}</p>}
          >
               <FileExplorer files = {folder}/>

          </AccordionItem>
     </Accordion>
  )
}

export default Foldertype;

import React, { useEffect  , useState} from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { CiCircleMore } from "react-icons/ci";
import { useDispatch , useSelector } from 'react-redux';
import { setFilepath , setTabs,  setDirectory } from '../../systems/redux/action';
import { PiHandTapLight } from "react-icons/pi";
import { menuLists } from './assets/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSuccess = (message) => {
  return(
       toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
       })
  )
}


const Topbar : React.FC = () => {
  const currentValues = useSelector((state) => state.storage.content);
  const Tabs = useSelector((state) => state.storage.Tabs);
  const filePath = useSelector((state : any) => state.storage.filePath);
  const dispatch = useDispatch();
  
  const handleFileCreate = async (action : string, slots : string) => {
    if(slots === "editor") { 
      window.ipc.send(`event-document-triggered` , action);
    }else{
      window.ipc.send(`${action}-document-triggered` ,currentValues[Tabs]);
      if(action === 'save') {
        ToastSuccess("Files Saved");
      }
    }
   
  }

  useEffect(() => {
    if(window.ipc){
      const unsubscribe = window.ipc.on('document-created', (path : string) => {
        if(path){
          if(filePath.includes(path)){
          }else{
            dispatch(setFilepath(path));
          }
        }
      });
      return () => {
          unsubscribe();
      };
    }
  },[])
  
  useEffect(() => {
    if(window.ipc){
      const unsubscribe = window.ipc.on('document-openfolder', (results : string) => {
        if(results){
          dispatch(setDirectory(results));
          
        }
      });
      return () => {
          unsubscribe();
      };
    }
  },[])


  useEffect(() => {
    if(window.ipc){
      const unsubscribe = window.ipc.on('document-opened', (results : any) => {
        if(results){
          if(!filePath.includes(results.filePath)){
            dispatch(setFilepath(results.filePath));
          }
          dispatch(setTabs(results.filePath))
        }
      });
      return () => {
          unsubscribe();
      };
    }
  },[])



  return (
    <section className='w-full flex p-2'>
      {menuLists.map((menu : any , key : number) => (
        <Dropdown className='dark' key=  {key}>
        <DropdownTrigger>
          <Button 
            isIconOnly
            className='dark'
            variant="light" 
          >
            <menu.icon size={20} className = "text-default-500"/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions" items={menu.children}>
          {(item) => (
            <DropdownItem
              key={item.key}
              shortcut = {item.shortcut}
              color={item.key === "delete" ? "danger" : "default"}
              className={item.key === "delete" ? "text-danger" : ""}
              onClick={() => handleFileCreate(item.key , menu.name)}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      ))}
    </section>
  )
}

export default Topbar;


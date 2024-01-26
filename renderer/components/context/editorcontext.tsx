import React from 'react'
import {  Listbox,  ListboxSection,  ListboxItem , DropdownItem , DropdownMenu, Dropdown } from "@nextui-org/react";
import { ButtonItems } from '../../features/workspace/assets/config';
import {Kbd} from "@nextui-org/react";

type contextProps = {
     positionX : number ,
     positionY : number,
     isToggled : boolean,
     rightClickItem : any
     isAction : any
     buttons : any,
     contextMenuRef : any
}

const EditContext : React.FC <contextProps> = ({
     isAction,
     rightClickItem,
     positionX ,
     positionY,
     isToggled, 
     buttons, 
     contextMenuRef,
}) => {

  return (
      <menu 
      ref= {contextMenuRef} 
      style={{
          top : positionY + 2 + 'px' ,
          left : positionX + 2 + 'px',
      }} 
      className={`context-menu ${isToggled ? 'active' : ''}`}
      >   
      <Dropdown>
         <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut"
               aria-label="Actions"
               onAction={(key, e) => isAction(key, e)}
               >{
                    ButtonItems.map((item) => (
                         <DropdownItem key={item.text}  shortcut= {item.shortcut}>{item.text}</DropdownItem>
                    ))
               }
          </DropdownMenu>
     </Dropdown>
          
     </menu>
     
     
  )
}


export default EditContext;
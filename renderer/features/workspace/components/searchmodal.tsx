import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input} from "@nextui-org/react";

type ModalProps = { 
     isOpen : boolean
     onOpenChange : any
}

const SearchModal: React.FC <ModalProps> = ({isOpen , onOpenChange})  =>{
  return (
    <div> 

       <Modal 
        size='sm'
        isOpen={isOpen} 
        placement={'top'}
        onOpenChange={onOpenChange} 
      >
       
          <ModalContent className='dark  bg-[#171717]'>
               
     {(onClose) => (
          <>
           {/* <ModalHeader/> */}
          <ModalBody >
               <div className='mt-3'>
                    <Input  radius='none' size='md' labelPlacement='outside' style={{backgroundColor : 'transparent'}} label="Find keywords" />
               </div>
          </ModalBody>
          <ModalFooter>
               <Button color="default" variant="light" onPress={onClose} size='sm'>
                    Close
               </Button>
               <Button color="warning" variant='flat' onPress={onClose} size='sm'>
                    Find
               </Button>
          </ModalFooter>
          </>
     )}
  </ModalContent>
</Modal>
</div>
  )
}

export default SearchModal;

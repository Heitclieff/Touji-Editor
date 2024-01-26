import React, {useState} from 'react'
import { Button } from '@nextui-org/react'
import { useDispatch , useSelector } from 'react-redux'
import { setFilepath , setTabs } from '../../systems/redux/action'
type fileProps = {
    files : any
}

const Filetype : React.FC <fileProps> = ({files}) => {
  const filePath = useSelector((state : any) => state.storage.filePath);
  const dispatch = useDispatch();

  const handleDisplayFiles  = async () => {

    window.ipc.send(`read-document-triggered` , files.fullPath);

    if(!filePath.includes(files.fullPath)){
      dispatch(setFilepath(files.fullPath));
    }
    dispatch(setTabs(files.fullPath)) //set Current tabs.
  }

  return (
    <Button onClick={handleDisplayFiles} size='sm' variant='light' className='w-full text-sm pl-5'>
        <p className='w-full text-start text-default-500'>
          {files.name}
        </p>
    </Button>
  )
}

export default Filetype;

import React, {useRef, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { setcontent , setEditorPrevent  } from '../../../systems/redux/action';
import { toast } from 'react-toastify';
import EditContext from '../../../components/context/editorcontext';
import { ButtonItems } from '../assets/config';
import { javascript , completionPath , autoCloseTags } from '@codemirror/lang-javascript';
import { loadLanguage , langs} from '@uiw/codemirror-extensions-langs';
import { xcodeLight, xcodeLightInit, xcodeDark, xcodeDarkInit } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import { KeysBinding } from '../assets/keysbiding';
import { ToastSuccess } from '../../../components/tabbars/topbar';
type containerProps = {

}


const SpaceAreas : React.FC <containerProps> = ({current , onOpen}) => {
     const dispatch = useDispatch();
     
     const textareaRef = React.useRef(null);
     const [selectionArea , setSelectionArea]  = useState("");
     const [currentValue, setCurrentValue] = React.useState("");
     const cacheContent = useSelector((state : any) => state.storage.content);
     const [isLoading ,setLoading] = useState(true);
     const lines = currentValue.split("\n")
     const contextMenuRef = React.useRef(null);
     const editorPrevent = useSelector((state : any) => state.storage.editorPrevent);
     const [contextMenu ,setContextMenu] = useState({
       position : {
         x : 0 , 
         y : 0
       },
       toggled : false
     })
     const pathCompletionList = [
          'src',
          'components',
          'utils',
          'styles'
        ];
        
     
     const AutoSavingFiles = () => {
          if(!isLoading){
               window.ipc.send(`save-document-triggered` , currentValue);
          }
     }

     const SetCurrentTextArea = (e) => {
          setCurrentValue(e)
          dispatch(setcontent({key : current , value : e}));
     }

     const resetContextMenu = () => {
          setContextMenu({
               position:  {
                    x : 0, 
                    y : 0
               }, 
               toggled :false
          })
     }

     
     const handleActions = async (action ) => {
          if(action === 'Copy' || action === "Cut") {
              const command = action.toLowerCase()
              document.execCommand(command);
          }
          else if (action === "Paste") { 
             const clipboardText = await navigator.clipboard.readText();

             const textarea = textareaRef.current
             const selectionArea = textarea.view.viewState.state.selection.ranges[0]

             const selectionStart = selectionArea.from;
             const selectionEnd = selectionArea.to;
       
             const newText = currentValue.slice(0, selectionStart) + clipboardText + currentValue.slice(selectionEnd);
             setCurrentValue(newText);
          }
          resetContextMenu();           
        };



     const handleOnContextMenu = (e) => {
          const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
          const isLeft = e.clientX < window?.innerWidth / 2;

          let x = e.clientX
          let y = e.clientY

          if(isLeft) {
               x = e.clientX
          }else {
               y = e.clientY - contextMenuAttr.width;
          }

          setContextMenu({
               position : {
                    x , 
                    y,
               },
               toggled : true,
          })

          setSelectionArea(e.target);
     }

     const handleKeyPress = (e) => {
          const keyactions = KeysBinding.find((action : any) => (action.ctrlKeys == e.ctrlKey && action.button === e.key))
          if(keyactions?.action === 'find'){
              onOpen();
          }else if (keyactions?.action === 'save') {
               window.ipc.send(`event-document-triggered` , currentValue);
               ToastSuccess("Files Saved");
          }
        }
      
        React.useEffect(() => {
          document.addEventListener('keydown', handleKeyPress);
          return () => {
            document.removeEventListener('keydown', handleKeyPress);
          };
     } ,[])        

     React.useEffect(() => {
          window.ipc.send(`read-document-triggered` , current);
          if(window.ipc){
             const unsubscribe = window.ipc.on('document-readed', (results : any) => {
                setCurrentValue(results.content , editorPrevent)
                setLoading(false);
                
             });
             return () =>  {
                 unsubscribe();
             };
           }
     },[])

     React.useEffect(() => {
          if(window.ipc){
             const unsubscribe = window.ipc.on('event-triggered', (results : any) => {
               if(results.status === "ok") {
                    handleActions(results.event)
               }
             });
             return () =>  {
                 unsubscribe();
             };
           }
     },[currentValue])


     React.useEffect(() => {
          const handler = (e) => {
               
            if(textareaRef.current.view) { 
               const selectionArea = textareaRef.current.view.viewState?.state.selection.ranges[0];
               dispatch(setEditorPrevent({from : selectionArea.from ,  to : selectionArea.to , flags : selectionArea.flags}))
            }

            if (contextMenuRef.current) {
              if (!contextMenuRef.current.contains(e.target)) {
                resetContextMenu();
              }
            }
          };
        
          document.addEventListener('click', handler);
        
          return () => {
            document.removeEventListener('click', handler);
          };
        }, []);


     AutoSavingFiles();
     
  return (
     <div className='w-full p-2 flex'>      
          {/* <div id="line-numbers" className="text-default-400 font-medium pr-4">
               {lines.length && lines.map((rows:string ,key:number) => (<p className='text-end ' key = {key}>{key + 1}</p>))}
          </div> */}
          {/* <textarea 
          ref = {textareaRef}
          value={currentValue}
          className='bg-[#171717] w-full min-h-[200px] border-transparent resize-none border-0 outline-0'
          onChange={e => SetCurrentTextArea(e.target.value)}
          onContextMenu={ (e) => handleOnContextMenu(e)}
          /> */}

          <CodeMirror
               className='min-w-full'
               ref=  {textareaRef}
               value= {currentValue}
               theme={xcodeDarkInit ({
                  
                    settings: {
                      fontFamily: 'hack',
                      background : 'transparent',
                     
                    }
          
          })}
               onContextMenu={(editor , e)  => {
                    handleOnContextMenu(editor)
                   
               }}



               basicSetup = {{lineNumbers : true ,foldGutter: false }}
               extensions={[[javascript({jsx : true , typescript : true})] , autoCloseTags] }
               onChange={(value, viewUpdate) => {
                    SetCurrentTextArea(value)
               }}
          />
          <EditContext
               isAction = {handleActions}
               contextMenuRef={contextMenuRef}
               isToggled = {contextMenu.toggled}
               positionX={contextMenu.position.x}
               positionY={contextMenu.position.y}
               buttons={ButtonItems}
          />
     </div>

  )
}

export default SpaceAreas;


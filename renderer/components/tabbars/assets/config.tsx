import { CiCircleMore } from "react-icons/ci";
import { CgShortcut } from "react-icons/cg";
export const menuLists = [{
     name : "settings",
     icon : CiCircleMore,
     children : [
          {
               key: "create",
               label: "New File",
               shortcut:"Ctrl + N",
          },
          {
               key: "open",
               label: "Open File",
               shortcut:"Ctrl + O",
          },
     
          {
               key: "openfolder",
               label: "Open Folder",
               shortcut:"Ctrl ⇧ + O",
          },
     
          {
               key: "save",
               label: "Save",
               shortcut:"Ctrl + S",
          },
     

          {
               key: "saveas",
               label: "Save As",
               shortcut:"Ctrl ⇧ + S",
          },
     
          {
               key: "preference",
               label: "Preferences",
               shortcut:"Ctrl + P",
          },
          {
               key: "delete",
               label: "Close Editor",
               shortcut:"Ctrl + F4",
          }
     ]
}, {
     name : "editor",
     icon : CgShortcut,
     children : [
          {
               key: "undo",
               label: "Undo",
               shortcut:"Ctrl + Z",
          },
          {
               key: "redo",
               label: "Redo",
               shortcut:"Ctrl + Y",
          },
          {
               key: "Cut",
               label: "Cut",
               shortcut:"Ctrl + X",
          },
          {
               key: "Copy",
               label: "Copy",
               shortcut:"Ctrl + C",
          },
          {
               key: "Paste",
               label: "Paste",
               shortcut:"Ctrl + V",
          },
     
     ]
}
];
import path from 'path'
import { app, dialog, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import fs from 'fs'
const isProd = process.env.NODE_ENV === 'production'

let openfilePath = "";


if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    titleBarStyle : 'hidden',
    titleBarOverlay: {
      color: "#00000000",
        symbolColor: "#ffffff",
    },
    autoHideMenuBar : true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },

  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  
  ipcMain.on('create-document-triggered' , () => {
    dialog
      .showSaveDialog(mainWindow , {
        filters : [{name : "text files" , extensions : ["txt"]}],
      })
      .then(({ filePath } : any) => {
        console.log("Pathhh" , filePath);
        fs.writeFile(filePath, "" , (error) => {
          if(error){
            console.log("error" ,error);
          } else {
            mainWindow.webContents.send("document-created" ,filePath); 
          }
        })
      })
  })

  ipcMain.on('open-document-triggered' , () => {
    dialog
      .showOpenDialog({ 
        properties: ['openFile']
      }).then(({ filePaths} : any) => {
        const filePath = filePaths[0];
        
        fs.readFile(filePath , "utf-8" , (error , content) => {
          if(error){
            console.log(error);
          }else {
            mainWindow.webContents.send("document-opened" , {filePath,  content})
          }
        })
      })
  })


  ipcMain.on('openfolder-document-triggered' , () => {
    dialog
    .showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        console.log('Selected folder:', result.filePaths[0]);
        const getDirectoryStructure = (folderPath) => {
          const items = fs.readdirSync(folderPath);
          const structure = [];
    
          for (const item of items) {
            const fullPath = path.join(folderPath, item);
            const isDirectory = fs.statSync(fullPath).isDirectory();
        
            const newItem = {
              name: item,
              fullPath: fullPath,
              isDirectory: isDirectory,
              children: [],
            };
        
            if (isDirectory) {
              newItem.children = getDirectoryStructure(fullPath);
              newItem.children.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) {
                  return -1;
                } else if (!a.isDirectory && b.isDirectory) {
                  return 1;
                } else {
                  return a.name.localeCompare(b.name);
                }
              });
            }
        
            structure.push(newItem);
          }

          structure.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) {
              return -1;
            } else if (!a.isDirectory && b.isDirectory) {
              return 1;
            } else {
              return a.name.localeCompare(b.name);
            }
          });

          return structure;
        }
          const files = getDirectoryStructure(result.filePaths[0])
          const FileStructure = {
            parents : "roots",
            children : files,
          }
          
          console.log('Files in the selected folder:', files);
          mainWindow.webContents.send("document-openfolder" , FileStructure); 
      }
    })
  })

  ipcMain.on('read-document-triggered' ,  (_ ,filePath) => {

    if(filePath){
      openfilePath = filePath;
      fs.readFile(filePath , "utf-8" , (error , content) => {
        if(error){
          console.log("Error" , error);
        }else {
          mainWindow.webContents.send("document-readed" , {filePath , content}); 
        }
      })
    }
  })

  ipcMain.on('save-document-triggered' ,  (_ , content) => {
    fs.writeFile(openfilePath , content , (error) => {
      if(error){
        console.log("Error" , error)
      }else{
        console.log("Save successfully.")
      }
    })
  })

  ipcMain.on('event-document-triggered' , (_ , event) => {
    const status =  event ? "ok" : "bad"
    mainWindow.webContents.send("event-triggered" , {status : status , event}); 
  })

})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})



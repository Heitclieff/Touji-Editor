import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'Touji Storage',
  initialState: {
    Tabs : "",
    content : {},
    editorPrevent : {},
    filePath : [],
    directory : [],
  },
  reducers: {
    setTabs : (state, action) => {
      state.Tabs = action.payload
    },
    setFilepath : (state, action) => {
      if(!state.filePath.includes(action.payload)){
        state.filePath.push(action.payload);
      }
    },
    setEditorPrevent : (state, action) => {
      state.editorPrevent = action.payload;
    },

    createNewFilepath : (state, action) => {
      state.filePath = action.payload;
    },
    setDirectory : (state , action) => {
     state.directory = action.payload;
    },

    setcontent: (state, action) => {
      const {key , value} = action.payload;
      state.content[key] = value;
    },
  },
})

export const {setFilepath , setDirectory , setEditorPrevent , setTabs ,setcontent , createNewFilepath} = counterSlice.actions
export default counterSlice.reducer

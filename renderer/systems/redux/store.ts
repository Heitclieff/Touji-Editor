import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './action'

export default configureStore({
  reducer: {
     storage : counterReducer 
  }
})
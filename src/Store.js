import { configureStore } from '@reduxjs/toolkit'
import customslice from './Reducers/Reducer'

const store = configureStore({
    reducer: {
        customreducer: customslice
    }
})

export default store;
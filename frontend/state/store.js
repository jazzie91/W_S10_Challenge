import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice'
import {pizzaApi} from './pizzaApi'



export const resetStore = () => {
   configureStore({
    reducer: {
      filters: filterReducer,
      [pizzaApi.reducerPath]: pizzaApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pizzaApi.middleware),
    
  });

  
};

export const store = resetStore();


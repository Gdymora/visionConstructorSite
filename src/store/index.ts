import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReucer';
 

// Створення магазину Redux
const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Автоматичне виведення типів
//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
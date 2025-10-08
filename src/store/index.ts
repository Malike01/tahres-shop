import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // product: productReducer,
    // user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
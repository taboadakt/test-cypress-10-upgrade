import { configureStore } from '@reduxjs/toolkit';
import AlbumsReducer from './ducks/albums';
import MyStuffReducer from './ducks/myStuff';
import AuthReducer from './auth';

const store = configureStore({
  reducer: {
    albums: AlbumsReducer,
    myStuff: MyStuffReducer,
    auth: AuthReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

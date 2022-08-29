import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Album } from '../albums/types';
import type { MyStuffState } from './types';

const initialState: MyStuffState = {
  albums: [],
};

export const myStuffSlice = createSlice({
  name: 'myStuff',
  initialState,
  reducers: {
    addAlbum: (state, action: PayloadAction<Album>) => {
      state.albums.push(action.payload);
    },
  },
});

export const { addAlbum } = myStuffSlice.actions;
export const myStuffActions = myStuffSlice.actions;

export default myStuffSlice.reducer;

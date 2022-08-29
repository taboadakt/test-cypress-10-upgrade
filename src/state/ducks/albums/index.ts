import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Album, AlbumsState } from './types';

const initialState: AlbumsState = {
  albums: [],
};

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    addAlbum: (state, action: PayloadAction<Album>) => {
      state.albums.push(action.payload);
    },
  },
});

export const { addAlbum } = albumSlice.actions;

export default albumSlice.reducer;

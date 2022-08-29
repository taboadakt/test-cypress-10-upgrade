import type { AlbumsState } from './types';

const areThereAlbums = (state: AlbumsState) => state.albums.length > 0;
const getAlbum = (state: AlbumsState, name: string) =>
  state.albums.find((album) => album.name === name);

export default {
  areThereAlbums,
  getAlbum,
};

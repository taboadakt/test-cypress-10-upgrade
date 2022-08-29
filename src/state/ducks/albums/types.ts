export interface Album {
  name: string;
  year: number;
  genre: string;
}

export interface AlbumsState {
  albums: Album[];
}

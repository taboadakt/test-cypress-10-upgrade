import Album from '../components/Album';
import { useQuery } from 'urql';
import { default as AlbumGrid } from '../components/GridContainer';
import type { Album as TypeAlbum } from '../state/ducks/albums/types';
import { useAppDispatch } from '../hooks/store';
import { myStuffActions } from '../state/ducks/myStuff';

interface AlbumsQuery {
  allAlbums: TypeAlbum[];
}

const AlbumsQuery = `
query {
  allAlbums {
    name
  }
}
`;

// Main
const Albums = () => {
  const dispatch = useAppDispatch();
  const addAlbum = (album: TypeAlbum) =>
    dispatch(myStuffActions.addAlbum(album));

  const [result, _executeQuery] = useQuery<AlbumsQuery>({ query: AlbumsQuery });
  // Deconstructure some properties from result
  const { data, fetching, error } = result;

  return (
    <>
      <h1>Albums</h1>
      {fetching && <div>Loading</div>}
      {error && <div>Error</div>}
      {data && (
        <AlbumGrid>
          {data.allAlbums.map((album) => (
            <Album key={album.name} onClick={addAlbum} album={album} />
          ))}
        </AlbumGrid>
      )}
    </>
  );
};

export default Albums;

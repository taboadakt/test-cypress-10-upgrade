import type { Album } from '../state/ducks/albums/types';

const AlbumTable = ({ albums }: { albums: Album[] }) => {
  const rows = albums.map((album) => (
    <tr key={album.name}>
      <td>{album.name}</td>
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr>
          <td sx={{ fontSize: '20px', fontWeight: 'bold' }}>Name</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default AlbumTable;

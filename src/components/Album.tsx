import { Button } from 'theme-ui';
import type { Album as TypeAlbum } from '../state/ducks/albums/types';
import GridCell from './GridCell';

// Demonstrating extending styling through another component
const AlbumContainer: React.FC = ({ children }) => (
  <GridCell addStyles={{ position: 'relative' }}>{children}</GridCell>
);

const Album = ({
  album,
  onClick,
}: {
  album: {
    name: string;
    year: number;
    genre: string;
  };
  onClick: (album: TypeAlbum) => void; // ugh, just for now
}) => {
  const { name, year, genre } = album;
  return (
    <AlbumContainer>
      <header sx={{ fontSize: '36px' }}>
        <h1>{name}</h1>
      </header>
      <div>
        <strong>Year:</strong> {year}
      </div>
      <div>
        <strong>Genre:</strong> {genre}
      </div>
      <Button onClick={() => onClick(album)}>+</Button>
    </AlbumContainer>
  );
};

export default Album;

import Artist from '../components/Artist';
import { default as ArtistGrid } from '../components/GridContainer';

interface Artist {
  id: number;
  name: string;
}

const artists: Artist[] = [
  { id: 1, name: 'SLAYER' },
  { id: 2, name: 'The Muppets' },
  { id: 3, name: 'George Benson' },
  { id: 4, name: 'Steeley Dan' },
  { id: 5, name: 'Benie and the Jets' },
];

const Artists = () => {
  return (
    <>
      <h1>Artists</h1>
      <ArtistGrid>
        {artists.map((artist) => (
          <Artist key={artist.name} {...artist} />
        ))}
      </ArtistGrid>
    </>
  );
};

export default Artists;

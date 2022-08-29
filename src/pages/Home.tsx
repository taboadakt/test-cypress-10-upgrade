import { useAppSelector } from '../hooks/store';
import { Image } from 'theme-ui';
import { Button } from '@odekoteam/doppio';
import AlbumTable from '../components/AlbumTable';
import QuestionMark from '../assets/images/QuestionMark.svg';

const Home = () => {
  const myAlbums = useAppSelector((state) => state.myStuff.albums);

  return (
    <>
      <h1 sx={{ color: 'neutralDark', variant: 'text.headingMd' }}>Home</h1>

      <section>
        <header>
          <h1>My Albums</h1>
        </header>
        <div>
          <AlbumTable albums={myAlbums} />
        </div>
      </section>

      <section>
        <header>
          <h1>My Artists</h1>
          <Image src={QuestionMark} />
        </header>
      </section>

      <section>
        <header>
          <h1>Doppio</h1>
          <Button>Click Me</Button>
        </header>
      </section>
    </>
  );
};

export default Home;

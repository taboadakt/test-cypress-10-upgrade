import { useState } from 'react';

const AlbumForm = () => {
  return (
    <section>
      <header>
        <h1>Add an Album</h1>
      </header>
      <form action="">
        <div>
          <label htmlFor="name">
            Album Name
            <input type="text" name="name" placeholder="Album name" />
          </label>
        </div>
        <div>
          <label htmlFor="year">
            Year
            <input type="number" name="year" placeholder="1984" />
          </label>
        </div>
        <div>
          <label htmlFor="genre">
            Genre
            <input type="text" name="genre" placeholder="genre" />
          </label>
        </div>
        <div>
          <label htmlFor="artist">
            Artist
            <input type="text" name="artist" placeholder="By artist..." />
          </label>
        </div>
      </form>
    </section>
  );
};

const ArtistForm = () => {
  return (
    <section>
      <header>
        <h1>Add an Album</h1>
      </header>
      <form action="">
        <div>
          <label htmlFor="name">
            Artist Name
            <input type="text" placeholder="Album name" />
          </label>
        </div>
      </form>
    </section>
  );
};

const FormSelector = ({
  setIsAlbumFor,
  value,
}: {
  setIsAlbumFor: (b: boolean) => void;
  value: boolean;
}) => {
  return (
    <div>
      Is this for an album or artist?
      <div>
        <input
          type="radio"
          name="form"
          id="album"
          value="album"
          onChange={() => setIsAlbumFor(true)}
          checked={value}
        />
        <label htmlFor="album">Album</label>
      </div>
      <div>
        <input
          type="radio"
          name="form"
          id="artist"
          value="artist"
          onChange={() => setIsAlbumFor(false)}
          checked={!value}
        />
        <label htmlFor="artist">Artist</label>
      </div>
    </div>
  );
};

const AddMusic = () => {
  const [isForAlbum, setIsAlbumFor] = useState(true);

  return (
    <>
      <h1>Add</h1>
      <div>
        <FormSelector setIsAlbumFor={setIsAlbumFor} value={isForAlbum} />
        {isForAlbum ? <AlbumForm /> : <ArtistForm />}
      </div>
    </>
  );
};

export default AddMusic;

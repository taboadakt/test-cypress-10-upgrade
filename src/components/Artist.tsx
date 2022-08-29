import { Button, ThemeUIStyleObject } from 'theme-ui';
import GridCell from './GridCell';

const styles: ThemeUIStyleObject = {
  alignItems: 'center',
  display: 'flex',
  fontSize: '20px',
  fontWeight: 'bold',
  height: '200px',
  justifyContent: 'center',
  padding: '20px',
  position: 'relative',
  textAlign: 'center',
  width: '200px',
};

const Artist = ({ name }: { name: string }) => (
  <GridCell addStyles={styles}>
    {name}
    <Button>+</Button>
  </GridCell>
);

export default Artist;

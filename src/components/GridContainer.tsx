import { Grid } from 'theme-ui';

// Demonstrating Grid component
const GridContainer: React.FC = ({ children }) => (
  <Grid gap="10px" columns={3}>
    {children}
  </Grid>
);

export default GridContainer;

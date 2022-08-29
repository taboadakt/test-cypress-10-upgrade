import { Flex, NavLink } from 'theme-ui';
import { Link, LinkProps } from 'react-router-dom';

// Styling 3rd party components
// Spreading "rest" and using in the `NavLink` to pass on props like `to={...}`
const StyledLink: React.FC<LinkProps> = ({ children, ...rest }) => (
  <NavLink as={Link} p="10px" {...rest}>
    {children}
  </NavLink>
);

/**
 * Few things going on here.
 * - Flex for default flexbox
 * -- "as" property to say "render this as a..."
 * -- borderBottom property showcasing using the theme object to determine style
 * --- NOTE: This is not the same as using the theme hook. Check the typings
 */
const Navbar = () => (
  <Flex
    as="nav"
    sx={{
      borderBottom: '2px solid',
      borderColor: (theme) => theme.colors?.neutralDark,
      pb: '5px',
    }}
  >
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/albums">Albums</StyledLink>
    <StyledLink to="/artists">Artists</StyledLink>
    <StyledLink to="/add">Add</StyledLink>
  </Flex>
);

export default Navbar;

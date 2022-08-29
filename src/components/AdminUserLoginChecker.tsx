import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import { Flex, Paragraph } from 'theme-ui';
import { setToken, setUser } from '../state/auth';
import { useAppDispatch, useAppSelector } from '../hooks/store';

interface AdminUserLoginCheckerProps {
  children: JSX.Element;
}

const AdminUserLoginChecker = ({ children }: AdminUserLoginCheckerProps) => {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const dispatch = useAppDispatch();
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  }: Auth0ContextInterface<User> = useAuth0();
  if (isLoading) {
    return null;
  } else if (!isAuthenticated) {
    loginWithRedirect().catch(console.error);
    return null;
  } else {
    getAccessTokenSilently()
      .then((t) => {
        dispatch(setToken(t));
        // Taking a lil shortcut here for demo purposes
        user && dispatch(setUser(user));
      })
      .catch(console.error);
    if (!isAdmin) {
      // dont log them out,  just send show forbidden
      return (
        <Flex
          as="main"
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paragraph>Forbidden</Paragraph>
        </Flex>
      );
    }
  }
  return children;
};

export default AdminUserLoginChecker;

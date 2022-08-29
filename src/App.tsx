import { hot } from 'react-hot-loader/root';
import { Suspense, lazy } from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Use React lazy to code-split our pages
const AddMusic = lazy(() => import('./pages/AddMusic'));
const Albums = lazy(() => import('./pages/Albums'));
const Artists = lazy(() => import('./pages/Artists'));
const Home = lazy(() => import('./pages/Home'));

const client = createClient({
  url: window.env.GRAPHQL_ENDPOINT, // url doesn't matter since MirageJS hooks into any fetch
});

const App = () => (
  <UrqlProvider value={client}>
    <Router>
      <Navbar />

      <main sx={{ p: '2rem 0' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/add">
              <AddMusic />
            </Route>
            <Route exact path="/artists">
              <Artists />
            </Route>
            <Route exact path="/albums">
              <Albums />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  </UrqlProvider>
);

export default hot(App);

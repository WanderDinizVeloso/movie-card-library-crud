import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><MovieList /></Route>
        <Route path="/movies/new"><NewMovie /></Route>
        <Route
          path="/movies/:id/edit"
          render={
            (reactRouterProps) => (<EditMovie { ...reactRouterProps } />)
          }
        />
        <Route
          path="/movies/:id"
          render={
            (reactRouterProps) => (<MovieDetails { ...reactRouterProps } />)
          }
        />
        <Route><NotFound /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.updateMoviesState = this.updateMoviesState.bind(this);

    this.state = {
      movies: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { getMovies } = movieAPI;
    const { updateMoviesState } = this;
    const moviesList = await getMovies();
    updateMoviesState(moviesList);
  }

  updateMoviesState(movies) {
    this.setState((state) => ({
      ...state,
      movies,
      loading: false,
    }));
  }

  render() {
    const { movies, loading } = this.state;

    return (
      <div data-testid="movie-list">
        {
          loading
            ? <Loading />
            : (
              <section>
                <section>
                  <Link to="/movies/new">ADICIONAR CARTÃO</Link>
                </section>
                <section>
                  { movies.map((movie) => (
                    <MovieCard key={ movie.title } movie={ movie } />
                  ))}
                </section>
              </section>
            )
        }
      </div>
    );
  }
}

export default MovieList;

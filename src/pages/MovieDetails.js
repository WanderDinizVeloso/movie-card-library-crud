import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.updateMovieState = this.updateMovieState.bind(this);

    this.state = {
      movie: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;
    const { updateMovieState } = this;
    const movie = await getMovie(id);
    updateMovieState(movie);
  }

  updateMovieState(movie) {
    this.setState((state) => ({
      ...state,
      movie,
      loading: false,
    }));
  }

  render() {
    const {
      movie: { title, storyline, imagePath, genre, rating, subtitle },
      loading,
    } = this.state;

    const { match: { params: { id } } } = this.props;

    return (
      loading
        ? <Loading />
        : (
          <div data-testid="movie-details">
            <img alt="Movie Cover" src={ `../${imagePath}` } />
            <p>{ `Title: ${title}` }</p>
            <p>{ `Subtitle: ${subtitle}` }</p>
            <p>{ `Storyline: ${storyline}` }</p>
            <p>{ `Genre: ${genre}` }</p>
            <p>{ `Rating: ${rating}` }</p>
            <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
            <Link to="/">VOLTAR</Link>
          </div>
        )
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieDetails;

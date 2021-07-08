import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMovieState = this.updateMovieState.bind(this);

    this.state = {
      loading: true,
      shouldRedirect: false,
      movie: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;
    const { updateMovieState } = this;
    const movie = await getMovie(id);
    updateMovieState(movie);
  }

  async handleSubmit(updatedMovie) {
    const { updateMovie } = movieAPI;
    const editMovie = await updateMovie(updatedMovie);
    if (editMovie === 'OK') {
      this.setState((state) => ({
        ...state,
        shouldRedirect: true,
      }));
    }
  }

  updateMovieState(movie) {
    this.setState((state) => ({
      ...state,
      movie,
      loading: false,
    }));
  }

  render() {
    const { loading, shouldRedirect, movie } = this.state;

    return (
      loading
        ? <Loading />
        : (
          <div data-testid="edit-movie">
            { shouldRedirect && <Redirect to="/" /> }
            <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
          </div>
        )
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditMovie;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      shouldRedirect: false,
      movie: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;
    const movie = getMovie(id);
    movie.then((mov) => {
      this.setState((state) => ({
        ...state,
        movie: mov,
        loading: false,
      }));
    });
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

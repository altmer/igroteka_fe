import React from 'react';
import PropTypes from 'prop-types';

import Poster from './Poster';
import { yearFromDate } from '../utils';

import './GameListItem.css';

const renderName = (name, numbered, index) => {
  if (numbered) {
    return `${index}. ${name}`;
  }
  return name;
};

/* eslint-disable camelcase */
export const GameListItem = ({
  game: { id, poster, name, release_date, developers },
  numbered,
  index,
}) => (
  <div className="GameListItem">
    <div className="game-image">
      <Poster url={poster.thumb_url} />
    </div>
    <div className="game-info">
      <p className="game-name">
        <a href={`/games/${id}/show`}>{renderName(name, numbered, index)}</a>
        <small>{yearFromDate(release_date)}</small>
      </p>
      {developers && developers.length > 0 && (
        <p className="game-developed-by text-secondary">
          by {developers[0].name}
        </p>
      )}
    </div>
  </div>
);

GameListItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    poster: PropTypes.shape({
      thumb_url: PropTypes.string,
    }),
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
  numbered: PropTypes.bool,
  longDate: PropTypes.bool,
  index: PropTypes.number,
};

GameListItem.defaultProps = {
  game: {
    short_description: '',
    release_date: '',
    poster: {},
    platforms: [],
    rating: null,
    ratings_count: null,
  },
  numbered: false,
  longDate: false,
  index: null,
};

export default GameListItem;

/* eslint-enable camelcase */

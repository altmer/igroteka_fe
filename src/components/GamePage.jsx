import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ReactPlaceholder from 'react-placeholder';
import { TextBlock, TextRow, RectShape } from 'react-placeholder/lib/placeholders';
import { Helmet } from 'react-helmet';

import { renderDate } from '../utils';
import Poster from './Poster';

import Form from './backlog-form/Form';
import GamePageInfoBlock from './GamePageInfoBlock';
import YoutubeLink from './YoutubeLink';

import { GAME_FETCH_REQUESTED } from '../store/gamePage';

import './GamePage.css';

const formatObjects = (objects) => {
  if (!objects) return null;
  return objects.map(obj => obj.name).join(', ');
};

const placeholder = (
  <div className="container GamePage">
    <div className="row GamePage-header">
      <div className="col-12 col-md-2 d-none d-sm-block">
        <RectShape showLoadingAnimation color="#ddd" style={{ width: 160, height: 200 }} />
      </div>
      <div className="col-12 col-md-6">
        <TextRow color="#ddd" style={{ height: 35 }} />
        <TextBlock color="#ddd" rows={10} />
      </div>
      <div className="col-12 col-md-4">
        <TextBlock color="#ddd" rows={5} />
      </div>
    </div>
  </div>
);

export class GamePage extends Component {
  constructor(props) {
    super(props);

    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { fetchGame, gameId } = this.props;
    fetchGame(gameId);
  }

  render() {
    const { game, gameFetching, currentUser } = this.props;
    const ready = !gameFetching && !!game.name;
    return (
      <ReactPlaceholder showLoadingAnimation ready={ready} customPlaceholder={placeholder}>
        <div className="container GamePage">
          <div className="row GamePage-header">
            <Helmet>
              <title>{`${game.name} | Igroteka`}</title>
            </Helmet>
            <div className="col-12 col-md-2 d-none d-sm-block">
              {game.poster && <Poster url={game.poster.medium_url} />}
            </div>
            <div className="col-12 col-md-6">
              <h2>{game.name}</h2>
              <div className="GamePage-release-date">{renderDate(game.release_date)}</div>
              <div className="GamePage-platforms">{formatObjects(game.platforms)}</div>
              <div className="GamePage-short-description">{game.short_description}</div>
              <div className="GamePage-info">
                {game.name && <YoutubeLink name={game.name} type="Walkthrough" />}
                {game.name && <YoutubeLink name={game.name} type="Trailer" />}
              </div>
            </div>
            <div className="col-12 col-md-4">{currentUser && <Form game={game} />}</div>
          </div>
          <div className="row GamePage-extended">
            <div className="col-12">
              <h3 className="GamePage-extended-header">Information</h3>
              <div className="GamePage-info">
                <GamePageInfoBlock header="Developers" text={formatObjects(game.developers)} />
                <GamePageInfoBlock header="Publishers" text={formatObjects(game.publishers)} />
                <GamePageInfoBlock header="Franchises" text={formatObjects(game.franchises)} />
              </div>
            </div>
          </div>
        </div>
      </ReactPlaceholder>
    );
  }
}

GamePage.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string,
    release_date: PropTypes.string,
    short_description: PropTypes.string,
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
    publishers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
    franchises: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        super_url: PropTypes.string,
        thumb_url: PropTypes.string,
      }),
    ),
  }),

  gameId: PropTypes.string.isRequired,
  gameFetching: PropTypes.bool.isRequired,

  fetchGame: PropTypes.func.isRequired,

  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

GamePage.defaultProps = {
  game: {},
  currentUser: null,
};

const mapStateToProps = (state, ownProps) => ({
  gameId: ownProps.match.params.gameId,
  gameFetching: state.gamePage.gameFetching,
  game: state.gamePage.game,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchGame: gameId => dispatch({ type: GAME_FETCH_REQUESTED, gameId }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);

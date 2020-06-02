import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import { transformations, isRadiant, sum } from '../../../utility';
import { IconRadiant, IconDire } from '../../Icons';
import Warning from '../../Alerts';
import constants from '../../constants';

const Styled = styled.header`
  .matchInfo {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .team {
    box-sizing: border-box;
    flex-basis: 33.33%;
    max-width: 33.33%;

    @media only screen and (max-width: 1023px) {
      flex-basis: 100%;
      max-width: 100%;
    }
    padding: 20px 0 10px;
    font-size: 28px;

    @media only screen and (max-width: 1023px) {
      text-align: center;
      margin: 10px 0;
    }

    & > span {
      padding-bottom: 5px;
      letter-spacing: 1px;
    }

    &.radiant > span {
      background: linear-gradient(
        to right,
        rgba(167, 195, 42, 0) 0%,
        rgba(129, 146, 60, 0) 5%,
        rgba(19, 82, 44, 0.3) 50%,
        rgba(96, 236, 8, 0.05) 87%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &.dire > span {
      background: linear-gradient(
        to right,
        rgba(117, 132, 52, 0) 0%,
        rgba(129, 146, 60, 0) 5%,
        rgba(111, 34, 26, 0.3) 50%,
        rgba(255, 71, 0, 0.05) 87%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    & svg {
      width: 32px;
      height: 32px;
      margin: 0 15px;
      vertical-align: sub;

      @media only screen and (max-width: 1023px) {
        display: block;
        margin: 0 auto;
        width: 48px;
        height: 48px;
      }
    }
  }

  .nowinner {
    color: ${constants.colorMuted};
  }

  .radiant {
    color: ${constants.colorSuccess};

    & svg {
      filter: drop-shadow(0 0 5px green);
      fill: ${constants.textColorPrimary} !important;
    }
  }

  .dire {
    color: ${constants.colorDanger};

    & svg {
      filter: drop-shadow(0 0 5px ${constants.colorDanger});
      fill: black !important;
    }
  }

  .mainInfo {
    box-sizing: border-box;
    flex-basis: 33.33%;
    max-width: 33.33%;

    @media only screen and (max-width: 1023px) {
      flex-basis: 100%;
      max-width: 100%;
    }
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .gmde {
    margin: 0 20px;

    @media only screen and (max-width: 400px) {
      margin: 0 10px;
    }

    & span {
      text-transform: uppercase;
      display: block;
    }

    & .gameMode {
      font-size: ${constants.fontSizeMedium};
    }

    & .duration {
      font-size: 28px;

      @media only screen and (max-width: 400px) {
        font-size: 24px;
      }
    }

    & .ended {
      font-size: ${constants.fontSizeSmall};
      color: ${constants.colorMutedLight};
      margin-top: 3px;

      & > div {
        display: inline-block;
      }
    }
  }

  .killsRadiant {
    font-size: 48px;
    text-align: center;

    @media only screen and (max-width: 400px) {
      font-size: 40px;
    }
    color: ${constants.colorSuccess};
  }

  .killsDire {
    font-size: 48px;
    text-align: center;

    @media only screen and (max-width: 400px) {
      font-size: 40px;
    }
    color: ${constants.colorDanger};
  }

  .additionalInfo {
    box-sizing: border-box;
    flex-basis: 33.33%;
    max-width: 33.33%;

    @media only screen and (max-width: 1023px) {
      flex-basis: 100%;
      max-width: 100%;
    }
    text-align: right;
    padding-top: 20px;

    @media only screen and (max-width: 1023px) {
      text-align: center;

      & span {
        margin-bottom: 5px;
      }
    }

    & ul {
      padding: 0;
      margin: 0;

      & li {
        display: inline-block;
        margin-left: 20px;

        & > span {
          display: block;
          text-transform: uppercase;
          font-size: ${constants.fontSizeSmall};
          color: ${constants.colorMutedLight};
        }
      }

      & li:first-child {
        margin-left: 0;
      }
    }
  }

  .matchButtons {
    display: table;
    margin: 10px auto 0;

    /* Material-ui buttons */
    & a {
      float: left;
      margin: 5px !important;
      line-height: 34px !important;
    }

    @media only screen and (max-width: 620px) {
      & a {
        min-width: 24px !important;

        & span {
          font-size: 0 !important;
          padding-left: 0 !important;
          padding-right: 12px !important;
        }
      }
    }
  }

  .unparsed {
    text-align: center;
    margin-top: 12px;
  }
`;

const getWinnerStyle = (radiantWin) => {
  if (radiantWin === null || radiantWin === undefined) {
    return 'nowinner';
  }
  return radiantWin ? 'radiant' : 'dire';
};

const MatchHeader = ({ match, strings }) => {
  if (!match) {
    return null;
  }
  const mapPlayers = (key, radiant) => player =>
    (radiant === undefined || radiant === isRadiant(player.player_slot)
      ? Number(player[key])
      : null);

  const victorySection = match.radiant_win ? (
    <span>
      <IconRadiant />
      {match.radiant_team && match.radiant_team.name
        ? `${match.radiant_team.name} ${strings.match_team_win}`
        : strings.match_radiant_win}
    </span>
  ) : (
    <span>
      <IconDire />
      {match.dire_team && match.dire_team.name
        ? `${match.dire_team.name} ${strings.match_team_win}`
        : strings.match_dire_win}
    </span>
  );
  return (
    <Styled>
      <div className="matchInfo">
        <div className={`team ${getWinnerStyle(match.radiant_win)}`}>
          {match.radiant_win === null || match.radiant_win === undefined
            ? strings.td_no_result
            : victorySection}
        </div>
        <div className="mainInfo">
          <div className="killsRadiant">
            {match.radiant_score ||
              match.players.map(mapPlayers('kills', true)).reduce(sum, 0)}
          </div>
          <div className="gmde">
            <span className="gameMode">
              {strings[`game_mode_${match.game_mode}`]}
            </span>
            <span className="duration">
              {transformations.duration(null, null, match.duration)}
            </span>
            <span className="ended">
              {strings.match_ended}{' '}
              {transformations.start_time(
                null,
                null,
                match.start_time + match.duration,
              )}
            </span>
          </div>
          <div className="killsDire">
            {match.dire_score ||
              match.players.map(mapPlayers('kills', false)).reduce(sum, 0)}
          </div>
        </div>
        <div className="additionalInfo">
          <ul>
            {match.league && (
              <li>
                <span>league</span>
                {match.league.name}
              </li>
            )}
            <li>
              <span>{strings.match_id}</span>
              {match.match_id}
            </li>
            <li>
              <span>{strings.match_region}</span>
              {strings[`region_${match.region}`]}
            </li>
            <li>
              <span>{strings.th_skill}</span>
              {match.skill
                ? strings[`skill_${match.skill}`]
                : strings.general_unknown}
            </li>
          </ul>
        </div>
      </div>
      {!match.version && (
        <Warning className="unparsed">{strings.tooltip_unparsed}</Warning>
      )}
      <div className="matchButtons">
        <FlatButton
          label={
            match.version
              ? strings.match_button_reparse
              : strings.match_button_parse
          }
          icon={match.version ? <NavigationRefresh /> : <ActionFingerprint />}
          containerElement={<Link to={`/request#${match.match_id}`}>r</Link>}
        />
        {match.replay_url && (
          <FlatButton
            label={strings.match_button_replay}
            icon={<FileFileDownload />}
            href={match.replay_url}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {process.env.REACT_APP_ENABLE_RIVALRY && <FlatButton
          label={strings.app_rivalry}
          icon={
            <img src="/assets/images/rivalry-icon.png" alt="" height="24px" />
          }
          href="https://www.rivalry.com/opendota"
          target="_blank"
          rel="noopener noreferrer"
        />}
      </div>
    </Styled>
  );
};

MatchHeader.propTypes = {
  match: PropTypes.shape({}),
  user: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MatchHeader);

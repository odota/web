import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import { transformations, isRadiant, sum } from '../../../utility';
import { IconRadiant, IconDire } from '../../Icons';
import Warning from '../../Alerts';
import constants from '../../constants';
import config from '../../../config';

const Styled = styled.header`
  width: 100vw;
  margin: 0px -50vw 0px -50vw;
  position: relative;
  left: 50%;
  right: 50%;
  padding-top: 35px;
  background-color: rgba(14, 84, 113, 37%);

  .matchInfo {
    display: grid;
    grid-template-columns: 1fr minmax(500px, max-content) 1fr;
    justify-items: center;
    align-items: center;

    @media only screen and (max-width: 1000px) {
      grid-template-columns: none;
      grid-template-rows: auto;
      grid-gap: 10px;
      margin-bottom: 15px;
    }
  }

  .team {
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 6%);
    background: rgba(0, 0, 0, 23%);
    padding: 8px;
    border-radius: 3px;
    margin-right: 30px;
    margin-left: 30px;
    justify-self: flex-end;
    font-weight: 700;

    @media only screen and (max-width: 1023px) {
      flex-basis: 100%;
      max-width: 100%;
      justify-self: auto;
    }
    font-size: 28px;

    @media only screen and (max-width: 1023px) {
      text-align: center;
      margin: 10px 0;
    }

    & > span {
      letter-spacing: 1px;
    }

    &.radiant {
      background: rgba(9, 90, 30, 23%);
    }

    &.dire {
      background: rgba(143, 16, 16, 23%);
    }

    & svg {
      width: 32px;
      height: 32px;
      margin-right: 10px;
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
    padding: 20px 0px 10px 0px;
    margin-right: 30px;
    margin-left: 30px;
    justify-self: flex-start;

    @media only screen and (max-width: 1023px) {
      flex-basis: 100%;
      max-width: 100%;
      justify-self: auto;
    }
    text-align: right;

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

  .copy-match-id {
    span {
      line-height: 17px;
      padding: 0px !important;
      padding-right: 4px !important;
    }
    
    svg {
      margin: 0px  !important;
      margin-left: 4px  !important;
    }

    line-height: 0px !important;
    height: 20px !important;
  },
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

  const copyMatchId = () => navigator.clipboard.writeText(match.match_id);

  const mapPlayers = (key, radiant) => (player) =>
    radiant === undefined || radiant === isRadiant(player.player_slot)
      ? Number(player[key])
      : null;

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
                match.start_time + match.duration
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
              <FlatButton
                label={match.match_id}
                className='copy-match-id'
                onClick={copyMatchId}
                icon={<ContentCopy viewBox='0 -3 30 30' style={{ height: 18, width: 18 }} />}
              />
            </li>
            <li>
              <span>{strings.match_region}</span>
              {strings[`region_${match.region}`]}
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
        {config.VITE_ENABLE_DOTA_COACH && (
          <FlatButton
            label={strings.app_dota_coach_button}
            icon={
              <img
                src="/assets/images/dota-coach-icon.png"
                alt="Sponsor icon dota-coach.com"
                height="24px"
              />
            }
            href="https://dota-coach.com?s=OpenDota&c=analytics"
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {config.VITE_ENABLE_RIVALRY && (
          <FlatButton
            label={strings.app_rivalry}
            icon={
              <img src="/assets/images/rivalry-icon.png" alt="Sponsor icon rivalry.com" height="24px" />
            }
            href="https://www.rivalry.com/opendota"
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </div>
    </Styled>
  );
};

MatchHeader.propTypes = {
  match: PropTypes.shape({}),
  user: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MatchHeader);

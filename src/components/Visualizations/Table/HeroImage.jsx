import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import { TableLink } from 'components/Table';
import playerColors from 'dotaconstants/build/player_colors.json';
import { IconDice, IconCrystalBall, IconCheckCircle } from 'components/Icons';
import SocialPerson from 'material-ui/svg-icons/social/person';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import styled from 'styled-components';
import { subTextStyle } from 'utility';
import constants from '../../constants';

const Styled = styled.div`
.subTextContainer {
  position: relative;

  & svg {
    color: currentcolor !important;
    height: 13px !important;
    width: 13px !important;
    vertical-align: top;
    padding: 1px 0;
  }

  & section {
    margin-left: -2px;
    margin-right: 4px;
    display: inline-block;
  }
}

.textContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;
  width: 125px;
  text-align: left;

  & > span {
    position: relative;
    white-space: nowrap;

    & a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: sub;
    }
  }
}

.image {
  margin-right: 7px;
  position: relative;
  height: 29px;
  box-shadow: 0 0 5px ${constants.defaultPrimaryColor};
}

.abandoned {
  position: absolute;
  right: 7px;
  bottom: 8px;
  height: 15px;

  &[data-hint] {
    &::before,
    &::after {
      left: 40%;
    }
  }
}

.abandoned img {
  width: 51px;
}

.parsed {
  position: relative;
  left: -24px;
  width: 2px;
  height: 29px;
  background-color: ${constants.primaryLinkColor};

  /* Material-ui icon */
  & svg {
    position: relative !important;
    left: -10px !important;
    fill: ${constants.primaryLinkColor} !important;
  }
}

.unparsed {
  position: relative;
  left: -24px;
  width: 2px;
  height: 29px;
  background-color: ${constants.colorMuted};

  /* Material-ui icon */
  & svg {
    position: relative !important;
    left: -10px !important;
    fill: transparent !important;
  }
}

.badge {
  display: inline-block;

  & svg {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
  }
}

.registered {
  display: inline-block;

  & svg {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
  }
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: ${constants.colorSuccess};
  border-radius: 50%;
  margin-top: 1px;
}

.imageContainer {
  position: relative;
  display: flex;
  justify-content: center;
}

.playerSlot {
  width: 2px;
  height: 29px;
  position: absolute;
  left: 0;
  box-shadow: 1px 0 2px ${constants.defaultPrimaryColor};
}

.golden {
  fill: ${constants.colorGolden} !important;
}

.party {
  position: absolute;
  top: 0;
  width: 11px;
  height: 93%;
  left: -28px;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;

    &[data-next] {
      border-left: 2px solid ${constants.colorMutedLight};
      border-top: 2px solid ${constants.colorMutedLight};
      top: 50%;
    }

    &[data-prev-next] {
      border-left: 9px solid ${constants.colorMutedLight};
      // height: 185%;
      // top: -39%;
    }

    &[data-prev] {
      border-left: 2px solid ${constants.colorMutedLight};
      border-bottom: 2px solid ${constants.colorMutedLight};
      top: -50%;
    }
  }
}

.hoverIcon {
  margin-left: 4px;
}

.hoverIcon:first-child {
  margin-left: 8px;
}

.pvgnaGuideContainer {
  margin: auto;
}

.pvgnaGuideIcon {
  max-width: 24px;
  max-height: 24px;
}
`;

const HeroImageContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
`;

const TableHeroImage = ({
  parsed,
  image,
  registered,
  title,
  subtitle,
  accountId,
  playerSlot,
  hideText,
  confirmed,
  party,
  heroName,
  showPvgnaGuide,
  pvgnaGuideInfo,
  randomed,
  repicked,
  predictedVictory,
  leaverStatus,
}) => (
  <Styled>
    <HeroImageContainer>
      {parsed !== undefined &&
      <div
        className={parsed ? 'parsed' : 'unparsed'}
        data-hint={parsed && strings.tooltip_parsed}
      >
        <ActionDoneAll />
      </div>
      }
      {party &&
      <div className="party">
        {party}
      </div>
      }
      {image &&
      <div className="imageContainer">
        <img
          src={image}
          alt=""
          className="image"
        />
        {leaverStatus !== undefined && leaverStatus > 1 &&
        <span
          className="abandoned"
          data-hint={strings[`leaver_status_${leaverStatus}`]}
          data-hint-position="top"
        >
          <img
            src="/assets/images/dota2/disconnect_icon.png"
            alt=""
          />
        </span>
        }
        {playerSlot !== undefined &&
          <div
            className="playerSlot"
            style={{ backgroundColor: playerColors[playerSlot] }}
          />
        }
      </div>
      }
      {!hideText &&
      <div className="textContainer" style={{ marginLeft: !image && 59 }}>
        <span>
          {registered &&
            <div
              className="registered"
              data-hint={strings.tooltip_registered_user}
              data-hint-position="top"
            />
          }
          {confirmed &&
            <div
              className="badge"
              data-hint={`${strings.app_confirmed_as} ${title}`}
              data-hint-position="top"
            >
              <IconCheckCircle className="golden" />
            </div>
          }
          {accountId ?
            <TableLink to={`/players/${accountId}`}>
              {title}
            </TableLink>
            : title}
        </span>
        {subtitle &&
          <span style={subTextStyle} className="subTextContainer">
            {subtitle}
            <span>
              {randomed &&
                <span
                  className="hoverIcon"
                  data-hint={strings.general_randomed}
                  data-hint-position="top"
                >
                  <IconDice fill="currentcolor" />
                </span>
              }
              {repicked &&
                <span
                  className="hoverIcon"
                  data-hint={strings.general_repicked}
                  data-hint-position="top"
                >
                  <NotificationSync />
                </span>
              }
              {predictedVictory &&
                <span
                  className="hoverIcon"
                  data-hint={strings.general_predicted_victory}
                  data-hint-position="top"
                >
                  <IconCrystalBall fill="currentcolor" />
                </span>
              }
            </span>
          </span>
        }
      </div>
      }
      { !!showPvgnaGuide && pvgnaGuideInfo && heroName &&
      <div className="pvgnaGuideContainer" data-tip data-for={heroName}>
        <a href={pvgnaGuideInfo.url}>
          <img className="pvgnaGuideIcon" src="/assets/images/pvgna-guide-icon.png" alt={`Learn ${heroName} on Pvgna`} />
        </a>
        <ReactTooltip id={heroName} place="top" type="light" effect="solid" offset="{'top': 1, 'right': 3}">
          {`Learn ${heroName} on Pvgna`}
        </ReactTooltip>
      </div>
      }
    </HeroImageContainer>
  </Styled>
);

const {
  string, oneOfType, bool, node, shape, object,
} = PropTypes;

TableHeroImage.propTypes = {
  parsed: PropTypes.number,
  image: string,
  title: oneOfType([
    string,
    object,
  ]),
  subtitle: oneOfType([
    string,
    node,
  ]),
  registered: string,
  accountId: PropTypes.number,
  playerSlot: PropTypes.number,
  hideText: bool,
  party: node,
  confirmed: bool,
  heroName: string,
  showPvgnaGuide: oneOfType([
    bool,
    PropTypes.number,
  ]),
  pvgnaGuideInfo: shape({ url: string }),
  randomed: bool,
  repicked: string,
  predictedVictory: bool,
  leaverStatus: PropTypes.number,
};

// If need party or estimated, just add new prop with default val = solo and change icons depending what needs
export const Mmr = ({ number }) => (
  <span>
    <section
      data-hint={strings.th_solo_mmr}
      data-hint-position="bottom"
    >
      <SocialPerson />
    </section>
    {number || strings.general_unknown}
  </span>
);
Mmr.propTypes = {
  number: PropTypes.number,
};

export const CompetitiveRank = ({ rankTier }) => (
  <span>
    <section
      data-hint={strings.th_rank}
      data-hint-position="bottom"
    >
      <SocialPerson />
    </section>
    {rankTier}
  </span>
);
CompetitiveRank.propTypes = {
  rankTier: PropTypes.number,
};

export default TableHeroImage;

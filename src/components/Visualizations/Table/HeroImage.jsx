import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import playerColors from 'dotaconstants/build/player_colors.json';
import SocialPerson from 'material-ui/svg-icons/social/person';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import styled from 'styled-components';
import { subTextStyle, IMAGESIZE_ENUM } from '../../../utility';
import { TableLink } from '../../Table';
import { IconDice, IconCrystalBall, IconCheckCircle, IconContributor } from '../../Icons';
import constants from '../../constants';
import AttrStrength from '../../Icons/AttrStrength';
import AttrIntelligent from '../../Icons/AttrIntelligent';
import AttrAgility from '../../Icons/AttrAgility';
import HeroImage from '../HeroImage';


const Styled = styled.div`

.hero-tooltip .__react_component_tooltip {
  opacity: 1 !important;
  padding: 0px !important;
}

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
  width: 105px;
  text-align: left;

  & > span {
    position: relative;
    white-space: nowrap;

    & a {
      display: inline-block;
      width: 88%;
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
  left: -14px;
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

.contributor {
  display: inline-block;

  & svg {
    width: 14px !important;
    height: 14px !important;
    margin-right: 5px;
    -webkit-filter: drop-shadow(0 0 4px rgba(102,187,255, 1));
    filter: drop-shadow(0 0 4px rgba(102,187,255, 1));
    fill: ${constants.colorBlue}
  }
  width: 14px;
  height: 14px;
  margin-right: 2px;
  position: relative;
  top: 3px;
  right: 2px;
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
  z-index: 1;
}

.playerSlot {
  width: 2px;
  height: 29px;
  position: absolute;
  right: 7px;
}

.golden {
  fill: ${constants.colorGolden} !important;
}

.party {
  position: absolute;
  top: 0;
  width: 8px;
  height: 100%;
  left: -13px;


  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 2px solid;

    &::after {
      content: "";
      border-top: 2px solid;
      position: absolute;
      width: 132%;
      top: 50%;
      box-shadow: 0 0 5px rgba(0,0,0,0.4);
      border-color: inherit
    }

    &.group0 {
      border-color: #498a1a;
    }      
    &.group1 {
      border-color: ${constants.blue};
    }
    &.group2 {
      border-color: #D7E874;
    }    
    &.group3 {
      border-color: #923607;
    }

  }
}

.hoverIcon {
  margin-left: 4px;
}

.hoverIcon:first-child {
  margin-left: 8px;
}

.guideContainer {
  margin: auto;
}

.guideIcon {
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

const HeroToolTip = styled.div`
  width: 290px;
  overflow: hidden;
  background-color: #131519;
  background: ${(props) => {
    switch (props.heroAttr) {
      case 'str':
        return 'linear-gradient(135deg, rgba(19,21,25,1) 0%, rgba(89,48,48,1) 12%, rgba(19,21,25,1) 70%);';
      case 'agi':
        return 'linear-gradient(135deg, rgba(19,21,25,1) 0%, rgba(50,89,48,1) 12%, rgba(19,21,25,1) 70%);';
      case 'int':
        return 'linear-gradient(135deg, rgba(19,21,25,1) 0%, rgba(48,62,90,1) 12%, rgba(19,21,25,1) 70%);';
      default:
        return 'linear-gradient(135deg, rgba(19,21,25,1) 0%, rgba(48,62,90,1) 12%, rgba(19,21,25,1) 70%);';
    }
  }}
  overflow: hidden;
  border: 2px solid #27292b;

  .header {
    height: 120px;
    overflow: hidden;
  }

  .heroImg {
    position: relative;
    float: left;

    &::after {
      content: "";
      position:absolute;
      height: 100px;
      width: 86px;
      left: 10px;
      top: 10px;
      background: linear-gradient(to bottom, transparent 70%, rgba(0,0,0,1) 100%);
      }

    & .health-mana {
      position: absolute;
      left: 10px;
      top: 98px;
      line-height: 12px;
      width: 86px;
      text-align: center;
      z-index: 2;
      background: rgba(0, 0, 0, 0.6);

      & #health {
        color: ${constants.colorGreen};

        &::after {
          content: "/";
          color: ${constants.colorMuted};
        }

        &::before {
          content: "HP";
          color: #488249;
        }
      }
      
      & #mana {
        color: ${constants.colorMana};

        &::before {
          content: "MP";
          color: #3C638E;
        }
      }
    }

    & #heroImg-attribute {
      height: 15px;
      position: absolute;
      z-index: 2;
      left: 4px;
      top: 5px;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 50%;
    }

    & img {
      width: 86px;
      margin-left: 10px;
      margin-top: 10px;
      border-radius: 3px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.35);
      border-right: 2px solid rgba(0, 0, 0, 0.35);
      display: inline-block;
    }
  }

  .header-stats {
    height: 100px;
    width: 180px;
    margin-left: 8px;
    margin-bottom: 1px;
    display: inline-block;
    
    & #hero-name {
      color: ${constants.primaryTextColor};
      text-shadow: 1px 1px ${constants.colorMuted};
      margin-left: 7px;
      font-size: ${constants.fontSizeCommon};
      margin-top: 6px;
      letter-spacing: 1px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    & #hero-roles {
      font-size: ${constants.fontSizeTiny}
      color: #829091;
      margin-left: 7px;
      line-height: 10px;
      position: relative;
      top: -2px;
      height: 18px;
      letter-spacing: 1px;
    }

    & .attributes-container {
      height: 50px;
      width: 180px;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      position: relative;

      & .attributes {
      width: 50px;
      height: 50px;
      z-index: 100;

      & .attribute-img {
        display: block;
        height: 35px;
        margin-left: auto;
        margin-right: auto;
        border: 2px solid ${constants.colorMuted};
        border-radius: 50%;
        box-sizing: border-box;
        background: #111111;

        &[main="true"] {
          border: 2px solid ${constants.primaryTextColor};
        }
      }

      & .attribute-text {
        text-align: center;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    }
  }

  .stats {
    margin-bottom: 9px;

    & div {
      margin-left: 9px;
    }

    & span:last-child {
      font-size: larger;
      margin-right: 11px;
    }
    
    & .stat {
      display: flex;
      align-items: baseline;

      & .dots {
      border-bottom: 1px dashed rgba(114, 114, 114, 0.23);
      flex: 1;
      margin-right: 8px;
      margin-left: 8px;
      padding-bottom: 10px;
      }
    }
  } 
`;

const Trim = styled.hr`
  border: 0;
  height: 1px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${constants.colorMuted};
`;

const expand = {
  display: 'flex',
  position: 'relative',
  height: '100%',
  left: '-10px',
};

const TableHeroImage = ({
  parsed,
  image,
  registered,
  contributor,
  title,
  subtitle,
  accountId,
  playerSlot,
  hideText,
  confirmed,
  party,
  heroName,
  heroID,
  showGuide,
  guideUrl,
  guideType,
  randomed,
  repicked,
  predictedVictory,
  leaverStatus,
  strings,
  hero = {},
}) => (
  <Styled style={expand}>
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
      {(heroID || image) &&
      <div className="imageContainer">
        {image ?
          <img
            src={image}
            alt=""
            className="image"
            data-tip={hero.id === undefined && null}
            data-for={heroName}
          /> :
          <HeroImage id={heroID} className="image" data-tip={hero.id === undefined && null} data-for={heroName !== undefined && heroName} />
        }
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
      <div className="textContainer">
        <span>
          {registered && !contributor &&
            <div
              className="registered"
              data-hint={strings.tooltip_registered_user}
              data-hint-position="top"
            />
          }
          {contributor &&
            <div
              className="contributor"
              data-hint={strings.app_contributor}
              data-hint-position="top"
            >
              <IconContributor className="icon" dColor="#21be93" oColor="#212121" />
            </div>
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
      { Boolean(showGuide) && guideType && guideUrl && heroName &&
      <div className="guideContainer" data-tip data-for={heroName}>
        <a href={guideUrl}>
          { guideType === 'PVGNA' ? <img className="guideIcon" src="/assets/images/pvgna-guide-icon.png" alt={`Learn ${heroName} on Pvgna`} /> : <div /> }
          { guideType === 'MOREMMR' ? <img className="moremmr-icon" style={{ maxWidth: '60px' }} src="/assets/images/moremmr-icon2.svg" alt={`Learn ${heroName} on MoreMMR`} /> : <div /> }
        </a>
        <ReactTooltip id={heroName} place="top" type="light" effect="solid" offset="{'top': 1, 'right': 3}">
          { guideType === 'PVGNA' ? `Learn ${heroName} on Pvgna` : '' }
          { guideType === 'MOREMMR' ? `Learn ${heroName} on MoreMMR` : '' }
        </ReactTooltip>
      </div>
      }
      <div className="hero-tooltip">
        <ReactTooltip id={heroName} effect="solid" place="right">
          <HeroToolTip heroAttr={hero.primary_attr}>
            <div className="header">
              <div className="heroImg">
                <HeroImage id={heroID} imageSizeSuffix={IMAGESIZE_ENUM.VERT.suffix} />
                {hero.primary_attr === 'str' && <AttrStrength id="heroImg-attribute" />}
                {hero.primary_attr === 'agi' && <AttrAgility id="heroImg-attribute" />}
                {hero.primary_attr === 'int' && <AttrIntelligent id="heroImg-attribute" />}
                <div className="health-mana">
                  <span id="health">{Math.floor(hero.base_health)}</span><span id="mana">{Math.floor(hero.base_mana)}</span>
                </div>
              </div>
              <div className="header-stats">
                <div id="hero-name">{hero.localized_name}</div>
                <div id="hero-roles">{hero.attack_type} - {hero.roles && hero.roles.join(', ')}</div>
                <div className="attributes-container">
                  <div className="attributes">
                    <AttrStrength id="str" className="attribute-img" main={`${hero.primary_attr === 'str'}`} />
                    <div className="attribute-text">{hero.base_str} +{hero.str_gain}</div>
                  </div>
                  <div className="attributes">
                    <AttrAgility id="agi" className="attribute-img" main={`${hero.primary_attr === 'agi'}`} />
                    <div className="attribute-text">{hero.base_agi} +{hero.agi_gain}</div>
                  </div>
                  <div className="attributes">
                    <AttrIntelligent id="int" className="attribute-img" main={`${hero.primary_attr === 'int'}`} />
                    <div className="attribute-text">{hero.base_int} +{hero.int_gain}</div>
                  </div>
                </div>
              </div>
            </div>
            <Trim />
            <div className="stats">
              <div className="stat">
                <span>{`${strings.heading_move_speed}:`}</span>
                <span className="dots" />
                <span>{hero.move_speed}</span>
              </div>
              <div className="stat">
                <span>{`${strings.heading_attack}:`}</span>
                <span className="dots" />
                <span>{`${hero.base_attack_min}-${hero.base_attack_max}`}</span>
              </div>
              <div className="stat">
                <span>{`${strings.heading_base_armor}:`}</span>
                <span className="dots" />
                <span>{hero.base_armor}</span>
              </div>
              <div className="stat">
                <span>{`${strings.heading_attack_range}:`}</span>
                <span className="dots" />
                <span>{hero.attack_range}</span>
              </div>
            </div>
          </HeroToolTip>
        </ReactTooltip>
      </div>
    </HeroImageContainer>
  </Styled>
);

const {
  string, oneOfType, bool, node, object, number, shape,
} = PropTypes;

TableHeroImage.propTypes = {
  parsed: number,
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
  contributor: bool,
  accountId: number,
  playerSlot: number,
  hideText: bool,
  party: node,
  confirmed: bool,
  heroName: string,
  showGuide: oneOfType([
    bool,
    number,
  ]),
  guideUrl: string,
  guideType: string,
  randomed: bool,
  repicked: string,
  predictedVictory: bool,
  leaverStatus: number,
  strings: shape({}),
  hero: shape({}),
  heroID: number,
};

// If need party or estimated, just add new prop with default val = solo and change icons depending what needs
export const Mmr = ({ number, strings }) => (
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
  strings: PropTypes.shape({}),
};

export const CompetitiveRank = ({ rankTier, strings }) => (
  <span className="rank">
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
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(TableHeroImage);

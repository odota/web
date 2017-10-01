import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import { TableLink } from 'components/Table';
import playerColors from 'dotaconstants/build/player_colors.json';
import { IconDice, IconCrystalBall } from 'components/Icons';
import SocialPerson from 'material-ui/svg-icons/social/person';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import styles from './HeroImage.css';

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
  <div className={styles.container}>
    {parsed !== undefined &&
      <div
        className={parsed ? styles.parsed : styles.unparsed}
        data-hint={parsed && strings.tooltip_parsed}
      >
        <ActionDoneAll />
      </div>
    }
    {party &&
      <div className={styles.party}>
        {party}
      </div>
    }
    {image &&
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt=""
          className={styles.image}
        />
        {leaverStatus !== undefined && leaverStatus > 1 &&
        <span
          className={styles.abandoned}
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
            className={styles.playerSlot}
            style={{ backgroundColor: playerColors[playerSlot] }}
          />
        }
      </div>
    }
    {!hideText &&
      <div className={styles.textContainer} style={{ marginLeft: !image && 59 }}>
        <span>
          {registered &&
            <div
              className={styles.registered}
              data-hint={strings.tooltip_registered_user}
              data-hint-position="top"
            />
          }
          {confirmed &&
            <div
              className={styles.confirmed}
              data-hint={`${strings.app_confirmed_as} ${title}`}
              data-hint-position="top"
            >
              <CheckCircle className={styles.golden} />
            </div>
          }
          {accountId ?
            <TableLink to={`/players/${accountId}`}>
              {title}
            </TableLink>
            : title}
        </span>
        {subtitle &&
          <span className={styles.subText}>
            {subtitle}
            <span>
              {randomed &&
                <span
                  className={styles.hoverIcon}
                  data-hint={strings.general_randomed}
                  data-hint-position="top"
                >
                  <IconDice fill="currentcolor" />
                </span>
              }
              {repicked &&
                <span
                  className={styles.hoverIcon}
                  data-hint={strings.general_repicked}
                  data-hint-position="top"
                >
                  <NotificationSync />
                </span>
              }
              {predictedVictory &&
                <span
                  className={styles.hoverIcon}
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
      <div className={styles.pvgnaGuideContainer} data-tip data-for={heroName}>
        <a href={pvgnaGuideInfo.url}>
          <img className={styles.pvgnaGuideIcon} src="/assets/images/pvgna-guide-icon.png" alt={`Learn ${heroName} on Pvgna`} />
        </a>
        <ReactTooltip id={heroName} place="top" type="light" effect="solid">
          {`Learn ${heroName} on Pvgna`}
        </ReactTooltip>
      </div>
    }
  </div>
);

const { string, oneOfType, bool, node, shape, object, number } = PropTypes;

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
  leaverStatus: number,
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

export default TableHeroImage;

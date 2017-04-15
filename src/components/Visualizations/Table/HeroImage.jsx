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
          role="presentation"
          className={styles.image}
        />
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
            <span className={styles.iconBox}>
              {randomed &&
                <span
                  data-hint={strings.general_randomed}
                  data-hint-position="top"
                >
                  <IconDice fill="currentcolor" />
                </span>
              }
              {repicked &&
                <span
                  data-hint={strings.general_repicked}
                  data-hint-position="top"
                >
                  <NotificationSync />
                </span>
              }
              {predictedVictory &&
                <span
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

const { number, string, oneOfType, bool, node, object } = PropTypes;

TableHeroImage.propTypes = {
  parsed: number,
  image: string,
  title: string,
  subtitle: oneOfType([
    string,
    node,
  ]),
  registered: string,
  accountId: number,
  playerSlot: number,
  hideText: bool,
  party: node,
  confirmed: bool,
  heroName: string,
  showPvgnaGuide: bool,
  pvgnaGuideInfo: object,

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

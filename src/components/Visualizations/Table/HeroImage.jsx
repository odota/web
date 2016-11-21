import React from 'react';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import { TableLink } from 'components/Table';
import playerColors from 'dotaconstants/json/player_colors.json';
import { IconTrophy } from 'components/Icons';
import SocialPerson from 'material-ui/svg-icons/social/person';
import styles from './HeroImage.css';
import { IconDire, IconRadiant } from 'components/Icons'

const TableHeroImage = ({
  parsed,
  isRadiant,
  image,
  registered,
  title,
  subtitle,
  accountId,
  playerSlot,
  hideText,
  confirmed,
  party,
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
    {isRadiant !== undefined &&
      <div className={styles.teamIcon}>
        {isRadiant ?
          <IconRadiant className={styles.iconRadiant} /> :
          <IconDire className={styles.iconDire} />}
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
              <IconTrophy />
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
          </span>
        }
      </div>
    }
  </div>
);

const { number, string, oneOfType, bool, node } = React.PropTypes;

TableHeroImage.propTypes = {
  parsed: number,
  isRadiant: bool,
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

export default TableHeroImage;

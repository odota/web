import React from 'react';
import ReactTooltip from 'react-tooltip';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import { TableLink } from 'components/Table';
import { playerColors } from 'utility';
import { IconTrophy } from 'components/Icons';
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
}) => (
  <div className={styles.container}>
    {parsed !== undefined &&
    <div
      className={parsed ? styles.parsed : styles.unparsed}
      data-tip
      data-for={parsed ? 'parsed' : 'unparsed'}
    >
      <ActionDoneAll />
      <ReactTooltip id={parsed ? 'parsed' : 'unparsed'} place="right" effect="solid">
        {parsed ? strings.tooltip_parsed : strings.tooltip_unparsed}
      </ReactTooltip>
    </div>
    }
    <div className={styles.party}>
      {party}
    </div>
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
        <div data-tip data-for={`registered_${accountId}`} className={styles.registered}>
          <ReactTooltip id={`registered_${accountId}`} place="top" effect="solid">
            {strings.tooltip_registered_user}
          </ReactTooltip>
        </div>
        }
        {confirmed &&
        <div data-tip data-for={`confirmed_${accountId}`} className={styles.confirmed}>
          <IconTrophy />
          <ReactTooltip id={`confirmed_${accountId}`} place="top"effect="solid">
            {strings.app_confirmed_as} {title}
          </ReactTooltip>
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
    </div>}
  </div>
);

const { number, string, object, oneOfType, bool, node } = React.PropTypes;

TableHeroImage.propTypes = {
  parsed: number,
  image: string,
  title: string,
  subtitle: oneOfType([
    string,
    object,
  ]),
  registered: string,
  accountId: number,
  playerSlot: number,
  hideText: bool,
  party: node,
};

export default TableHeroImage;

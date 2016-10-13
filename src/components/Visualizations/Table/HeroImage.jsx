import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import { TableLink } from 'components/Table';
import { playerSlotColor } from 'utility';
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
}) => {
  const tooltipId = uuid.v4();

  return (
    <div className={styles.container}>
      {parsed &&
      <div className={styles.parsed}>
        <div data-tip data-for="parsed">
          <ActionDoneAll color={styles.blue} className={styles.actionDoneAll} />
          <ReactTooltip id="parsed" place="right" type="light" effect="solid">
            {strings.tooltip_parsed}
          </ReactTooltip>
        </div>
      </div>
      }
      <div className={styles.imageContainer}>
        <img
          src={image}
          role="presentation"
          className={styles.image}
        />
        {playerSlot !== undefined &&
        <div
          className={styles.playerSlot}
          style={{ backgroundColor: playerSlotColor(playerSlot) }}
        />
        }
      </div>
      {!hideText &&
      <div className={styles.textContainer}>
        <span>
          {registered &&
          <div data-tip data-for={tooltipId} className={styles.registered}>
            <ReactTooltip id={tooltipId} place="top" type="light" effect="solid">
              {strings.tooltip_registered_user}
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
};

const { number, string, object, oneOfType, bool } = React.PropTypes;

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
};

export default TableHeroImage;

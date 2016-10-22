import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import { TableLink } from 'components/Table';
import { playerColors } from 'utility';
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
      {parsed !== undefined &&
      <div
        className={parsed ? styles.parsed : styles.unparsed}
        data-tip
        data-for={parsed ? 'parsed' : 'unparsed'}
      >
        <ActionDoneAll />
        <ReactTooltip id={parsed ? 'parsed' : 'unparsed'} place="right" type="light" effect="solid">
          {parsed ? strings.tooltip_parsed : strings.tooltip_unparsed}
        </ReactTooltip>
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

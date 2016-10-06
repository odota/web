import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';
import { TableLink } from 'components/Table';
import { FromNowTooltip } from 'components/Visualizations';
import strings from 'lang';
import styles from './Player.css';

export default ({ row, tooltipId = uuid.v4() }) => (
  <div className={styles.container}>
    <img
      src={row.avatar}
      role="presentation"
      className={styles.image}
    />
    <div>
      {row.last_login &&
        <div data-tip data-for={tooltipId} className={styles.registered}>
          <ReactTooltip id={tooltipId} place="top" type="light" effect="solid">
            {strings.tooltip_registered_user}
          </ReactTooltip>
        </div>
      }
      <TableLink to={`/players/${row.account_id}`}>
        {row.name || row.personaname}
      </TableLink>
      <span className={styles.subText}>
        <FromNowTooltip timestamp={row.last_played} />
      </span>
    </div>
  </div>
);

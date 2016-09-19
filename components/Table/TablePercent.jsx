import React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './TablePercent.css';

export default ({ text, tooltip, tooltipId, val1, val2, val3 }) => {
  const pLine = () => (
    <div>
      {val3 ?
        <div className={styles.TablePercent}>
          <div style={{ width: `${val1}%`, backgroundColor: styles.red }} />
          <div style={{ width: `${val2}%`, backgroundColor: styles.neutral }} />
          <div style={{ width: `${val3}%`, backgroundColor: styles.green }} />
        </div> :
        <div className={styles.TablePercent}>
          <div style={{ width: `${val1}%`, backgroundColor: `${val1 >= 50 ? styles.green : styles.low}` }} />
          <div style={{ width: `${100 - val1}%`, backgroundColor: styles.neutral }} />
        </div>
      }
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      <div>
        {text}
      </div>
      {tooltip && tooltipId ?
        <div>
          <div data-tip data-for={tooltipId}>
            {pLine()}
          </div>
          <ReactTooltip id={tooltipId} place="right" type="light" effect="float">
            {tooltip}
          </ReactTooltip>
        </div>
      : pLine()}
    </div>
  );
};

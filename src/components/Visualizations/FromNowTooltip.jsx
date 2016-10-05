import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';
import {
  fromNow,
} from 'utility';

const FromNowTooltip = ({
  timestamp,
}) => {
  const tooltipId = uuid.v4();
  return (
    <div data-tip data-for={tooltipId}>
      {fromNow(timestamp)}
      <ReactTooltip id={tooltipId} place="right" type="light" effect="float">
        { // Country Code Language List http://www.fincher.org/Utilities/CountryLanguageList.shtml
          new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        }
      </ReactTooltip>
    </div>
  );
};

FromNowTooltip.propTypes = {
  timestamp: React.PropTypes.number,
};

export default FromNowTooltip;

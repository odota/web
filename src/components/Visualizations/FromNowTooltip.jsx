import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';

export default ({
  fromNow,
  date,
}) => {
  const tooltipId = uuid.v4();
  return (
    <div data-tip data-for={tooltipId}>
      {fromNow}
      <ReactTooltip id={tooltipId} place="right" type="light" effect="float">
        { // Country Code Language List http://www.fincher.org/Utilities/CountryLanguageList.shtml
          date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        }
      </ReactTooltip>
    </div>
  );
};

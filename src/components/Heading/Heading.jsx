import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import FlatButton from 'material-ui/FlatButton';
import { StyledDiv, TwoLineDiv } from './Styled';

const Heading = ({
  title = '', titleTo, icon = <ActionLabelOutline />, subtitle, buttonLabel, buttonTo, buttonIcon, twoLine, info,
}) => {
  const DivToUse = twoLine ? TwoLineDiv : StyledDiv;
  return (
    <DivToUse>
      <span className="title">
        {icon}
        {titleTo ?
          <Link to={titleTo}>
            {title.trim()}
          </Link>
        : title.trim()}
      </span>
      <span className="subtitle">
        {subtitle}
      </span>
      <span className="info" data-hint={info} style={{ display: info ? 'inline' : 'none' }}>
        {'(?)'}
      </span>
      <span class="sponsor-button">
        { buttonLabel ?
          <FlatButton
            label={buttonLabel}
            icon={buttonIcon ? <img src={buttonIcon} alt="" /> : ''}
            href={buttonTo}
            target="_blank"
            rel="noopener noreferrer"
          />
          : <div/>
        }
      </span>
    </DivToUse>);
};

const {
  string, element, oneOfType, bool, shape,
} = PropTypes;

Heading.propTypes = {
  title: string,
  titleTo: string,
  icon: oneOfType([
    string,
    element,
  ]),
  subtitle: oneOfType([
    shape({}),
    string,
  ]),
  twoLine: bool,
  info: string,
};

export default Heading;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import RaisedButton from 'material-ui/RaisedButton';
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
      { buttonLabel && buttonTo && buttonIcon ?
        <span className="sponsor-button">
          <RaisedButton
            label={buttonLabel}
            icon={buttonIcon ? <img src={buttonIcon} alt="" /> : ''}
            href={buttonTo}
            target="_blank"
            rel="noopener noreferrer"
            primary
          />
        </span>
        : <div />
      }
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
  buttonLabel: string,
  buttonTo: string,
  buttonIcon: string,
};

export default Heading;

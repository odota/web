import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import { StyledDiv, TwoLineDiv } from './Styled';

const Heading = ({
  title = '', titleTo, icon = <ActionLabelOutline />, subtitle, twoLine,
}) => {
  const DivToUse = twoLine ? TwoLineDiv : StyledDiv;
  return (
    <DivToUse>
      {icon}
      <span className="title">
        {titleTo ?
          <Link to={titleTo}>
            {title.trim()}
          </Link>
        : title.trim()}
      </span>
      <span className="subtitle">
        {subtitle}
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
  subtitle: shape({}),
  twoLine: bool,
};

export default Heading;

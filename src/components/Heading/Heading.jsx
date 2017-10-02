import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styled from 'styled-components';
import constants from '../constants';

const StyledDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;

  & svg {
    vertical-align: top;
    height: 26px !important;
    width: 26px !important;
    margin-right: 6px;
    opacity: 0.8;
    fill: ${constants.textColorPrimary};
  }

  & a {
    color: ${constants.primaryTextColor};
    text-decoration: none;

    &:hover {
      color: ${constants.primaryLinkColor};
    }
  }

  & .title {
    font-size: 20px;
  }

  & .subtitle {
    margin-left: 5px;
    font-size: ${constants.fontSizeMedium};
    color: ${constants.colorMutedLight};
  }
`;
const Heading = ({ title = '', titleTo, icon = <ActionLabelOutline />, subtitle }) => (
  <StyledDiv>
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
  </StyledDiv>
);

const { string, element, oneOfType, object } = PropTypes;

Heading.propTypes = {
  title: string,
  titleTo: string,
  icon: oneOfType([
    string,
    element,
  ]),
  subtitle: object,
};

export default Heading;

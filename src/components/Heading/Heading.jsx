import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { StyledDiv, TwoLineDiv } from './Styled';

const Heading = ({
  title = '', titleTo, icon, subtitle, buttonLabel, buttonTo, buttonIcon, twoLine, info, winner, strings, className
}) => {
  const DivToUse = twoLine ? TwoLineDiv : StyledDiv;
  return (
    <DivToUse className={className}>
      <span className="title">
        {icon}
        {titleTo
          ? (
            <Link to={titleTo}>
              {title.trim()}
            </Link>
          )
          : title.trim()}
      </span>
      <span className="subtitle">
        {subtitle}
        <Tooltip title={info}>
          <span className="info" style={{ display: info ? 'inline' : 'none' }}>
            (?)
          </span>
        </Tooltip>
      </span>
      {winner &&
      <span className="winner">
        {strings.th_winner}
      </span>
      }
      { buttonLabel && buttonTo && buttonIcon ?
        <span className="sponsor-button">
          <RaisedButton
            label={buttonLabel}
            icon={<img src={buttonIcon} alt="" />}
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
  winner: bool,
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Heading);

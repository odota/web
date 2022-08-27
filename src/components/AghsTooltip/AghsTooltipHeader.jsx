import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  color: ${constants.colorBlue};
  background-color: rgba(102, 187, 255, 0.2);
  
  .header-content {
    height: 25px;
    padding: 5px 13px 5px 13px;
    white-space: nowrap;
    display: flex;
  }

  #scepter-img {
    display: inline-block;
    height: 32px;
    width: 30px;
    padding: 4px;
    margin: -8px 6px 0px 6px;
    vertical-align: middle;
  } 

  #shard-img {
    display: inline-block;
    height: 25px;
    width: 35px;
    margin: 2px 4px;
    padding: 0 4px;
    vertical-align: middle;
  } 
`;

const HeaderText = styled.div`
  height: 100%;
  position: relative;
  display: inline-block;
  margin-left: 8px;
  color: ${constants.colorBlue};
  font-weight: bold;
  letter-spacing: 1px;
`;

const AghanimsTooltipHeader = ({ image, type, children }) => (
  <Header>
    <div className="header-content">
      <img id={`${type}-img`} src={image} alt="" />
      <HeaderText>
        {children}
      </HeaderText>
    </div>
  </Header>
);

AghanimsTooltipHeader.propTypes = {
  image: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

export default AghanimsTooltipHeader;

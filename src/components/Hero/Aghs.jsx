import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import nanoid from 'nanoid';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import constants from '../constants';
import AghsTooltip from '../AghsTooltip';

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${constants.colorBlueMuted}, ${constants.primarySurfaceColor});
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
  position: relative;

  .__react_component_tooltip {
    opacity: 1 !important;
    padding: 0px !important;
`;

const AghsSlot = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: auto;
  opacity: 1;
  overflow: hidden;
  transition: opacity .2s, box-shadow .4s, transform .2s;
  width: 100%;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 150px rgba(255, 255, 255, .4);
    transform: scale(1.1);
  }
`;

const ScepterIcon = styled.img`
  display: block;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
  width: 66%;
  height: 66%;
`;

const ShardIcon = styled.img`
  display: block;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
  width: 66%;
  height: 66%;
`;


const Aghs = (props) => {
    const ttId = nanoid();
  
    return (
      <Wrapper data-tip data-for={ttId}>
        <AghsSlot alt="aghs">
          <ScepterIcon src="/assets/images/dota2/scepter_1.png"/>
          <ShardIcon src="/assets/images/dota2/shard_1.png"/>          
        </AghsSlot>
        <ReactTooltip id={ttId} effect="solid" place="bottom">
            <AghsTooltip place="right" aghs={props}/>
          </ReactTooltip>
      </Wrapper>
    );
  };

Aghs.propTypes = {
  heroAghs: propTypes.shape({}).isRequired,
  skills: propTypes.array.isRequired,
  hero_npc_name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

const mapStateToProps = state => ({
  heroAghs: state.app.heroAghs,
});

export default connect(mapStateToProps)(Aghs);

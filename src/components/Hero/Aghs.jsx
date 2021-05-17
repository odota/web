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

  .solid_line {
    border-top: 1px solid #1e1e1f;
    margin: 2px 5px 2px 5px;
  }
`;

const IconWrapper = styled.div`
  display: block;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 150px rgba(255, 255, 255, .4);
    transform: scale(1.1);
  }
`;

const AghsIcon = styled.img`
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


const Aghs = ({heroAghs, hero_npc_name, skills}) => {
  const ttId = nanoid();
  const ttId2 = nanoid();

  const hero_name = hero_npc_name;
  const agh_element = heroAghs[hero_name];

  agh_element.scepter.skillObj = skills.find(skill => {
    return skill.data.dname === agh_element.scepter.skill_name_loc;
  }).data;
  agh_element.shard.skillObj = skills.find(skill => {
    return skill.data.dname === agh_element.shard.skill_name_loc;
  }).data;



  //const scepter_img = skills[0].key + skills[0].data.img;


  return (
    <Wrapper>
      <AghsSlot alt="aghs">
        <IconWrapper data-tip data-for="scepter_tt">
          <AghsIcon src="/assets/images/dota2/scepter_1.png"/>
         
        </IconWrapper>
        <ReactTooltip id="scepter_tt" effect="solid" place="left">
            <AghsTooltip place="right" aghs={agh_element.scepter}/>
        </ReactTooltip>
        <div class="solid_line"/>
        <IconWrapper data-tip data-for="shard_tt">
          <ShardIcon src="/assets/images/dota2/shard_1.png"/>
        </IconWrapper>
        <ReactTooltip id="shard_tt" effect="solid" place="left">
            <AghsTooltip place="right" aghs={agh_element.shard}/>
        </ReactTooltip>
      </AghsSlot>

    </Wrapper>
  );
};

Aghs.propTypes = {
  heroAghs: propTypes.shape({}).isRequired,
  skills: propTypes.array.isRequired,
  hero_npc_name: propTypes.string.isRequired,
};

const mapStateToProps = state => ({
  heroAghs: state.app.heroAghs
});

export default connect(mapStateToProps)(Aghs);

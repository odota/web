import React from 'react';
import strings from 'lang';
import { IconOpenSource, IconStatsBars, IconWand } from '../components/Icons';
import styled from 'styled-components';
import constants from '../constants';

const StyledDiv = styled.div`
  margin: 50px auto 0;
  text-align: center;
  max-width: 1920px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  & .whyList {
    display: flex;
    justify-content: space-around;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }

    & .whyElement {
      max-width: 25%;
      box-sizing: border-box;
      padding: 0 0.5rem;

      @media only screen and (max-width: 768px) {
        max-width: 100%;
        margin-bottom: 30px;
      }

      & svg {
        width: 85px;
        height: 85px;
        fill: ${constants.colorBlue};
      }

      & .headline {
        font-size: 24px;
        line-height: 2;
      }

      & .description {
        font-weight: ${constants.fontWeightLight};
        line-height: 1.5;
        color: rgb(190, 190, 190);
      }
    }
  }
`;

export default () => (
  <StyledDiv>
    <div className="whyList">
      <div className="whyElement">
        <IconOpenSource />
        <div className="headline">
          {strings.home_opensource_title}
        </div>
        <div className="description">
          {strings.home_opensource_desc}
        </div>
      </div>
      <div className="whyElement">
        <IconStatsBars />
        <div className="headline">
          {strings.home_indepth_title}
        </div>
        <div className="description">
          {strings.home_indepth_desc}
        </div>
      </div>
      <div className="whyElement">
        <IconWand />
        <div className="headline">
          {strings.home_free_title}
        </div>
        <div className="description">
          {strings.home_free_desc}
        </div>
      </div>
    </div>
  </StyledDiv>
);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../../constants';
import { IMAGESIZE_ENUM } from '../../../utility';
import HeroImage from './../../Visualizations/HeroImage';

const Styled = styled.div`
color: ${constants.textColorSecondary};
margin-top: -20px;

.PicksBans {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  margin-top: 33px;
  margin-bottom: 15px;

  & > section {
    position: relative;
    margin: 5px 5px 0px 0px;

    & > aside {
      font-size: 11px;
      text-transform: uppercase;
      text-align: center;
      margin-top: -5px;
      background-color: rgba(0, 0, 0, 0.8);
      line-height: 1.6;
    }
  }

  @media only screen and (max-width: 716px) {
    margin: 0;
  }
}

img {
  position: relative;
  height: 29px;
  box-shadow: 0 0 5px ${constants.defaultPrimaryColor};
  margin-right: 0;
  z-index: 0;

  &[data-isPick="false"] {
    filter: grayscale(100%);
  }

  @media only screen and (max-width: 716px) {
    width: 42px;
    object-fit: cover;
  }
}

.ban {
  position: absolute;
  z-index: 1;
  left: -3px;
  right: -3px;
  top: 14px;
  border-top: 2px solid ${constants.colorDanger};
  transform: rotate(-28deg);

  @media only screen and (max-width: 716px) {
    transform: rotate(-34deg);
    top: 13px;
  }
}
`;

const PicksBans = ({ data, strings, style }) => (
  <Styled style={style}>
    <div className="PicksBans">
      {data.map(pb => (
        <section key={pb.order}>
          <HeroImage id={pb.hero_id} imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix} data-isPick={pb.is_pick} />
          {!pb.is_pick && <div className="ban" />}
          <aside>
            {pb.is_pick ? strings.match_pick : strings.match_ban} <b>{pb.order + 1}</b>
          </aside>
        </section>
      ))}
    </div>
  </Styled>
);

PicksBans.propTypes = {
  data: PropTypes.arrayOf({}),
  strings: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PicksBans);

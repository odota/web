import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import { formatTemplateToString } from '../../../../utility';

const fastPlurality = (val, singular, plural) => (val === 1 ? singular : plural);

const formatDurationString = (sec, strings) => {
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec - (days * 86400)) / 3600);
  const minutes = Math.floor((sec - (days * 86400) - (hours * 3600)) / 60);
  const seconds = Math.floor((sec - (days * 86400) - (hours * 3600) - (minutes * 60)));
  return [
    formatTemplateToString(fastPlurality(days, strings.time_abbr_d, strings.time_abbr_dd), days),
    formatTemplateToString(fastPlurality(hours, strings.time_abbr_h, strings.time_abbr_hh), hours),
    formatTemplateToString(fastPlurality(minutes, strings.time_abbr_m, strings.time_abbr_mm), minutes),
    formatTemplateToString(fastPlurality(seconds, strings.time_abbr_s, strings.time_abbr_ss), seconds),
  ].join(' ');
};

const Wrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  width: 20%;

  @media screen and (max-width: 1000px) {
    width: 25%;
  }

  @media screen and (max-width: 850px) {
    width: 33.333%;
  }

  @media screen and (max-width: 560px) {
    width: 50%;
  }

  @media screen and (max-width: 380px) {
    width: 100%;
  }
`;

const Box = styled.div`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .35);
  overflow: hidden;
`;

const Header = styled.div`
  background: rgba(0, 0, 0, .15);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1;
  padding: 16px 12px;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  text-transform: uppercase;
`;

const Value = styled.div`
  font-size: 12px;
  line-height: 1;
  padding: 16px 12px;
  text-align: center;
`;

const Card = ({ total, strings }) => (
  <Wrapper>
    <Box>
      <Header>{strings[`heading_${total.field}`]}</Header>
      <Value>{total.field === 'duration' ? formatDurationString(total.sum, strings) : Math.floor(total.sum).toLocaleString()}</Value>
    </Box>
  </Wrapper>
);

Card.propTypes = {
  total: shape({}),
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Card);

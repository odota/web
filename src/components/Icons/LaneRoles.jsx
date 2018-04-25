import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const icon = (props) => {
  const { color } = props.style;
  return (
    <svg {...props} viewBox="0 0 24 24">
      <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_24" y2="2" x2="2" y1="12" x1="2" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke={color} fill="none" />
      <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_26" y2="22.062643" x2="22" y1="12.062643" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke={color} fill="none" />
      <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_27" y2="22" x2="12" y1="22" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke={color} fill="none" />
      <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_28" y2="2" x2="12" y1="2" x1="2" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" stroke={color} fill="none" />
      <line transform="rotate(-45 11.999999999999998,12.015661239624022) " strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_33" y2="12.031322" x2="18" y1="12" x1="6" fillOpacity="1" strokeOpacity="null" strokeWidth="1.5" stroke={color} fill="none" />
    </svg>);
};

export default styled(icon)`
height: 24px;
`;

icon.propTypes = {
  style: PropTypes.shape({}),
};

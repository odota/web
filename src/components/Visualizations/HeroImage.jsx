import React from 'react';
import PropTypes from 'prop-types';
import { customHeroImage } from '../../utility';

// src: image URL ; img: image path ;
const HeroImage = ({
  id, src, img, isIcon, style = {}, alt = '', className, 'data-tip': dataTip, 'data-for': dataFor,
}) => {
  const restProps = {
    style, alt, className, 'data-tip': dataTip, 'data-for': dataFor,
  };

  if (customHeroImage.includes(Number(id))) {
    return <img src={`/assets/images/dota2/heroes/${id}${isIcon ? '_icon' : ''}.png`} alt="" {...restProps} />;
  }
  return <img src={src || `${process.env.REACT_APP_API_HOST}${img}`} alt="" {...restProps} />;
};

HeroImage.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  img: PropTypes.string,
  isIcon: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string,
  'data-tip': PropTypes.bool,
  'data-for': PropTypes.string,
  alt: PropTypes.string,
  heroID: PropTypes.number,
};


export default HeroImage;

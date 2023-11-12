import React from 'react';
import PropTypes from 'prop-types';
import heroes from 'dotaconstants/build/heroes.json';
import { IMAGESIZE_ENUM } from '../../utility';
import config from '../../config';

const HeroImage = ({
  id, isIcon, imageSizeSuffix = IMAGESIZE_ENUM.LARGE.suffix, heroImageEventProps, ...rest
}) => {
  let imageUrl = heroes[id] && config.VITE_IMAGE_CDN + heroes[id].img;

  if (isIcon) {
    imageUrl = heroes[id] && config.VITE_IMAGE_CDN + heroes[id].icon;
  }

  return <img src={imageUrl} alt="" {...rest} {...heroImageEventProps} />;
};


HeroImage.propTypes = {
  id: PropTypes.number,
  isIcon: PropTypes.bool,
  imageSizeSuffix: PropTypes.string,
};


export default HeroImage;

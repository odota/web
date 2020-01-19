import React from 'react';
import PropTypes from 'prop-types';
import heroes from 'dotaconstants/build/heroes.json';
import { customHeroImage, IMAGESIZE_ENUM } from '../../utility';


const HeroImage = ({
  id, isIcon, imageSizeSuffix = IMAGESIZE_ENUM.LARGE.suffix, heroImageEventProps, ...rest
}) => {
  // Temporary fix for the CDN icons for void spirit and snapfire:
  if (isIcon && (Number(id) === 126 || Number(id) === 128)) {
    return <img src={`/assets/images/dota2/heroes/${id}${isIcon ? '_icon' : ''}.png`} alt="" {...rest} {...heroImageEventProps} />;
  }
  if (customHeroImage.includes(Number(id)) && isIcon) {
    return <img src={`/assets/images/dota2/heroes/${id}${isIcon ? '_icon' : ''}.png`} alt="" {...rest} {...heroImageEventProps} />;
  }

  let imageUrl = heroes[id] && process.env.REACT_APP_API_HOST + heroes[id].img; // "[api url]/abaddon_full.png?"
  if (imageUrl) {
    imageUrl = imageUrl.slice(0, -('full.png?'.length)); // "[api url]/abaddon"
  }
  imageUrl += (isIcon ? 'icon.png' : imageSizeSuffix);

  return <img src={imageUrl} alt="" {...rest} {...heroImageEventProps} />;
};


HeroImage.propTypes = {
  id: PropTypes.number,
  isIcon: PropTypes.bool,
  imageSizeSuffix: PropTypes.string,
};


export default HeroImage;

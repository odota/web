import React from 'react';
import { heroes } from 'dotaconstants';
import { IMAGESIZE_ENUM } from '../../utility';
import config from '../../config';

const HeroImage = ({
  id,
  isIcon,
  imageSizeSuffix = IMAGESIZE_ENUM.LARGE.suffix,
  heroImageEventProps,
  ...rest
}: {
  id: string | undefined,
  isIcon?: boolean,
  imageSizeSuffix?: string,
  heroImageEventProps?: any,
  style?: any,
  className?: string,
  onClick?: Function,
  alt?: string,
}) => {
  let imageUrl = heroes[id as unknown as keyof Heroes] && config.VITE_IMAGE_CDN + heroes[id as unknown as keyof Heroes].img;

  if (isIcon) {
    imageUrl = heroes[id as unknown as keyof Heroes] && config.VITE_IMAGE_CDN + heroes[id as unknown as keyof Heroes].icon;
  }

  return <img src={imageUrl} alt="" {...rest} {...heroImageEventProps} />;
};

export default HeroImage;

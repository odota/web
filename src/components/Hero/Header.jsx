import React from 'react';
import styled from 'styled-components';
import { shape } from 'prop-types';
import constants from '../constants';
import AttributesMain from './AttributesMain';
import Abilities from './Abilities';
import config from '../../config';

const getHeroImgSrc = (src) => config.VITE_IMAGE_CDN + src;

const HeroProfile = styled.div`
  background: ${constants.almostBlack};
  overflow: hidden;
  position: relative;
  border-radius: 8px;
`;

const HeroProfileBackground = styled.img`
  background-repeat: no-repeat;
  filter: blur(25px);
  height: 125%;
  left: -12.5%;
  object-fit: cover;
  opacity: 0.35;
  position: absolute;
  top: -12.5%;
  width: 125%;
`;

const HeroProfileContent = styled.div`
  align-items: center;
  box-shadow: inset 0 0 125px rgba(0, 0, 0, 0.25);
  display: flex;
  padding: 56px;
  position: relative;

  @media screen and (max-width: ${constants.wrapTablet}) {
    padding: 16px;
  }

  @media screen and (max-width: ${constants.wrapMobile}) {
    display: block;
    text-align: center;
  }
`;

const HeroDetails = styled.div`
  flex: 1 1 100%;
  margin: 0 24px;

  @media screen and (max-width: ${constants.wrapMobile}) {
    margin: 12px 0;
  }
`;

const HeroAvatar = styled.img`
  border-radius: 16px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  display: block;
  flex-shrink: 0;
  height: 128px;
  object-fit: cover;
  width: 180px;

  @media screen and (max-width: ${constants.wrapTablet}) {
    height: 64px;
    width: 120px;
  }

  @media screen and (max-width: ${constants.wrapMobile}) {
    margin: auto;
  }
`;

const HeroName = styled.div`
  font-size: 40px;
  font-weight: ${constants.fontWeightMedium};
  line-height: 40px;

  @media screen and (max-width: ${constants.wrapTablet}) {
    font-size: 28px;
    line-height: 28px;
  }
`;

const HeroRoleInformations = styled.div`
  color: ${constants.primaryTextColor};
  font-size: 12px;
  letter-spacing: 1px;
  margin: 8px 0;
  text-transform: uppercase;

  @media screen and (max-width: ${constants.wrapTablet}) {
    font-size: 10px;
  }
`;

const HeroRoles = styled.span`
  color: ${constants.colorMutedLight};
  word-wrap: break-word;
`;

const HeroDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HeroStatsWrapper = styled.div`
  flex: 1 1 100%;
`;

const Header = ({ hero }) => (
  <HeroDescription>
    <HeroProfile>
      <HeroProfileBackground
        alt={hero.localized_name}
        src={getHeroImgSrc(hero.img)}
      />
      <HeroProfileContent>
        <HeroAvatar alt={hero.localized_name} src={getHeroImgSrc(hero.img)} />
        <HeroDetails>
          <HeroName>{hero.localized_name}</HeroName>
          <HeroRoleInformations>
            {hero.attack_type} - <HeroRoles>{hero.roles.join(', ')}</HeroRoles>
          </HeroRoleInformations>
        </HeroDetails>
        <HeroStatsWrapper>
          <AttributesMain hero={hero} />
          <Abilities hero={hero} />
        </HeroStatsWrapper>
      </HeroProfileContent>
    </HeroProfile>
  </HeroDescription>
);

Header.propTypes = {
  hero: shape({}),
};

export default Header;

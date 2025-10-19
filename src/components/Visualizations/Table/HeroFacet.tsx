import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { heroes } from 'dotaconstants';
import config from '../../../config';
import { useHeroAbilities } from '../../../hooks/useHeroAbilities.hook';

const Facet = styled.div`
  .facet {
    width: 18px;
    height: 18px;
    position: absolute;
    bottom: -4px;
    right: 8px;
    z-index: 10;
    border-radius: 1px;

    & img {
      position: static;
      height: 12px;
      width: 12px;
      padding: 3px;
    }
  }

  .facetTooltip {
    display: flex;
    flex-direction: column;
    z-index: 10;
    max-width: 400px;

    & .facetHeader {
      display: flex;
      flex-direction: row;
      font-size: x-large;
      text-align: center;
      max-height: 68px;
      & span {
        padding: 15px;
      }
    }

    & .description {
      padding: 15px;
      background-color: #10171d;
    }

    & img {
      width: 42px;
      height: 42px;
    }
  }

  .color_Red_0 {
    background: linear-gradient(to right, #9f3c3c, #4a2040);
  }

  .color_Red_1 {
    background: linear-gradient(to right, #954533, #452732);
  }

  .color_Red_2 {
    background: linear-gradient(to right, #a3735e, #4f2a25);
  }

  .color_Yellow_0 {
    background: linear-gradient(to right, #c8a45c, #6f3d21);
  }

  .color_Yellow_1 {
    background: linear-gradient(to right, #c6a158, #604928);
  }

  .color_Yellow_2 {
    background: linear-gradient(to right, #cac194, #433828);
  }

  .color_Yellow_3 {
    background: linear-gradient(to right, #c3a99a, #4d352b);
  }

  .color_Purple_0 {
    background: linear-gradient(to right, #b57789, #412755);
  }

  .color_Purple_1 {
    background: linear-gradient(to right, #9c70a4, #282752);
  }

  .color_Purple_2 {
    background: linear-gradient(to right, #675cae, #261c44);
  }

  .color_Blue_0 {
    background: linear-gradient(to right, #727cb2, #342d5b);
  }

  .color_Blue_1 {
    background: linear-gradient(to right, #547ea6, #2a385e);
  }

  .color_Blue_2 {
    background: linear-gradient(to right, #6baebc, #135459);
  }

  .color_Blue_3 {
    background: linear-gradient(to right, #94b5ba, #385b59);
  }

  .color_Green_0 {
    background: linear-gradient(to right, #a2b23e, #2d5a18);
  }

  .color_Green_1 {
    background: linear-gradient(to right, #7ec2b2, #29493a);
  }

  .color_Green_2 {
    background: linear-gradient(to right, #a2b23e, #2d5a18);
  }

  .color_Green_3 {
    background: linear-gradient(to right, #9a9f6a, #223824);
  }

  .color_Green_4 {
    background: linear-gradient(to right, #9fad8e, #3f4129);
  }

  .color_Gray_0 {
    background: linear-gradient(to right, #565c61, #1b1b21);
  }

  .color_Gray_1 {
    background: linear-gradient(to right, #6a6d73, #29272c);
  }

  .color_Gray_2 {
    background: linear-gradient(to right, #95a9b1, #3e464f);
  }

  .color_Gray_3 {
    background: linear-gradient(to right, #adb6be, #4e5557);
  }
`;

const HeroFacet = ({
  heroID,
  facet,
}: {
  heroID: keyof typeof heroes;
  facet: number;
}) => {
  const heroAbilities = useHeroAbilities();

  if (!(heroID && facet)) {
    return null;
  }
  if (!heroAbilities) {
    return null;
  }

  const selectedFacet =
    heroAbilities[heroes[heroID].name]?.facets[facet - 1] ?? {};
  const { color, gradient_id, icon, name } = selectedFacet;

  const imageURL = `${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/icons/facets/${icon}.png`;
  const colorClass = `color_${color}_${gradient_id}`;

  return (
    <Facet>
      <div className={`facet ${colorClass}`} data-tip data-for={name}>
        <img src={imageURL} alt="" />
        <div className="hero-tooltip">
          <ReactTooltip id={name} effect="solid" place="right">
            <div
              className={`facetTooltip ${colorClass}`}
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <div className="facetHeader">
                <div
                  style={{
                    padding: '10px',
                    background:
                      'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))',
                  }}
                >
                  <img src={imageURL} alt="" />
                </div>
                <span>{selectedFacet.title}</span>
              </div>
              <div className="description">
                <span>{selectedFacet.description}</span>
              </div>
            </div>
          </ReactTooltip>
        </div>
      </div>
    </Facet>
  );
};

export default HeroFacet;

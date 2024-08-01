import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import heroes from 'dotaconstants/build/heroes.json';
import heroAbilities from 'dotaconstants/build/hero_abilities.json';
import config from '../../../config';

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
      background-color: #10171D;
    }

    & img {
      width: 42px;
      height: 42px;
    }
  }

  .color_Red_0 {
    background: linear-gradient(to right, #9F3C3C, #4A2040);
  }

  .color_Red_1 {
    background: linear-gradient(to right, #954533, #452732);
  }

  .color_Red_2 {
    background: linear-gradient(to right, #A3735E, #4F2A25);
  }

  .color_Yellow_0 {
    background: linear-gradient(to right, #C8A45C, #6F3D21);
  }

  .color_Yellow_1 {
    background: linear-gradient(to right, #C6A158, #604928);
  }

  .color_Yellow_2 {
    background: linear-gradient(to right, #CAC194, #433828);
  }

  .color_Yellow_3 {
    background: linear-gradient(to right, #C3A99A, #4D352B);
  }

  .color_Purple_0 {
    background: linear-gradient(to right, #B57789, #412755);
  }

  .color_Purple_1 {
    background: linear-gradient(to right, #9C70A4, #282752);
  }

  .color_Purple_2 {
    background: linear-gradient(to right, #675CAE, #261C44);
  }

  .color_Blue_0 {
    background: linear-gradient(to right, #727CB2, #342D5B);
  }

  .color_Blue_1 {
    background: linear-gradient(to right, #547EA6, #2A385E);
  }

  .color_Blue_2 {
    background: linear-gradient(to right, #6BAEBC, #135459);
  }

  .color_Blue_3 {
    background: linear-gradient(to right, #94B5BA, #385B59);
  }

  .color_Green_0 {
    background: linear-gradient(to right, #A2B23E, #2D5A18);
  }

  .color_Green_1 {
    background: linear-gradient(to right, #7EC2B2, #29493A);
  }

  .color_Green_2 {
    background: linear-gradient(to right, #A2B23E, #2D5A18);
  }

  .color_Green_3 {
    background: linear-gradient(to right, #9A9F6A, #223824);
  }

  .color_Green_4 {
    background: linear-gradient(to right, #9FAD8E, #3F4129);
  }

  .color_Gray_0 {
    background: linear-gradient(to right, #565C61, #1B1B21);
  }

  .color_Gray_1 {
    background: linear-gradient(to right, #6A6D73, #29272C);
  }

  .color_Gray_2 {
    background: linear-gradient(to right, #95A9B1, #3E464F);
  }

  .color_Gray_3 {
    background: linear-gradient(to right, #ADB6BE, #4E5557);
  }
`;

class HeroFacet extends React.Component {
  render() {
    const {
      heroID,
      facet
    } = this.props;

    if (!(heroID && facet)) return null;

    const selectedFacet = heroAbilities[heroes[heroID].name]?.facets[facet - 1] ?? {};
    const { color, gradient_id, icon, name } = selectedFacet;

    const imageURL = `${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/icons/facets/${icon}.png`;
    const colorClass = `color_${color}_${gradient_id}`;

    return (
      <Facet>
        <div className={`facet ${colorClass}`} data-tip data-for={name}>
          <img src={imageURL} alt="" />
          <div className='hero-tooltip'>
            <ReactTooltip id={name} effect='solid' place='right'>
              <div
                className={`facetTooltip ${colorClass}`}
                style={{
                  height: '100%',
                  width: '100%'
                }}>
                <div className='facetHeader'>
                  <div style={{
                    padding: '10px',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))'
                  }}>
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
  }
}

export default HeroFacet;

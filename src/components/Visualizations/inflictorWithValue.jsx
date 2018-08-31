import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid';
import items from 'dotaconstants/build/items.json';
import styled from 'styled-components';
import ItemTooltip from './../ItemTooltip/index';
import constants from '../constants';
import AbilityTooltip from '../AbilityTooltip';

const customNameIcon = {
  kaya: 'trident',
};

const getInflictorImage = (inflictor) => {
  if (inflictor.includes('recipe')) {
    return 'recipe';
  }
  return customNameIcon[inflictor] || inflictor;
};

const customImageIcon = ['refresher_shard'];

const StyledDiv = styled.div`
.__react_component_tooltip {
  opacity: 1 !important;
  padding: 0px !important;
}

.inflictorWithValue {
  position: relative;
  float: left;
  margin: 1px;
  height: 27px;
  z-index: 1;

  :hover {
    z-index: 9999;
  }

  & .overlay {
    background-color: ${constants.darkPrimaryColor};
    font-size: 10px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  &:matches([data-tip="true"]) {
    & > img {
      transition: ${constants.normalTransition};
    }

    &:hover {
      & > img {
        opacity: 0.7;
      }
    }
  }
}

.noBr {
  & br {
    display: none;
  }
}

.attribVal {
  color: ${constants.colorYelor};
  font-weight: ${constants.fontWeightMedium};
}

.cooldownMana {
  & div {
    display: inline-block;

    &:first-child {
      margin-right: 25px;
    }

    &:last-child {
      margin-top: 5px;
    }
  }
}

.buff {
  width: 29px;
  height: 29px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 5px ${constants.defaultPrimaryColor};
}

.buffOverlay {
  position: absolute;
  bottom: 0;
  right: 2px;
  color: ${constants.textColorPrimary};
  font-weight: ${constants.fontWeightMedium};
  text-shadow: 1px 1px 2px black, -1px -1px 2px black;
}
`;

class InflictorWithValue extends React.Component {
  static propTypes = {
    inflictor: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    ptooltip: PropTypes.shape({}),
    abilityId: PropTypes.number,
    strings: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = { showTooltip: false };
  }

  componentDidMount() {
    (async () => {
      const [abilities, neutralAbilities, abilityIds] = await Promise.all([
        await import('dotaconstants/build/abilities.json'),
        await import('dotaconstants/build/neutral_abilities.json'),
        await import('dotaconstants/build/ability_ids.json'),
      ]);
      this.setState({
        abilities,
        neutralAbilities,
        abilityIds,
      });
    })();
  }

  setShowTooltip = () => {
    if (!this.state.showTooltip) {
      this.setState({ showTooltip: true });
    }
  };

  render() {
    const {
      inflictor, value, type, ptooltip, abilityId, strings,
    } = this.props;
    const { abilities, neutralAbilities, abilityIds } = this.state;
    const resolvedInflictor = (abilityId && abilityIds && abilityIds[abilityId]) || String(inflictor);
    if (resolvedInflictor) {
      const ability = abilities && abilities[resolvedInflictor];
      const neutralAbility = neutralAbilities && neutralAbilities[resolvedInflictor];
      const item = items[resolvedInflictor];
      let image;
      let tooltip = strings.tooltip_autoattack_other;
      const ttId = uuid.v4();

      if (ability) {
        if (resolvedInflictor.includes('attribute_bonus')) {
          image = '/assets/images/stats.png';
        } else if (resolvedInflictor.includes('special_bonus')) {
          image = '/assets/images/dota2/talent_tree.svg';
        } else if (neutralAbility) {
          image = neutralAbility.img;
        } else {
          image = `${process.env.REACT_APP_API_HOST}/apps/dota2/images/abilities/${resolvedInflictor}_sm.png`;
        }
        tooltip = <AbilityTooltip ability={ability} inflictor={resolvedInflictor} />;
      } else if (item) {
        if (customImageIcon.includes(resolvedInflictor)) {
          image = `/assets/images/dota2/${resolvedInflictor}.png`;
        } else {
          image = `${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/${getInflictorImage(resolvedInflictor)}_lg.png`;
        }
        tooltip = <ItemTooltip item={item} inflictor={resolvedInflictor} />;
      } else {
        image = '/assets/images/default_attack.png';
      }
      if (ptooltip) {
        tooltip = ptooltip;
      }

      return (
        <StyledDiv>
          <div className="inflictorWithValue" data-tip={tooltip && true} data-for={ttId} onMouseEnter={this.setShowTooltip}>
            {!type &&
            <object data={image} height="27px" type="image/png">
              <img src="/assets/images/Dota2Logo.svg" alt="" style={{ filter: 'grayscale(60%)', height: '27px' }} />
            </object>}
            {type === 'buff' &&
            <div
              className="buff"
              style={{
              backgroundImage: `url(${image})`,
            }}
            />
          }
            {!type && <div className="overlay">{value}</div>}
            {type === 'buff' &&
            <div className="buffOverlay">
              {value > 0 && value}
            </div>
          }
            {tooltip &&
            <div className="tooltip">
              {this.state.showTooltip &&
              <ReactTooltip id={ttId} effect="solid" place="left">
                {tooltip}
              </ReactTooltip>
            }
            </div>}
          </div>
        </StyledDiv>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  abilities: state.app.abilities,
  neutralAbilities: state.app.neutralAbilities,
  abilityIds: state.app.abilityIds,
  strings: state.app.strings,
});

const InflictorWithValueCont = connect(mapStateToProps)(InflictorWithValue);

export default (inflictor, value, type, ptooltip, abilityId) => (
  <InflictorWithValueCont
    inflictor={inflictor}
    value={value}
    type={type}
    ptooltip={ptooltip}
    abilityId={abilityId}
  />
);

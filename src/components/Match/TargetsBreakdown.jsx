import React from 'react';
import PropTypes from 'prop-types';
import heroes from 'dotaconstants/build/heroes.json';
import ReactTooltip from 'react-tooltip';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { inflictorWithValue } from '../components/Visualizations';
import { sumValues, getHeroesById, abbreviateNumber } from 'utility';
import { StyledDmgTargetInflictor, StyledDmgTargetRow } from './StyledMatch';
import constants from '../constants';

const dmgTargetValueStyle = {
  position: 'absolute',
  left: '0px',
  width: '30px',
  height: '10px',
  bottom: '3px',
  fontSize: '10px',
  textAlign: 'center',
  lineHeight: '0.9',
  fontWeight: constants.fontWeightMedium,
  verticalAlign: 'center',
  zIndex: '1',
  backgroundColor: constants.darkPrimaryColor,
};

const dmgTargetIconStyle = {
  height: '30px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const arrowStyle = {
  position: 'relative',
  top: '4px',
  height: '20px',
  opacity: '0.3',
  transition: 'none',
};

const processCasts = (uses, targets) => {
  const field = {};
  Object.keys(uses).forEach(((ability) => {
    if (targets[ability]) {
      field[ability] = targets[ability];
    } else {
      field[ability] = { null: uses[ability] };
    }
  }));
  return field;
};

const damageTargetIcons = (t) => {
  const targets = [];
  Object.keys(t).forEach((target) => {
    const hero = getHeroesById()[target];
    const heroicon = hero && heroes[hero.id] && process.env.REACT_APP_API_HOST + heroes[hero.id].icon;
    let j;
    if (hero) {
      j = (
        <div
          id="target"
          style={{
           float: 'left',
           position: 'relative',
          }}
          data-tip
          data-for={`${hero.localized_name}`}
        >
          <span id="targetvalue" style={dmgTargetValueStyle}>{`${abbreviateNumber(t[target])}`}</span>
          <img
            src={heroicon}
            alt=""
            style={dmgTargetIconStyle}
            data-tip={`${hero.localized_name}`}
            data-offset="{'right': 5}"
            data-delay-show="50"
          />
          <ReactTooltip place="top" effect="solid" />
        </div>
      );
    }
    targets.push([j, t[target]]);
  });

  return (
    <div style={{ paddingRight: '15px', display: 'flex' }}>
      {targets.sort((a, b) => b[1] - a[1]).map(x => x[0])}
    </div>);
};

const TargetsBreakdown = ({ field, abilityUses = null }) => {
  if (field) {
    let f;
    if (abilityUses) {
      f = Object.entries(processCasts(abilityUses, field))
        .sort((a, b) => abilityUses[b[0]] - abilityUses[a[0]])
        .reduce((obj, [k, v]) => Object.assign(obj, { [k]: v }), {});
    } else {
      f = Object.entries(field)
        .sort((a, b) => sumValues(b[1]) - sumValues(a[1]))
        .reduce((obj, [k, v]) => Object.assign(obj, { [k]: v }), {});
    }
    const r = [];
    Object.keys(f).forEach((inflictor) => {
      const value = (
        <div>
          <div id="heroTargetValue">{abbreviateNumber(sumValues(f[inflictor]))}</div>
          <div id="totalValue">{(abilityUses && abilityUses[inflictor]) || abbreviateNumber(sumValues(f[inflictor]))}</div>
        </div>
      );
      r.push((
        <div style={{ display: 'flex' }}>
          {
            <StyledDmgTargetInflictor id="target">
              {inflictorWithValue(inflictor, value)}
            </StyledDmgTargetInflictor>
          }
          {!f[inflictor].null ? <NavigationArrowForward style={arrowStyle} /> : null}
          {
            damageTargetIcons(f[inflictor])
          }
        </div>
      ));
    });
    return (
      <StyledDmgTargetRow>
        <div>
          {r.map(row => <div style={{ display: 'flex', flexDirection: 'column', height: '33px' }} id="row">{row}</div>)}
        </div>
      </StyledDmgTargetRow>
    );
  }
  return null;
};

TargetsBreakdown.propTypes = {
  field: PropTypes.shape({}),
  abilityUses: PropTypes.shape({}),
};

export default TargetsBreakdown;

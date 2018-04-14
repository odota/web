import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import styled from 'styled-components';
import strings, { langs } from '../../lang';
import constants from '../constants';

const ClickableDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: ${constants.linearTransition};
  padding-right: 10px;
`;

const LanguageContainerDiv = styled.div`
  max-height: 300px;
  overflow: auto;
`;

const getLocalization = window.localStorage.getItem('localization');

const setLocalization = (event, key, payload) => {
  window.localStorage.setItem('localization', payload.value);
  window.location.reload();
};

const Localization = () => (
  <div>
    <SelectField
      floatingLabelText={strings.app_localization}
      value={getLocalization}
      onChange={setLocalization}
    >
      {langs.map(lang => <MenuItem key={lang} value={lang} primaryText={lang} />)}
    </SelectField>

  </div>
);

class LocalizationMenuItems extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOnClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={{ minWidth: '200px' }}>
        <ClickableDiv
          onClick={this.handleOnClick}
        >
          {strings.app_language} <Next />
        </ClickableDiv>
        <LanguageContainerDiv>
          {open && langs.map(lang => (<MenuItem
            style={{
              color: lang.value === getLocalization && constants.colorGolden,
            }}
            key={lang.translated}
            value={lang.value}
            primaryText={lang.native}
            onClick={() => setLocalization(null, null, lang)}
          />))}
        </LanguageContainerDiv>
      </div>
    );
  }
}

export default connect(null, null)(Localization);

export const LocalizationMenu = connect(null, null)(LocalizationMenuItems);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { localization } from 'reducers';
import { setLocalization } from 'actions';
import strings, { langs } from 'lang';
import styles from './Localization.css';

const Localization = ({ localization, setLocalization }) => (
  <div>
    <SelectField
      floatingLabelText={strings.app_localization}
      value={localization}
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
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { setLocalization, localization } = this.props;
    const { open } = this.state;
    return (
      <div className={styles.container}>
        <div
          className={classNames(styles.clickable, open && styles.open)}
          onClick={this.handleOnClick}
        >
          {strings.app_language} <Next />
        </div>
        <div className={styles.languageContainer}>
          {open && langs.map(lang => <MenuItem
            style={{
              color: lang.value === localization && styles.selected,
            }}
            key={lang.translated}
            value={lang.value}
            primaryText={lang.native}
            onTouchTap={() => setLocalization(null, null, lang)}
          />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  localization: localization(state),
});

const mapDispatchToProps = dispatch => ({
  setLocalization: (event, key, payload) => dispatch(setLocalization(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Localization);

export const LocalizationMenu = connect(mapStateToProps, mapDispatchToProps)(LocalizationMenuItems);

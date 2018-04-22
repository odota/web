import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const ButtonGarden = ({
  buttonNames, selectedButton, onClick, strings,
}) => (
  <SelectField
    floatingLabelText={strings.explorer_select}
    value={selectedButton}
    onChange={(event, index, value) => onClick(value)}
  >
    {buttonNames.map(buttonName => (<MenuItem
      value={buttonName}
      key={buttonName}
      primaryText={strings[`heading_${buttonName}`]}
    />))}
  </SelectField>
);

const {
  arrayOf, string, func, shape,
} = PropTypes;

ButtonGarden.propTypes = {
  buttonNames: arrayOf(string),
  selectedButton: string,
  onClick: func,
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(ButtonGarden);

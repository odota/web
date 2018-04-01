import React from 'react';
import PropTypes from 'prop-types';
// import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import strings from '../../lang';

const ButtonGarden = ({ buttonNames, selectedButton, onClick }) => (
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

const { arrayOf, string, func } = PropTypes;

ButtonGarden.propTypes = {
  buttonNames: arrayOf(string),
  selectedButton: string,
  onClick: func,
};

export default ButtonGarden;

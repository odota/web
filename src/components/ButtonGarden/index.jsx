import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 8px;
  margin-top: 8px;
`;

const ButtonGarden = ({
  buttonNames, selectedButton, onClick, strings,
}) => (
  <StyledFormControl>
    <InputLabel htmlFor="explorer_select">{strings.explorer_select}</InputLabel>
    <Select
      value={selectedButton}
      autoWidth
      style={{ minWidth: '200px' }}
      onChange={event => onClick(event.target.value)}
      inputProps={{
        name: 'explorer_select',
        id: 'explorer_select',
      }}
    >
      {buttonNames.map(buttonName => (<MenuItem value={buttonName}>{strings[`heading_${buttonName}`]}</MenuItem>))}
    </Select>
  </StyledFormControl>
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

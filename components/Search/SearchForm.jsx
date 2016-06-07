import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';

import style from './search.css';

const loadingStyle = {
  display: 'block',
  margin: '40px auto 0 auto',
};

const SearchForm = ({ hintText, onSubmit, disabled }) => {
  let queryValue = '';

  const formSubmit = (e) => {
    e.preventDefault();
    onSubmit(queryValue);
  };
  const loadingIndicator = () => (
    <div className={style.loadingWrapper}>
      <CircularProgress style={loadingStyle} />
    </div>
  );

  return (
    <form onSubmit={formSubmit}>
      <TextField
        disabled={disabled}
        hintText={hintText}
        onChange={(e) => { queryValue = e.target.value; }}
        fullWidth
      />
      <RaisedButton
        type="submit"
        label="Search"
        disabled={disabled}
        icon={<ActionSearch />}
      />
      {disabled ? loadingIndicator() : ''}
    </form>
  );
};

export default SearchForm;

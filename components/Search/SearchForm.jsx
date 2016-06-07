import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';

import style from './search.css';

const loadingStyle = {
  display: 'block',
  margin: '40px auto 0 auto',
};

class SearchForm extends Component {

  render() {
    const { hintText, onSubmit, disabled } = this.props;
    const formSubmit = (e) => {
      e.preventDefault();
      onSubmit(this.textField.input.value);
    };
    const loadingIndicator = () => (
      <div className={style.loadingWrapper}>
        <CircularProgress style={loadingStyle} />
      </div>
    );

    return (
      <form onSubmit={formSubmit}>
        <TextField
          ref={(ref) => {
            this.textField = ref;
          }}
          disabled={disabled}
          hintText={hintText}
          fullWidth
        />
        <RaisedButton
          type="submit"
          label="Search"
          disabled={disabled}
          icon={<ActionSearch />}
        />
        {disabled === true ? loadingIndicator() : ''}
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: React.PropTypes.func,
  hintText: React.PropTypes.string,
};
SearchForm.defaultProps = {
  onSubmit: () => {},
  hintText: '',
};

export default SearchForm;

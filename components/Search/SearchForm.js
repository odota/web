import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

class SearchForm extends Component {

  render() {
    const { hintText, onSubmit } = this.props;
    const formSubmit = (e) => {
      e.preventDefault();
      onSubmit(this.textField.input.value);
    };

    return (
      <form onSubmit={formSubmit}>
        <TextField
          ref={(ref) => {
            this.textField = ref;
          }}
          hintText={hintText}
          fullWidth
        />
        <RaisedButton
          type="submit"
          label="Search"
          icon={<ActionSearch />}
        />
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

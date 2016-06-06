import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

class SearchForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { hintText, onSubmit, query } = this.props;

    const onEnter = (e) => {
      
      if (e.keyCode !== 13)
        return;

      onSubmit(this.textField.input.value)
    }

    return (
      <div>
        <TextField 
          name="search" 
          ref={(ref) => this.textField = ref} 
          onKeyDown={onEnter} 
          hintText={hintText} 
          fullWidth={true} />

        <RaisedButton onClick={() => onSubmit(this.textField.input.value)} label="Search" icon={<ActionSearch />}/>
      </div>
    );
  }
};


SearchForm.propTypes = {
  onSubmit: React.PropTypes.func,
  hintText: React.PropTypes.string,
};

SearchForm.defaultProps = {
  onSubmit: () => {},
  hintText: '',
};

export default SearchForm

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import TextField from 'material-ui/TextField';
import querystring from 'querystring';
import { getSearchResultAndPros, setSearchQuery } from '../../actions';
import constants from '../constants';

type SearchFormProps = {
  dispatchSearch: Function,
  dispatchSetQuery: (args: any) => any,
  history: {
    push: Function,
  },
  strings: Strings,
  small: boolean,
}

class SearchForm extends React.Component<SearchFormProps, { query?: string }> {
  constructor(props: SearchFormProps) {
    super(props);

    const params = querystring.parse(window.location.search.substring(1));
    const { pathname } = window.location;
    if (params.q && pathname === '/search') {
      this.props.dispatchSearch(params.q);
      this.state = {
        query: params.q as string,
      };
    } else {
      this.state = {};
    }
  }

  debouncedSetQuery = (value?: any) => {
    debounce(this.props.dispatchSetQuery, 100);
  };

  formSubmit = (e: any) => {
    const { query } = this.state;
    e.preventDefault();
    this.props.history.push(`/search?q=${encodeURIComponent(query ?? '')}`);
    this.props.dispatchSearch(query);
  };

  handleChange = (e: any) => {
    const { pathname } = window.location;
    const { value } = e.target;

    this.setState({
      query: value,
    });

    if (pathname === '/search') {
      this.debouncedSetQuery(value);
    }
  };

  render() {
    const { strings, small } = this.props;
    return (
      <form
        onSubmit={this.formSubmit}
        style={{ width: small ? '260px' : 'auto' }}
      >
        <TextField
          id="searchField"
          aria-label={strings.search_title}
          hintText={
            small
              ? strings.search_title
              : `${strings.search_title?.slice(0, -13)}...`
          }
          value={this.state.query}
          onChange={this.handleChange}
          fullWidth
          underlineFocusStyle={{
            borderColor: constants.primaryLinkColor,
            bottom: '-4px',
            left: '-40px',
            width: 'calc(100% + 40px)',
          }}
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', display: 'flex' }}
          underlineStyle={{ borderColor: 'transparent' }}
        />
      </form>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
  small: state.browser.greaterThan.small,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchSearch: (query: string) => dispatch(getSearchResultAndPros(query)),
  dispatchSetQuery: (query: string) => dispatch(setSearchQuery(query)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchForm),
);

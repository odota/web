import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import TextField from 'material-ui/TextField';
import querystring from 'querystring';
import { getSearchResultAndPros, setSearchQuery } from '../../actions';
import constants from '../constants';

class SearchForm extends React.Component {
  static propTypes = {
    dispatchSearch: PropTypes.func,
    dispatchSetQuery: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    strings: PropTypes.shape({}),
    small: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const params = querystring.parse(window.location.search.substring(1));
    const { pathname } = window.location;
    if (params.q && pathname === '/search') {
      this.props.dispatchSearch(params.q);
      this.state = {
        query: params.q,
      };
    } else {
      this.state = {};
    }
  }

  debouncedSetQuery = () => {
    debounce(this.props.dispatchSetQuery, 100);
  };

  formSubmit = (e) => {
    const { query } = this.state;
    e.preventDefault();
    this.props.history.push(`/search?q=${encodeURIComponent(query)}`);
    this.props.dispatchSearch(query);
  };

  handleChange = (e) => {
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

const mapStateToProps = state => ({
  strings: state.app.strings,
  small: state.browser.greaterThan.small,
});

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResultAndPros(query)),
  dispatchSetQuery: query => dispatch(setSearchQuery(query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));

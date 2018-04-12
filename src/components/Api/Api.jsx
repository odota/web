import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import strings from '../../lang';

const path = '/api/keys';

const ApiContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  
  & li {
    list-style-type: initial;
  }
`;

const KeyContainer = styled.pre`
  background: grey;
  display: inline;
  padding: 10px;
`;

const TableContainer = styled.div`
  & table td {
    white-space: inherit !important;
  }
`;

class KeyManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      credentials: 'include',
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 403) {
          return {};
        }
        throw Error();
      })
      .then((json) => {
        this.setState({ ...json, loading: false });
      })
      .catch(() => this.setState({ error: true }));
  }

  handleSubmit(token) {
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload(false);
        } else {
          throw Error();
        }
      })
      .catch(() => this.setState({ error: true }));
  }

  handleDelete() {
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload(false);
        } else {
          throw Error();
        }
      })
      .catch(() => this.setState({ error: true }));
  }

  handleUpdate(token) {
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload(false);
        } else {
          throw Error();
        }
      })
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const { loading, user } = this.props;
    const showLoginButton = !user;
    const showGetKeyButton = user && !(this.state.customer && this.state.customer.api_key);

    return (
      <div>
        <Helmet>
          <title>{strings.title_api}</title>
          <meta name="description" content={strings.api_meta_description} />
        </Helmet>
        <ApiContainer style={{ textAlign: 'center' }}>
          {
            this.state.error ?
              <div>
                {strings.api_error}
              </div>
            : <div />
          }
          <h1>{strings.api_title}</h1>
          <h3>{strings.api_subtitle}</h3>
          {
            loading || this.state.loading ?
              <CircularProgress mode="indeterminate" />
            :
              <div>
                { showLoginButton ?
                  <a href={`${process.env.REACT_APP_API_HOST}/login`}>
                    <RaisedButton primary label={strings.api_login} style={{ margin: '5px 5px' }} />
                  </a>
                  : <div />
                }
                { showGetKeyButton ?
                  <StripeCheckout
                    name="OpenDota"
                    description={strings.api_title}
                    billingAddress
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                    token={this.handleSubmit}
                    zipCode
                    locale="auto"
                  >
                    <RaisedButton primary label={strings.api_get_key} style={{ margin: '5px 5px' }} />
                  </StripeCheckout>
                  : <span />
                }
                <a href="//docs.opendota.com">
                  <RaisedButton label={strings.api_docs} style={{ margin: '5px 5px' }} />
                </a>
                { this.state.customer ?
                  <div>
                    { this.state.customer.api_key ?
                      <div>
                        <h4>{strings.api_header_key}</h4>
                        <KeyContainer>{this.state.customer.api_key}</KeyContainer>
                        <p>{strings.api_key_usage.replace('$param', 'API_KEY=XXXX')}</p>
                        <a href={`https://api.opendota.com/api/matches/271145478?API_KEY=${this.state.customer.api_key}`}>
                          <KeyContainer>{`https://api.opendota.com/api/matches/271145478?API_KEY=${this.state.customer.api_key}`}</KeyContainer>
                        </a>
                        <p>{`${strings.api_billing_cycle
                            .replace('$date', (new Date(this.state.customer.current_period_end * 1000)).toLocaleDateString())} ${
                            strings.api_billed_to
                              .replace('$brand', this.state.customer.credit_brand)
                              .replace('$last4', this.state.customer.credit_last4)}`
                            }
                        </p>
                        <RaisedButton label={strings.api_delete} style={{ margin: '5px 5px' }} onClick={this.handleDelete} />
                        <StripeCheckout
                          name="OpenDota"
                          description={strings.api_title}
                          billingAddress
                          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                          token={this.handleUpdate}
                          zipCode
                          locale="auto"
                        >
                          <RaisedButton label={strings.api_update_billing} style={{ margin: '5px 5px' }} />
                        </StripeCheckout>
                      </div>
                      : <div />
                    }
                    {
                      this.state.usage ?
                        <div>
                          <h4>{strings.api_header_usage}</h4>
                          <Table style={{ width: '60%', margin: '0 auto' }}>
                            <TableHeader
                              displaySelectAll={false}
                              adjustForCheckbox={false}
                            >
                              <TableRow>
                                <TableHeaderColumn>{strings.api_month}</TableHeaderColumn>
                                <TableHeaderColumn>{strings.api_usage_calls}</TableHeaderColumn>
                              </TableRow>
                            </TableHeader>
                            <TableBody
                              displayRowCheckbox={false}
                            >
                              { this.state.usage.map(e => (
                                <TableRow key={e.month}>
                                  <TableRowColumn>{e.month}</TableRowColumn>
                                  <TableRowColumn>{e.usage_count}</TableRowColumn>
                                </TableRow>))}
                            </TableBody>
                          </Table>
                        </div>
                      : <div />
                    }
                  </div>
                  : <div />
                }
              </div>
          }
          <h3>{strings.api_header_details}</h3>
          <TableContainer>
            <Table style={{ width: '80%', margin: '0 auto' }}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn />
                  <TableHeaderColumn>{strings.api_details_free_tier}</TableHeaderColumn>
                  <TableHeaderColumn>{strings.api_details_premium_tier}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn>{strings.api_details_price}</TableHeaderColumn>
                  <TableRowColumn>{strings.api_details_price_free}</TableRowColumn>
                  <TableRowColumn>{strings.api_details_price_prem.replace('$price', '$1.00')}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>{strings.api_details_key_required}</TableHeaderColumn>
                  <TableRowColumn>{strings.api_details_key_required_free}</TableRowColumn>
                  <TableRowColumn>{strings.api_details_key_required_prem}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>{strings.api_details_call_limit}</TableHeaderColumn>
                  <TableRowColumn>{strings.api_details_call_limit_free.replace('$limit', '25000')}</TableRowColumn>
                  <TableRowColumn>{strings.api_details_call_limit_prem}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>{strings.api_details_rate_limit}</TableHeaderColumn>
                  <TableRowColumn>{strings.api_details_rate_limit_val.replace('$num', 60)}</TableRowColumn>
                  <TableRowColumn>{strings.api_details_rate_limit_val.replace('$num', 180)}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>{strings.api_details_support}</TableHeaderColumn>
                  <TableRowColumn>{strings.api_details_support_free}</TableRowColumn>
                  <TableRowColumn>{strings.api_details_support_prem}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <ul style={{ textAlign: 'left' }}>
            <li>{strings.api_free_to_prem}</li>
            <li>{strings.api_credit_required}</li>
            <li>{strings.api_stripe}</li>
            <li>{strings.api_delay}</li>
          </ul>
        </ApiContainer>
      </div>
    );
  }
}

KeyManagement.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    user: data.user,
  };
};

// const mapDispatchToProps = dispatch => ({
//   dispatchPostRequest: matchId => dispatch(postRequest(matchId)),
// });

export default connect(mapStateToProps, null)(KeyManagement);

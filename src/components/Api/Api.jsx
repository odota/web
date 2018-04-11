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
        const update = json;
        update.loading = false;
        this.setState(update);
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
        <Helmet title={strings.title_api} />
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
          <h3>{strings.api_header_price}</h3>
          <Table style={{ width: '60%', margin: '0 auto' }}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{`${strings.api_first} 25000 ${strings.api_calls_month}`}</TableHeaderColumn>
                <TableHeaderColumn>{`>25000 ${strings.api_calls_month}`}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              <TableRow>
                <TableRowColumn>{strings.api_free}</TableRowColumn>
                <TableRowColumn>{`$1.00 ${strings.api_per_unit}`}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>

          <h3>{strings.api_header_details}</h3>
          <ul style={{ textAlign: 'left' }}>
            <li>{strings.api_key_requirement}</li>
            <li>{strings.api_account_level}</li>
            <li>{strings.api_rate_limit}</li>
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

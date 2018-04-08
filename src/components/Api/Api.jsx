import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import strings from '../../lang';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const URI = '/api/keys';

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

  componentWillMount() {
    this.setState({ matchId: window.location.hash.slice(1) });
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_HOST}${URI}`, {
      credentials: 'include',
      method: 'GET'
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else if (res.status === 403) {
        this.setState({loggedIn: false});
        throw Error();
      }
    })
    .then((json) => {
      json.loading = false;
      this.setState(json)
    })
    .catch(err => this.setState({error: true}))
  }

  handleSubmit(token, address) {
    this.setState({loading: true});
    fetch(`${process.env.REACT_APP_API_HOST}${URI}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload(false);
      } else {
        throw Error(strings.api_error)
      }
    })
    .catch(err => this.setState({error: true}))
  }

  handleDelete() {
    this.setState({loading: true});
    fetch(`${process.env.REACT_APP_API_HOST}${URI}`, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload(false);
      } else {
        throw Error(strings.api_error)
      }
    })
    .catch(err => this.setState({error: true}))
  }
  
  handleUpdate(token, address) {
    this.setState({loading: true});
    fetch(`${process.env.REACT_APP_API_HOST}${URI}`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload(false);
      } else {
        throw Error(strings.api_error)
      }
    })
    .catch(err => this.setState({error: true}))
  }
  
  render() {
    const { loading, user } = this.props;

    return (
      <div>
        <Helmet title={strings.title_api} />
        <ApiContainer style={{ textAlign: 'center' }}>
          {
            this.state.error ?
            <div>
              {strings.api_error}
            </div>
            : <div/>
          }
          <h1>{strings.api_title}</h1>
          <h3>{strings.api_subtitle}</h3>
          {
            loading || this.state.loading ?
              <CircularProgress mode="indeterminate" />
            : <div>
                { user ? 
                  (this.state.customer && this.state.customer.api_key ?
                    <div />
                  : <StripeCheckout
                      billingAddress={true}
                      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                      token={this.handleSubmit}
                      zipCode={true}
                      locale='auto'
                    >
                      <RaisedButton label={strings.api_get_key} style={{margin:'5px 5px'}} />
                    </StripeCheckout>)
                : <a href={`${process.env.REACT_APP_API_HOST}/login`}>
                    <RaisedButton label={strings.api_login} style={{margin:'5px 5px'}} />
                  </a>
              }
              <a href={'//docs.opendota.com'}>
                <RaisedButton label={strings.api_docs} style={{margin:'5px 5px'}} />
              </a>
              {
                this.state.customer ?
                  <div>
                    { this.state.customer.api_key ?
                        <div>
                          <h4>Your Key</h4>
                          <KeyContainer>{this.state.customer.api_key}</KeyContainer>
                          <p>{strings.api_billing_cycle
                            .replace('$date', moment.unix(this.state.customer.current_period_end).format('MM-DD-YYYY')) + ' ' +
                            strings.api_billed_to
                              .replace('$brand', this.state.customer.credit_brand)
                              .replace('$last4', this.state.customer.credit_last4)
                            }</p>
                          <RaisedButton label={strings.api_delete} style={{margin:'5px 5px'}} onClick={this.handleDelete}/>
                          <StripeCheckout
                            billingAddress={true}
                            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                            token={this.handleUpdate}
                            zipCode={true}
                            locale='auto'
                          >
                            <RaisedButton label={strings.api_update_billing} style={{margin:'5px 5px'}} />
                          </StripeCheckout>
                        </div>
                      : <div/>
                    }
                  </div>
                : <div/>
              }
            </div>
          }
          <Table style={{width: '60%', margin:'0 auto' }}>
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
          
          <h3>{strings.api_details}</h3>
          <ul style={{textAlign: 'left'}}>
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
  error: PropTypes.string,
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

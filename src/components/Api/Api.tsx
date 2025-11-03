import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Alert, CircularProgress } from '@mui/material';
import { Button } from '@mui/material';
import styled from 'styled-components';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import config from '../../config';
import { IconSteam } from '../Icons';

const path = '/keys';

const ApiContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  & li {
    list-style-type: initial;
  }

  & h2 {
    font-size: 1.17em;
  }
`;

const KeyContainer = styled.pre`
  background: grey;
  display: inline;
  padding: 10px;
`;

const TableContainer = styled.div`
  table {
    width: 80%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.011);
  }

  & table td,
  table th {
    white-space: inherit !important;
  }

  th {
    color: rgb(255, 128, 171);
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailsContainer = styled.div`
  text-align: left;
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

class KeyManagement extends React.Component<
  { loading: boolean; metadata: any; strings: Strings },
  {
    error: boolean;
    loading: boolean;
    usage?: any[];
    openInvoices?: { paymentLink: string }[];
    customer?: {
      api_key: string;
      current_period_end: number;
      credit_brand: string;
      credit_last4: string;
    };
  }
> {
  constructor(props: any) {
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
    fetch(`${config.VITE_API_HOST}${path}`, {
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

  handleSubmit(token: Token) {
    this.setState({ loading: true });
    fetch(`${config.VITE_API_HOST}${path}`, {
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
          window.location.reload();
        } else {
          throw Error();
        }
      })
      .catch(() => this.setState({ error: true }));
  }

  handleDelete() {
    this.setState({ loading: true });
    fetch(`${config.VITE_API_HOST}${path}`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload();
        } else {
          throw Error();
        }
      })
      .catch(() => this.setState({ error: true }));
  }

  handleUpdate(token: Token) {
    this.setState({ loading: true });
    fetch(`${config.VITE_API_HOST}${path}`, {
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
          window.location.reload();
        } else {
          throw Error();
        }
      })
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const { loading, metadata, strings } = this.props;
    const user = metadata?.user;
    const showLoginButton = !user;
    const showGetKeyButton =
      user && !(this.state.customer && this.state.customer.api_key);
    const premUnit = 100;
    const freeCallLimit = metadata?.freeCallLimit;
    const freeRateLimit = metadata?.freeRateLimit;
    const premRateLimit = metadata?.premRateLimit;
    const premPrice = 0.01;

    return (
      <div>
        <Helmet>
          <title>{strings.title_api}</title>
          <meta name="description" content={strings.api_meta_description} />
        </Helmet>
        <ApiContainer style={{ textAlign: 'center' }}>
          {this.state.error ? <div>{strings.api_error}</div> : <div />}
          {this.state.openInvoices?.length ? <Alert severity="warning"><div>{strings.api_open_invoice}</div><div><a href={this.state.openInvoices?.[0]?.paymentLink}>{strings.api_invoice_link}</a></div></Alert> : null}
          <h1>{strings.api_title}</h1>
          <h2>{strings.api_subtitle}</h2>
          {loading || this.state.loading || !Object.keys(strings).length ? (
            <CircularProgress />
          ) : (
            <div>
              {showLoginButton ? (
                <Button
                  variant="contained"
                  startIcon={<IconSteam />}
                  href={`${config.VITE_API_HOST}/login`}
                  style={{ margin: '5px 5px' }}
                >
                  {strings.api_login}
                </Button>
              ) : (
                <div />
              )}
              {showGetKeyButton ? (
                <StripeCheckout
                  name="OpenDota"
                  description={strings.api_title}
                  billingAddress
                  stripeKey={config.VITE_STRIPE_PUBLIC_KEY}
                  token={this.handleSubmit}
                  zipCode
                  locale="auto"
                >
                  <Button variant="contained" style={{ margin: '5px 5px' }}>
                    {strings.api_get_key}
                  </Button>
                </StripeCheckout>
              ) : (
                <span />
              )}
              <Button
                href="//docs.opendota.com"
                target="_blank"
                style={{ margin: '5px 5px' }}
              >
                {strings.api_docs}
              </Button>
              {this.state.customer ? (
                <div>
                  {this.state.customer.api_key ? (
                    <div>
                      <h4>{strings.api_header_key}</h4>
                      <KeyContainer>{this.state.customer.api_key}</KeyContainer>
                      <p>
                        {strings.api_key_usage.replace(
                          '$param',
                          'api_key=XXXX',
                        )}
                      </p>
                      <div style={{ overflow: 'hidden' }}>
                        <a
                          href={`https://api.opendota.com/api/matches/271145478?api_key=${this.state.customer.api_key}`}
                        >
                          <KeyContainer>{`https://api.opendota.com/api/matches/271145478?api_key=${this.state.customer.api_key}`}</KeyContainer>
                        </a>
                      </div>
                      <p>
                        {`${strings.api_billing_cycle.replace(
                          '$date',
                          new Date(
                            this.state.customer.current_period_end * 1000,
                          ).toLocaleDateString(),
                        )} ${strings.api_billed_to
                          .replace('$brand', this.state.customer.credit_brand)
                          .replace(
                            '$last4',
                            this.state.customer.credit_last4,
                          )}`}
                      </p>
                      <p>
                        {strings.api_support.replace(
                          '$email',
                          'api@opendota.com',
                        )}
                      </p>
                      <Button
                        variant="contained"
                        style={{ margin: '5px 5px' }}
                        onClick={this.handleDelete}
                      >
                        {strings.api_delete}
                      </Button>
                      <StripeCheckout
                        name="OpenDota"
                        description={strings.api_title}
                        billingAddress
                        stripeKey={config.VITE_STRIPE_PUBLIC_KEY}
                        token={this.handleUpdate}
                        zipCode
                        locale="auto"
                      >
                        <Button
                          variant="contained"
                          style={{ margin: '5px 5px' }}
                        >
                          {strings.api_update_billing}
                        </Button>
                      </StripeCheckout>
                    </div>
                  ) : (
                    <div />
                  )}
                  {this.state.usage ? (
                    <div>
                      <h4>{strings.api_header_usage}</h4>
                      <TableContainer>
                        <table>
                          <thead>
                            <tr>
                              <th>{strings.api_month}</th>
                              <th>{strings.api_usage_calls}</th>
                              <th>{strings.api_usage_fees}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.usage.map((e) => (
                              <tr key={e.month}>
                                <td>{e.month}</td>
                                <td>{e.usage_count}</td>
                                <td>{`$${Number(premPrice * Math.ceil(e.usage_count / premUnit)).toFixed(2)}`}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </TableContainer>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ) : (
                <div />
              )}
              <h2>{strings.api_header_table}</h2>
              <TableContainer>
                <table>
                  <thead>
                    <tr>
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <th aria-hidden="true" />
                      <th>{strings.api_details_free_tier}</th>
                      <th>{strings.api_details_premium_tier}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{strings.api_details_price}</th>
                      <td>{strings.api_details_price_free}</td>
                      <td>
                        {strings.api_details_price_prem
                          .replace('price', String(premPrice))
                          .replace('$unit', String(premUnit))}
                      </td>
                    </tr>
                    <tr>
                      <th>{strings.api_details_key_required}</th>
                      <td>{strings.api_details_key_required_free}</td>
                      <td>{strings.api_details_key_required_prem}</td>
                    </tr>
                    <tr>
                      <th>{strings.api_details_call_limit}</th>
                      <td>
                        {strings.api_details_call_limit_free_day.replace(
                          '$limit',
                          String(freeCallLimit),
                        )}
                      </td>
                      <td>{strings.api_details_call_limit_prem}</td>
                    </tr>
                    <tr>
                      <th>{strings.api_details_rate_limit}</th>
                      <td>
                        {strings.api_details_rate_limit_val.replace(
                          '$num',
                          String(freeRateLimit),
                        )}
                      </td>
                      <td>
                        {strings.api_details_rate_limit_val.replace(
                          '$num',
                          String(premRateLimit),
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>{strings.api_details_support}</th>
                      <td>{strings.api_details_support_free}</td>
                      <td>{strings.api_details_support_prem}</td>
                    </tr>
                    <tr style={{ height: '24px' }} />
                  </tbody>
                </table>
              </TableContainer>

              <h3>{strings.api_header_details}</h3>
              <DetailsContainer>
                <ul>
                  <li>
                    {strings.api_charging.replace(
                      '$cost',
                      `$${premPrice / premUnit}`,
                    )}
                  </li>
                  <li>{strings.api_credit_required}</li>
                  <li>{strings.api_failure}</li>
                </ul>
              </DetailsContainer>
            </div>
          )}
        </ApiContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    metadata: data,
    strings: state.app.strings,
  };
};

export default connect(mapStateToProps, null)(KeyManagement);

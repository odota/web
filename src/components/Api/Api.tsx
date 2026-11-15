import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Alert, CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import { LoadingOverlayUpper30 } from "../LoadingOverlay";
import { IconSteam } from "../Icons";
import config from "../../config";
import constants from "../constants";
import styles from "./Api.module.css";

const path = "/keys";

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
    };
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: false,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(`${config.VITE_API_HOST}${path}`, {
        credentials: "include",
        method: "GET",
      });

      let json;
      if (res.ok) {
        json = await res.json();
      } else if (res.status === 403) {
        json = {};
      } else {
        throw Error();
      }

      this.setState({ ...json, loading: false });
    } catch {
      this.setState({ error: true });
    }
  }

  // Creates a Stripe-hosted Checkout Session for a new subscription/API key
  // and redirects the browser to it.
  // See: https://docs.stripe.com/payments/checkout/migration
  handleCheckout = async () => {
    this.setState({ loading: true });
    try {
      const res = await fetch(`${config.VITE_API_HOST}${path}/checkout`, {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const json = await res.json();

      if (json?.url) {
        window.location.href = json.url;
      } else {
        // Already had an active key (no-op), just refresh
        window.location.reload();
      }
    } catch {
      this.setState({ error: true, loading: false });
    }
  }

  // Creates a Stripe Billing Portal session for updating the payment method
  // and redirects the browser to it.
  handleBillingPortal = async () => {
    this.setState({ loading: true });
    try {
      const res = await fetch(`${config.VITE_API_HOST}${path}/manage`, {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: window.location.href,
        }),
      });

      if (!res.ok) {
        throw Error();
      }

      const json = await res.json();

      if (json?.url) {
        window.location.href = json.url;
      } else {
        throw Error();
      }
    } catch {
      this.setState({ error: true, loading: false });
    }
  }

  handleDelete = async () => {
    this.setState({ loading: true });
    try {
      const res = await fetch(`${config.VITE_API_HOST}${path}`, {
        credentials: "include",
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        throw Error();
      }
    } catch {
      this.setState({ error: true });
    }
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
        <div className={styles.apiContainer} style={{ textAlign: "center" }}>
          {this.state.error ? <div>{strings.api_error}</div> : <div />}
          {this.state.openInvoices?.length ? (
            <Alert severity="warning">
              {strings.api_open_invoice}{" "}
              <a href={this.state.openInvoices?.[0]?.paymentLink}>
                {strings.api_invoice_link}
              </a>
            </Alert>
          ) : null}
          <h1>{strings.api_title}</h1>
          <h2>{strings.api_subtitle}</h2>
          {loading || this.state.loading || !Object.keys(strings).length ? (
            <LoadingOverlayUpper30 text="Loading API details..." />
          ) : (
            <div className={styles.body}>
              <div className={styles.buttonGroup}>
                {showLoginButton ? (
                  <Button
                    variant="outlined"
                    startIcon={<IconSteam />}
                    href={`${config.VITE_API_HOST}/login`}
                    style={{ margin: "5px 5px" }}
                    sx={{
                      backgroundColor: constants.primarySurfaceColor,
                      "&:hover": {
                        backgroundColor: constants.primarySurfaceColor,
                      },
                    }}
                  >
                    {strings.api_login}
                  </Button>
                ) : (
                  <div />
                )}
                {showGetKeyButton ? (
                    <Button
                    variant="contained"
                    style={{ margin: "5px 5px" }}
                    onClick={this.handleCheckout}
                  >
                    {strings.api_get_key}
                  </Button>
                ) : (
                  <span />
                )}
                <Button
                  href="//docs.opendota.com"
                  target="_blank"
                  style={{ margin: "5px 5px" }}
                >
                  {strings.api_docs}
                </Button>
              </div>
              {this.state.customer ? (
                <div>
                  {this.state.customer.api_key ? (
                    <div>
                      <h4>{strings.api_header_key}</h4>
                      <pre className={styles.keyContainer}>
                        {this.state.customer.api_key}
                      </pre>
                      <p>
                        {strings.api_key_usage.replace(
                          "$param",
                          "api_key=XXXX",
                        )}
                      </p>
                      <div style={{ overflow: "hidden" }}>
                        <a
                          href={`https://api.opendota.com/api/matches/271145478?api_key=${this.state.customer.api_key}`}
                        >
                          <pre className={styles.keyContainer}>
                            {`https://api.opendota.com/api/matches/271145478?api_key=${this.state.customer.api_key}`}
                          </pre>
                        </a>
                      </div>
                      <p>
                        {`${strings.api_billing_cycle.replace(
                          "$date",
                          new Date(
                            this.state.customer.current_period_end * 1000,
                          ).toLocaleDateString())}`}
                      </p>
                      <p>
                        {strings.api_support.replace(
                          "$email",
                          "api@opendota.com",
                        )}
                      </p>
                      <Button
                        variant="contained"
                        style={{ margin: "5px 5px" }}
                        onClick={this.handleDelete}
                      >
                        {strings.api_delete}
                      </Button>
                      <Button
                        variant="contained"
                        style={{ margin: "5px 5px" }}
                        onClick={this.handleBillingPortal}
                      >
                        {strings.api_update_billing}
                      </Button>
                    </div>
                  ) : (
                    <div />
                  )}
                  {this.state.usage ? (
                    <div>
                      <h4>{strings.api_header_usage}</h4>
                      <div className={styles.tableContainer}>
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
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ) : (
                <div />
              )}
              <h2 className={styles.tableTitle}>{strings.api_header_table}</h2>
              <div className={styles.tableContainer}>
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
                          .replace("price", String(premPrice))
                          .replace("$unit", String(premUnit))}
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
                          "$limit",
                          String(freeCallLimit),
                        )}
                      </td>
                      <td>{strings.api_details_call_limit_prem}</td>
                    </tr>
                    <tr>
                      <th>{strings.api_details_rate_limit}</th>
                      <td>
                        {strings.api_details_rate_limit_val.replace(
                          "$num",
                          String(freeRateLimit),
                        )}
                      </td>
                      <td>
                        {strings.api_details_rate_limit_val.replace(
                          "$num",
                          String(premRateLimit),
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>{strings.api_details_support}</th>
                      <td>{strings.api_details_support_free}</td>
                      <td>{strings.api_details_support_prem}</td>
                    </tr>
                    <tr style={{ height: "24px" }} />
                  </tbody>
                </table>
              </div>
              <div className={styles.detailsContainer}>
                <h3 className={styles.detailsTitle}>
                  {strings.api_header_details}
                </h3>
                <ul className={styles.list}>
                  <li>
                    {strings.api_charging.replace(
                      "$cost",
                      `$${premPrice / premUnit}`,
                    )}
                  </li>
                  <li>{strings.api_credit_required}</li>
                  <li>{strings.api_failure}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
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
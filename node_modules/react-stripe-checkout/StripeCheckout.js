import React from 'react';
import PropTypes from 'prop-types';

let scriptLoading = false;
let scriptLoaded = false;
let scriptDidError = false;

export default class ReactStripeCheckout extends React.Component {
  static defaultProps = {
    className: 'StripeCheckout',
    label: 'Pay With Card',
    locale: 'auto',
    ComponentClass: 'span',
    reconfigureOnUpdate: false,
    triggerEvent: 'onClick',
  }

  static propTypes = {
    // Opens / closes the checkout modal by value
    // WARNING: does not work on mobile due to browser security restrictions
    // NOTE: Must be set to false when receiving token to prevent modal from
    //       opening automatically after closing
    desktopShowModal: PropTypes.bool,

    triggerEvent: PropTypes.oneOf([
      'onClick',
      'onTouchTap',
      'onTouchStart',
    ]),

    // If included, will render the default blue button with label text.
    // (Requires including stripe-checkout.css or adding the .styl file
    // to your pipeline)
    label: PropTypes.string,

    // Custom styling for default button
    style: PropTypes.object,
    // Custom styling for <span> tag inside default button
    textStyle: PropTypes.object,

    // Prevents any events from opening the popup
    // Adds the disabled prop to the button and adjusts the styling as well
    disabled: PropTypes.bool,

    // Named component to wrap button (eg. div)
    ComponentClass: PropTypes.string,

    // Show a loading indicator
    showLoadingDialog: PropTypes.func,
    // Hide the loading indicator
    hideLoadingDialog: PropTypes.func,

    // Run this method when the scrupt fails to load. Will run if the internet
    // connection is offline when attemting to load the script.
    onScriptError: PropTypes.func,

    // Runs when the script tag is created, but before it is added to the DOM
    onScriptTagCreated: PropTypes.func,

    // By default, any time the React component is updated, it will call
    // StripeCheckout.configure, which may result in additional XHR calls to the
    // stripe API.  If you know the first configuration is all you need, you
    // can set this to false.  Subsequent updates will affect the StripeCheckout.open
    // (e.g. different prices)
    reconfigureOnUpdate: PropTypes.bool,

    // =====================================================
    // Required by stripe
    // see Stripe docs for more info:
    //   https://stripe.com/docs/checkout#integration-custom
    // =====================================================

    // Your publishable key (test or live).
    // can't use "key" as a prop in react, so have to change the keyname
    stripeKey: PropTypes.string.isRequired,

    // The callback to invoke when the Checkout process is complete.
    //   function(token)
    //     token is the token object created.
    //     token.id can be used to create a charge or customer.
    //     token.email contains the email address entered by the user.
    token: PropTypes.func.isRequired,

    // ==========================
    // Highly Recommended Options
    // ==========================

    // Name of the company or website.
    name: PropTypes.string,

    // A description of the product or service being purchased.
    description: PropTypes.string,

    // A relative URL pointing to a square image of your brand or product. The
    // recommended minimum size is 128x128px. The recommended image types are
    // .gif, .jpeg, and .png.
    image: PropTypes.string,

    // The amount (in cents) that's shown to the user. Note that you will still
    // have to explicitly include it when you create a charge using the API.
    amount: PropTypes.number,

    // Specify auto to display Checkout in the user's preferred language, if
    // available. English will be used by default.
    //
    // https://stripe.com/docs/checkout#supported-languages
    // for more info.
    locale: PropTypes.oneOf([
      'auto', // (Default) Automatically chosen by checkout
      'zh', // Simplified Chinese
      'da', // Danish
      'nl', // Dutch
      'en', // English
      'fr', // French
      'de', // German
      'it', // Italian
      'ja', // Japanease
      'no', // Norwegian
      'es', // Spanish
      'sv', // Swedish
    ]),

    // ==============
    // Optional Props
    // ==============

    // The currency of the amount (3-letter ISO code). The default is USD.
    currency: PropTypes.oneOf([
      'AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD', // eslint-disable-line comma-spacing
      'BDT','BGN','BIF','BMD','BND','BOB','BRL','BSD','BWP','BZD','CAD','CDF', // eslint-disable-line comma-spacing
      'CHF','CLP','CNY','COP','CRC','CVE','CZK','DJF','DKK','DOP','DZD','EEK', // eslint-disable-line comma-spacing
      'EGP','ETB','EUR','FJD','FKP','GBP','GEL','GIP','GMD','GNF','GTQ','GYD', // eslint-disable-line comma-spacing
      'HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','ISK','JMD','JPY','KES', // eslint-disable-line comma-spacing
      'KGS','KHR','KMF','KRW','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL', // eslint-disable-line comma-spacing
      'LVL','MAD','MDL','MGA','MKD','MNT','MOP','MRO','MUR','MVR','MWK','MXN', // eslint-disable-line comma-spacing
      'MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','PAB','PEN','PGK','PHP', // eslint-disable-line comma-spacing
      'PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SEK', // eslint-disable-line comma-spacing
      'SGD','SHP','SLL','SOS','SRD','STD','SVC','SZL','THB','TJS','TOP','TRY', // eslint-disable-line comma-spacing
      'TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VND','VUV','WST','XAF', // eslint-disable-line comma-spacing
      'XCD','XOF','XPF','YER','ZAR','ZMW',                                     // eslint-disable-line comma-spacing
    ]),

    // The label of the payment button in the Checkout form (e.g. “Subscribe”,
    // “Pay {{amount}}”, etc.). If you include {{amount}}, it will be replaced
    // by the provided amount. Otherwise, the amount will be appended to the
    // end of your label.
    panelLabel: PropTypes.string,

    // Specify whether Checkout should validate the billing ZIP code (true or
    // false)
    zipCode: PropTypes.bool,

    // Specify whether Checkout should collect the user's billing address
    // (true or false). The default is false.
    billingAddress: PropTypes.bool,

    // Specify whether Checkout should collect the user's shipping address
    // (true or false). The default is false.
    shippingAddress: PropTypes.bool,

    // Specify whether Checkout should validate the billing ZIP code (true or
    // false). The default is false.
    email: PropTypes.string,

    // Specify whether to include the option to "Remember Me" for future
    // purchases (true or false). The default is true.
    allowRememberMe: PropTypes.bool,

    // Specify whether to accept Bitcoin in Checkout. The default is false.
    bitcoin: PropTypes.bool,

    // Specify whether to accept Alipay ('auto', true, or false). The default
    // is false.
    alipay: PropTypes.oneOf(['auto', true, false]),

    // Specify if you need reusable access to the customer's Alipay account
    // (true or false). The default is false.
    alipayReusable: PropTypes.bool,

    // function() The callback to invoke when Checkout is opened (not supported
    // in IE6 and IE7).
    opened: PropTypes.func,

    // function() The callback to invoke when Checkout is closed (not supported
    // in IE6 and IE7).
    closed: PropTypes.func,
  }

  static _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      buttonActive: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (scriptLoaded) {
      return;
    }

    if (scriptLoading) {
      return;
    }

    scriptLoading = true;

    const script = document.createElement('script');
    if (typeof this.props.onScriptTagCreated === 'function') {
      this.props.onScriptTagCreated(script);
    }

    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = 1;

    this.loadPromise = (() => {
      let canceled = false;
      const promise = new Promise((resolve, reject) => {
        script.onload = () => {
          scriptLoaded = true;
          scriptLoading = false;
          resolve();
          this.onScriptLoaded();
        };
        script.onerror = (event) => {
          scriptDidError = true;
          scriptLoading = false;
          reject(event);
          this.onScriptError(event);
        };
      });
      const wrappedPromise = new Promise((accept, cancel) => {
        promise.then(() => canceled ? cancel({ isCanceled: true }) : accept()); // eslint-disable-line no-confusing-arrow
        promise.catch(error => canceled ? cancel({ isCanceled: true }) : cancel(error)); // eslint-disable-line no-confusing-arrow
      });

      return {
        promise: wrappedPromise,
        cancel() { canceled = true; },
      };
    })();

    this.loadPromise.promise
      .then(this.onScriptLoaded)
      .catch(this.onScriptError);

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (!scriptLoading) {
      this.updateStripeHandler();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.loadPromise) {
      this.loadPromise.cancel();
    }
    if (ReactStripeCheckout.stripeHandler && this.state.open) {
      ReactStripeCheckout.stripeHandler.close();
    }
  }

  onScriptLoaded = () => {
    if (!ReactStripeCheckout.stripeHandler) {
      ReactStripeCheckout.stripeHandler = StripeCheckout.configure({
        key: this.props.stripeKey,
      });
      if (this.hasPendingClick) {
        this.showStripeDialog();
      }
    }
  }

  onScriptError = (...args) => {
    this.hideLoadingDialog();
    if (this.props.onScriptError) {
      this.props.onScriptError.apply(this, args);
    }
  }

  onClosed = (...args) => {
    if (this._isMounted)
      this.setState({ open: false });
    if (this.props.closed) {
      this.props.closed.apply(this, args);
    }
  }

  onOpened = (...args) => {
    this.setState({ open: true });
    if (this.props.opened) {
      this.props.opened.apply(this, args);
    }
  }

  getConfig = () => [
    'token',
    'image',
    'name',
    'description',
    'amount',
    'locale',
    'currency',
    'panelLabel',
    'zipCode',
    'shippingAddress',
    'billingAddress',
    'email',
    'allowRememberMe',
    'bitcoin',
    'alipay',
    'alipayReusable',
  ].reduce((config, key) => Object.assign({}, config, this.props.hasOwnProperty(key) && {
    [key]: this.props[key],
  }), {
    opened: this.onOpened,
    closed: this.onClosed,
  });

  updateStripeHandler() {
    if (!ReactStripeCheckout.stripeHandler || this.props.reconfigureOnUpdate) {
      ReactStripeCheckout.stripeHandler = StripeCheckout.configure({
        key: this.props.stripeKey,
      });
    }
  }

  showLoadingDialog(...args) {
    if (this.props.showLoadingDialog) {
      this.props.showLoadingDialog.apply(this, args);
    }
  }

  hideLoadingDialog(...args) {
    if (this.props.hideLoadingDialog) {
      this.props.hideLoadingDialog.apply(this, args);
    }
  }

  showStripeDialog() {
    this.hideLoadingDialog();
    ReactStripeCheckout.stripeHandler.open(this.getConfig());
  }

  onClick = () => { // eslint-disable-line react/sort-comp
    if (this.props.disabled) {
      return;
    }

    if (scriptDidError) {
      try {
        throw new Error('Tried to call onClick, but StripeCheckout failed to load');
      } catch (x) {} // eslint-disable-line no-empty
    } else if (ReactStripeCheckout.stripeHandler) {
      this.showStripeDialog();
    } else {
      this.showLoadingDialog();
      this.hasPendingClick = true;
    }
  }

  handleOnMouseDown = () => {
    this.setState({
      buttonActive: true,
    });
  }

  handleOnMouseUp = () => {
    this.setState({
      buttonActive: false,
    });
  }

  renderDefaultStripeButton() {
    return (
      <button
        {...{
          [this.props.triggerEvent]: this.onClick,
        }}
        className={this.props.className}
        onMouseDown={this.handleOnMouseDown}
        onFocus={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseOut={this.handleOnMouseUp}
        onBlur={this.handleOnMouseUp}
        style={Object.assign({}, {
          overflow: 'hidden',
          display: 'inline-block',
          background: 'linear-gradient(#28a0e5,#015e94)',
          border: 0,
          padding: 1,
          textDecoration: 'none',
          borderRadius: 5,
          boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
          cursor: 'pointer',
          visibility: 'visible',
          userSelect: 'none',
        }, this.state.buttonActive && {
          background: '#005d93',
        }, this.props.style)}
      >
        <span
          style={Object.assign({}, {
            backgroundImage: 'linear-gradient(#7dc5ee,#008cdd 85%,#30a2e4)',
            fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
            fontSize: 14,
            position: 'relative',
            padding: '0 12px',
            display: 'block',
            height: 30,
            lineHeight: '30px',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
            textShadow: '0 -1px 0 rgba(0,0,0,0.25)',
            borderRadius: 4,
          }, this.state.buttonActive && {
            color: '#eee',
            boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.1)',
            backgroundImage: 'linear-gradient(#008cdd,#008cdd 85%,#239adf)',
          }, this.props.textStyle)}
        >
          {this.props.label}
        </span>
      </button>
    );
  }

  renderDisabledButton() {
    return (
      <button
        disabled
        style={{
          background: 'rgba(0,0,0,0.2)',
          overflow: 'hidden',
          display: 'inline-block',
          border: 0,
          padding: 1,
          textDecoration: 'none',
          borderRadius: 5,
          userSelect: 'none',
        }}
      >
        <span
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
            fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
            fontSize: 14,
            position: 'relative',
            padding: '0 12px',
            display: 'block',
            height: 30,
            lineHeight: '30px',
            borderRadius: 4,
            color: '#999',
            background: '#f8f9fa',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {this.props.label}
        </span>
      </button>
    );
  }

  render() {
    if (this.props.desktopShowModal === true && !this.state.open) {
      this.onClick();
    } else if (this.props.desktopShowModal === false && this.state.open) {
      ReactStripeCheckout.stripeHandler.close();
    }

    const { ComponentClass } = this.props;
    if (this.props.children) {
      return (
        <ComponentClass
          {...{
            [this.props.triggerEvent]: this.onClick,
          }}
          children={this.props.children}
        />
      );
    }
    return this.props.disabled
      ? this.renderDisabledButton()
      : this.renderDefaultStripeButton();
  }
}

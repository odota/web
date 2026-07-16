[![npm version](https://badge.fury.io/js/react-stripe-checkout.svg)](http://badge.fury.io/js/react-stripe-checkout)
[![Dependencies Status](https://david-dm.org/azmenak/react-stripe-checkout.svg)](https://david-dm.org/react-stripe-checkout)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/azmenak/react-stripe-checkout)

# React Stripe Checkout Component
Stripe's Checkout makes it almost too easy to take people's money.
This should make it even easier if you're building a react
application.

### Installation

Get started by installing with npm

    npm install react-stripe-checkout

Requires babel for compiling. If anyone is having issues with that,
open an issue and I'll do my best to better document the build process.

#### Changes in version 2.0

There used to be a separate `.styl` file and respective `.css` output. These have been removed and are now written directly in js.

### Requirements

`token` and `stripeKey` are the only *required* props,
everything else is optional as per the stripe docs. See [Checkout
Docs](https://stripe.com/docs/checkout#integration-custom). All props
go through simple validation and are passed to stripe checkout, they're
also documented in `StripeCheckout.js`.

```jsx
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="my_PUBLISHABLE_stripekey"
      />
    )
  }
}
```

This will give you a default *Stripe-style* button which looks like this:

![stripe checkout button](https://www.dropbox.com/s/tuwlslyrxubgc49/Screenshot%202016-08-05%2011.53.37.png?dl=1)

### Send all the props!

```jsx
<StripeCheckout
  name="Three Comma Co." // the pop-in header title
  description="Big Data Stuff" // the pop-in header subtitle
  image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
  ComponentClass="div"
  panelLabel="Give Money" // prepended to the amount in the bottom pay button
  amount={1000000} // cents
  currency="USD"
  stripeKey="..."
  locale="zh"
  email="info@vidhub.co"
  // Note: Enabling either address option will give the user the ability to
  // fill out both. Addresses are sent as a second parameter in the token callback.
  shippingAddress
  billingAddress={false}
  // Note: enabling both zipCode checks and billing or shipping address will
  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
  zipCode={false}
  alipay // accept Alipay (default false)
  bitcoin // accept Bitcoins (default false)
  allowRememberMe // "Remember Me" option (default true)
  token={this.onToken} // submit callback
  opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
  closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
  // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
  // you are using multiple stripe keys
  reconfigureOnUpdate={false}
  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
  // useful if you're using React-Tap-Event-Plugin
  triggerEvent="onTouchTap"
  >
  <button className="btn btn-primary">
    Use your own child component, which gets wrapped in whatever
    component you pass into as "ComponentClass" (defaults to span)
  </button>
</StripeCheckout>
```

### Other info
This was probably terribly written, I'll look at any PR coming my way.

### Resources 

* [Accept Stripe Payments with React and Express](https://www.robinwieruch.de/react-express-stripe-payment/)

### Contributors
- [@orhan-swe](https://github.com/orhan-swe) added updates to checkout after instantiation and fixed a loading error
- [@ekalvi](https://github.com/ekalvi) added multiple checkout buttons per page
- [@jstaffans](https://github.com/jstaffans) adding support for locale
- [@gabestein](https://github.com/gabestein) added billing and shipping options
- [@samcorcos](https://github.com/samcorcos) added testing

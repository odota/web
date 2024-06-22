import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import RaisedButton from 'material-ui/RaisedButton';
import { IconSteam } from '../Icons';

import { useStrings } from '../../hooks/useStrings.hook';
import config from '../../config';

const stripePromise = config.VITE_STRIPE_PUBLIC_KEY
  ? loadStripe(config.VITE_STRIPE_PUBLIC_KEY)
  : null;

const PageContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  & li {
    list-style-type: initial;
  }

  h1,
  h2 {
    text-align: center;
  }

  & h2 {
    font-size: 1.17em;
    margin: 0 5px;
  }
`;

const SubHeader = styled.div`
  width: 100%;
  background-image: url('/assets/images/carry-header.jpg');
  background-position: 50% 0px;
  margin: 20px 0;
  text-shadow: 1px 1px 1px #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Attribution = styled.p`
  font-size: 14px;
  margin-right: 10px;
  align-self: flex-end;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SubLeft = styled.div`
  margin: 8px;
`;

const SubRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const handleSubscribe = async (user) => {
  if (!stripePromise) {
    console.warn('Stripe integration is not configured, cannot subscribe');
    return;
  }
  const stripe = await stripePromise;
  const result = await stripe?.redirectToCheckout({
    lineItems: [
      {
        price:
          process.env.NODE_ENV === 'development'
            ? 'price_1LE6FHCHN72mG1oK4E4NdERI'
            : 'price_1LE5NqCHN72mG1oKg2Y9pqXb',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    successUrl: `${config.VITE_API_HOST}/subscribeSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.href,
    clientReferenceId: `${user.account_id}`,
  });
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
  if (result && result.error) {
    console.error(result.error.message);
  }
};

const Subscription = ({ user, isSubscriber }) => {
  const strings = useStrings();
  const handleManage = useCallback(async () => {
    const res = await fetch(`${config.VITE_API_HOST}/manageSub`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        return_url: window.location.href,
      }),
    });

    const session = await res.json();

    window.location.assign(session.url);
  }, [isSubscriber]);

  return (
    <PageContainer>
      <Helmet>
        <title>{strings.subscriptions_h1}</title>
        <meta name="description" content={strings.api_meta_description} />
      </Helmet>
      <SubHeader>
        <h1>{strings.subscriptions_h1}</h1>
        <h2>{strings.subscriptions_h2}</h2>
        <Attribution>
          Picture by {" "}
          <a href="http://entroz.deviantart.com/" target="_blank" rel="noreferrer">Eric Geusz</a>
        </Attribution>
      </SubHeader>
      <p>{strings.subscriptions_body1}</p>
      <SubContainer>
        <SubLeft>
          <h3>{strings.subscriptions_h3}</h3>
          <ul>
            <li>{strings.subscriptions_li1}</li>
            <li>{strings.subscriptions_li2}</li>
            <li>{strings.subscriptions_li3}</li>
            <li>{strings.subscriptions_li4}</li>
            <li>{strings.subscriptions_li5}</li>
          </ul>
        </SubLeft>
        <SubRight>
          {user && isSubscriber && (
            <>
              <h4>{strings.subscriptions_h4}</h4>
              <RaisedButton
                primary
                onClick={handleManage}
                label={strings.subscriptions_button_manage}
              />
            </>
          )}
          {user && !isSubscriber && (
            <RaisedButton
              primary
              onClick={() => handleSubscribe(user)}
              label={strings.subscriptions_button_subscribe}
            />
          )}
          {!user && (
            <RaisedButton
              primary
              href={`${config.VITE_API_HOST}/login`}
              label={strings.subscriptions_button_login}
              icon={<IconSteam />}
            />
          )}
        </SubRight>
      </SubContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.match.loading,
  error: state.app.match.error,
  user: state.app.metadata.data.user,
  isSubscriber: state.app.metadata.data.isSubscriber,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Subscription);

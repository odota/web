import React, { useCallback } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import { IconSteam } from "../Icons";
import { useStrings } from "../../hooks/useStrings.hook";
import config from "../../config";
import constants from "../constants";

const stripePromise = config.VITE_STRIPE_PUBLIC_KEY
  ? loadStripe(config.VITE_STRIPE_PUBLIC_KEY)
  : null;

const PageContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  font-family: ${constants.fontFamilyFuturistic};

  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.75rem;
  }

  & li {
    list-style-type: initial;
  }
`;

const SubHeader = styled.div`
  width: 100%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/assets/images/carry-header.jpg");
  background-position: 50% 0px;
  margin: 20px 0;
  text-shadow: 1px 1px 1px #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BannerTitle = styled.h1`
  margin: 48px 0 8px;
  font-family: ${constants.fontFamilySerif};
  font-size: 2.25rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-align: center;
  line-height: 1.6;

  @media only screen and (max-width: 768px) {
    font-size: 1.625rem;
  }
`;

const BannerDescription = styled.h2`
  margin: 0 0 24px;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Attribution = styled.p`
  font-size: 14px;
  margin-right: 10px;
  align-self: flex-end;
`;

const Paragraph = styled.p`
  line-height: 1.6;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubLeft = styled.div``;

const SubscriptionTitle = styled.h3`
  margin: 24px 0 8px;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.6;
`;

const SubRight = styled.div`
  a {
    width: fit-content;
  }
`;

const ThankYouTitle = styled.h4`
  font-family: ${constants.fontFamilySerif};
  font-weight: 400;
`;

const List = styled.ul`
  li {
    font-size: 0.875rem;
    line-height: 1.6;
  }
`;

const handleSubscribe = async (user: any) => {
  if (!stripePromise) {
    console.warn("Stripe integration is not configured, cannot subscribe");
    return;
  }
  const stripe = await stripePromise;
  const result = await stripe?.redirectToCheckout({
    lineItems: [
      {
        price:
          process.env.NODE_ENV === "development"
            ? "price_1LE6FHCHN72mG1oK4E4NdERI"
            : "price_1LE5NqCHN72mG1oKg2Y9pqXb",
        quantity: 1,
      },
    ],
    mode: "subscription",
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

const Subscription = ({
  user,
  isSubscriber,
}: {
  user: any;
  isSubscriber: boolean;
}) => {
  const strings = useStrings();
  const handleManage = useCallback(async () => {
    const res = await fetch(`${config.VITE_API_HOST}/manageSub`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
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
        <BannerTitle>{strings.subscriptions_h1}</BannerTitle>
        <BannerDescription>{strings.subscriptions_h2}</BannerDescription>
        <Attribution>
          Picture by{" "}
          <a
            href="http://entroz.deviantart.com/"
            target="_blank"
            rel="noreferrer"
          >
            Eric Geusz
          </a>
        </Attribution>
      </SubHeader>
      <Paragraph>{strings.subscriptions_body1}</Paragraph>
      <SubContainer>
        <SubLeft>
          <SubscriptionTitle>{strings.subscriptions_h3}</SubscriptionTitle>
          <List>
            <li>{strings.subscriptions_li1}</li>
            <li>{strings.subscriptions_li2}</li>
            <li>{strings.subscriptions_li3}</li>
            <li>{strings.subscriptions_li4}</li>
            <li>{strings.subscriptions_li5}</li>
          </List>
        </SubLeft>
        <SubRight>
          {user && isSubscriber && (
            <>
              <ThankYouTitle>{strings.subscriptions_h4}</ThankYouTitle>
              <Button variant="contained" onClick={handleManage}>
                {strings.subscriptions_button_manage}
              </Button>
            </>
          )}
          {user && !isSubscriber && (
            <Button variant="contained" onClick={() => handleSubscribe(user)}>
              {strings.subscriptions_button_subscribe}
            </Button>
          )}
          {!user && (
            <Button
              variant="outlined"
              href={`${config.VITE_API_HOST}/login`}
              startIcon={<IconSteam />}
            >
              {strings.subscriptions_button_login}
            </Button>
          )}
        </SubRight>
      </SubContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.app.match.loading,
  error: state.app.match.error,
  user: state.app.metadata.data.user,
  isSubscriber: state.app.metadata.data.isSubscriber,
});

export default connect(mapStateToProps)(Subscription);

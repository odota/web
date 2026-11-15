import React, { useCallback } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Button } from "../ui";
import { IconSteam } from "../Icons";
import { useStrings } from "../../hooks/useStrings.hook";
import config from "../../config";
import styles from "./Subscription.module.css";

const handleSubscribe = async (user: any) => {
  try {
    const res = await fetch(`${config.VITE_API_HOST}/subCheckout`, {
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
    }
  } catch (e) {
    console.error(e);
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
    const res = await fetch(`${config.VITE_API_HOST}/subManage`, {
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
    <div className={styles.pageContainer}>
      <Helmet>
        <title>{strings.subscriptions_h1}</title>
        <meta name="description" content={strings.api_meta_description} />
      </Helmet>
      <div className={styles.subHeader}>
        <h1 className={styles.bannerTitle}>{strings.subscriptions_h1}</h1>
        <h2 className={styles.bannerDescription}>
          {strings.subscriptions_h2}
        </h2>
        <p className={styles.attribution}>
          Picture by{" "}
          <a
            href="http://entroz.deviantart.com/"
            target="_blank"
            rel="noreferrer"
          >
            Eric Geusz
          </a>
        </p>
      </div>
      <p className={styles.paragraph}>{strings.subscriptions_body1}</p>
      <div className={styles.subContainer}>
        <div>
          <h3 className={styles.subscriptionTitle}>
            {strings.subscriptions_h3}
          </h3>
          <ul className={styles.list}>
            <li>{strings.subscriptions_li1}</li>
            <li>{strings.subscriptions_li2}</li>
            <li>{strings.subscriptions_li3}</li>
            <li>{strings.subscriptions_li4}</li>
            <li>{strings.subscriptions_li5}</li>
          </ul>
        </div>
        <div className={styles.subRight}>
          {user && isSubscriber && (
            <>
              <h4 className={styles.thankYouTitle}>
                {strings.subscriptions_h4}
              </h4>
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.app.match.loading,
  error: state.app.match.error,
  user: state.app.metadata.data.user,
  isSubscriber: state.app.metadata.data.isSubscriber,
});

export default connect(mapStateToProps)(Subscription);
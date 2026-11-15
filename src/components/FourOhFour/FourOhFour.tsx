import React from "react";
import Helmet from "react-helmet";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./FourOhFour.module.css";

const imageList = ["sad", "bawl", "charm-cry"];

const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

const FourOhFour = ({ msg }: { msg: string }) => {
  const strings = useStrings();
  return (
    <div className={styles.container}>
      <Helmet title={`${strings.error} 404`} />
      <img
        src={`/assets/images/${randomImage}.gif`}
        alt="A gif of a pixelized Dota hero crying"
      />
      <div className={styles.message}>{strings.error_four_oh_four_message}</div>
      <div className={styles.msg}>{msg}</div>
      <div className={styles.FourOhFour}>{strings.error} 404</div>
    </div>
  );
};

export default FourOhFour;

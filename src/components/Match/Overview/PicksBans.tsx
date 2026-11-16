import React from "react";
import { IMAGESIZE_ENUM } from "../../../utility";
import HeroImage from "./../../Visualizations/HeroImage";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./PicksBans.module.css";

const PicksBans = ({
  gameMode,
  data,
  style,
}: {
  gameMode?: number;
  data: any[];
  style?: any;
}) => {
  let firstBan = 0;
  const strings = useStrings();

  return (
    <div className={styles.root} style={style}>
      <div className={styles.picksBans}>
        {data.map((pb) => {
          // This records the first ban numbers pb.order
          firstBan === 0 &&
            gameMode === 22 &&
            !pb.is_pick &&
            (firstBan = pb.order);
          // This generates the order number associated with the pick or ban
          const orderNumber =
            gameMode === 22 && !pb.is_pick
              ? pb.order + 1 - firstBan
              : pb.order + 1;

          return (
            <section key={pb.order}>
              <HeroImage
                id={pb.hero_id}
                imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix}
                data-isPick={pb.is_pick}
              />
              {!pb.is_pick && <div className={styles.ban} />}
              <aside>
                {pb.is_pick ? strings.match_pick : strings.match_ban}{" "}
                <b>{orderNumber}</b>
              </aside>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PicksBans;

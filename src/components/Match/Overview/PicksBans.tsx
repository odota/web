import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { IMAGESIZE_ENUM } from "../../../utility";
import HeroImage from "./../../Visualizations/HeroImage";
import useStrings from "../../../hooks/useStrings.hook";

const Styled = styled.div`
  display: inline-block;
  color: ${constants.textColorSecondary};
  margin-top: -20px;

  .PicksBans {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 1px;

    & > section {
      position: relative;
      margin: 5px 5px 0px 0px;

      & > aside {
        font-size: 11px;
        text-transform: uppercase;
        text-align: center;
        margin-top: -5px;
        background-color: rgba(0, 0, 0, 0.8);
        line-height: 1.6;
      }
    }
  }

  img {
    position: relative;
    height: 29px;
    width: 100%;
    box-shadow: 0 0 5px ${constants.defaultPrimaryColor};
    margin-right: 0;
    z-index: 0;

    &[data-isPick="false"] {
      filter: grayscale(100%);
    }

    @media only screen and (max-width: 716px) {
      object-fit: cover;
    }
  }

  .ban {
    position: absolute;
    z-index: 1;
    left: -3px;
    right: -3px;
    top: 14px;
    border-top: 2px solid ${constants.colorDanger};
    transform: rotate(-28deg);

    @media only screen and (max-width: 716px) {
      transform: rotate(-34deg);
      top: 13px;
    }
  }
`;

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
    <Styled style={style}>
      <div className="PicksBans">
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
              {!pb.is_pick && <div className="ban" />}
              <aside>
                {pb.is_pick ? strings.match_pick : strings.match_ban}{" "}
                <b>{orderNumber}</b>
              </aside>
            </section>
          );
        })}
      </div>
    </Styled>
  );
};

export default PicksBans;

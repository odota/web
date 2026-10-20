import React from "react";
import { heroes } from "dotaconstants";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import styled from "styled-components";
import Heading from "../../Heading/Heading";
import { IconRadiant, IconDire } from "../../Icons";
import { getTeamName } from "../../../utility";
import constants from "../../constants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { buildDraft, DraftStep, DraftTiming, PickBan } from "./buildDraft";

const Styled = styled.div`
  max-width: 800px;
  margin: 0 auto;

  .draft-row:nth-of-type(odd) {
    background-color: ${constants.tableRowOddSurfaceColor};
  }

  .teams {
    display: flex;
    justify-content: space-between;
  }

  .nodata {
    display: flex;
    justify-content: center;
  }
`;

const PickBan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const Pick = styled(PickBan)`
  color: ${constants.colorGreen};
  svg {
    color: ${constants.colorGreen};
  }
`;

const Ban = styled(PickBan)`
  color: ${constants.colorDanger};
  svg {
    color: ${constants.colorDanger};
  }
`;

const DraftCell = styled.div`
  display: flex;
  width: fit-content;
  margin-left: ${(props: { radiant: boolean }) =>
    props.radiant ? "0" : "auto"};
  justify-content: ${(props: { radiant: boolean }) =>
    props.radiant ? "flex-start" : "flex-end"};

  .time-tracker {
    display: flex;
    flex-direction: column;
    align-items: ${(props: { radiant: boolean }) =>
      props.radiant ? "flex-start" : "flex-end"};
    justify-content: space-around;
    order: ${(props: { radiant: boolean }) => (props.radiant ? "1" : "-1")};
    padding: 8px;
  }

  .taken {
    font-size: 16px;
  }

  .left {
    font-size: 13px;
  }

  .extra-used {
    color: ${constants.colorDanger};
  }

  @media only screen and (max-width: 650px) {
    flex-direction: column;

    .time-tracker {
      order: 1;
    }
  }
`;

const HeroIcon = styled.div`
  position: relative;
  width: fit-content;

  img {
    width: 100px;
    &[data-ispick="false"] {
      filter: grayscale(100%);
    }
  }

  .ban {
    position: absolute;
    z-index: 1;
    left: -8px;
    right: -8px;
    top: 28px;
    border-top: 2px solid ${constants.colorDanger};
    transform: rotate(-28deg);

    @media only screen and (max-width: 716px) {
      transform: rotate(-34deg);
      top: 13px;
    }
  }
`;

const LeftArrow = styled(KeyboardArrowLeftIcon)`
  visibility: ${(props: { visible: string }) =>
    props.visible === "true" ? "visible" : "hidden"};
`;

const RightArrow = styled(KeyboardArrowRightIcon)`
  visibility: ${(props: { visible: string }) =>
    props.visible === "true" ? "visible" : "hidden"};
`;

const TimeTracker = ({ step }: { step: DraftStep }) => (
  <div className="time-tracker">
    {step.timeTaken !== undefined && (
      <span className="taken">
        <span className={step.extraTimeUsed ? "extra-used" : ""}>
          {step.timeTaken}s
        </span>{" "}
        used
      </span>
    )}
    {step.extraTime !== undefined && (
      <span className="left">
        {step.extraTime}s left
        {Boolean(step.extraTimeUsed) && (
          <span className="extra-used">{` (-${step.extraTimeUsed}s)`}</span>
        )}
      </span>
    )}
  </div>
);

const DraftHero = ({ step }: { step: DraftStep }) => {
  const hero = heroes[String(step.heroId) as keyof Heroes];
  return (
    <DraftCell radiant={step.isRadiant}>
      <TimeTracker step={step} />
      <HeroIcon>
        <img
          src={hero && config.VITE_IMAGE_CDN + hero.img}
          alt={hero ? hero.localized_name : ""}
          data-ispick={step.isPick}
        />
        {!step.isPick && <div className="ban" />}
      </HeroIcon>
    </DraftCell>
  );
};

const DraftRow = ({ step }: { step: DraftStep }) => {
  const Label = step.isPick ? Pick : Ban;
  return (
    <tr className={`${step.isRadiant ? "radiant" : "dire"} draft-row`}>
      <td style={{ paddingLeft: 0 }}>
        {step.isRadiant && <DraftHero step={step} />}
      </td>
      <td>
        <Label>
          <LeftArrow
            style={{ color: "inherit" }}
            visible={step.isRadiant ? "true" : "false"}
          />
          {step.isPick ? "Pick" : "Ban"} {step.order}
          <RightArrow
            style={{ color: "inherit" }}
            visible={step.isRadiant ? "false" : "true"}
          />
        </Label>
      </td>
      <td style={{ paddingRight: 0 }}>
        {!step.isRadiant && <DraftHero step={step} />}
      </td>
    </tr>
  );
};

const Draft = ({
  radiantTeam = {},
  direTeam = {},
  picksBans,
  draftTimings,
  sponsorURL,
  sponsorIcon,
}: {
  radiantTeam: any;
  direTeam: any;
  picksBans?: PickBan[] | null;
  draftTimings?: DraftTiming[] | null;
  sponsorURL?: string;
  sponsorIcon?: string;
}) => {
  const strings = useStrings();
  const steps = buildDraft(picksBans, draftTimings);

  return (
    <Styled>
      <section className="teams">
        <Heading
          title={`${getTeamName(radiantTeam, true)}`}
          buttonLabel={
            config.VITE_ENABLE_GOSUAI ? strings.gosu_default : undefined
          }
          buttonTo={`${sponsorURL}Draft`}
          buttonIcon={sponsorIcon}
          icon={<IconRadiant />}
        />
        <Heading
          title={`${getTeamName(direTeam, false)}`}
          icon={<IconDire />}
        />
      </section>
      <table>
        <tbody className="draft-table">
          {steps.map((step) => (
            <DraftRow key={step.order} step={step} />
          ))}
        </tbody>
      </table>
    </Styled>
  );
};

export default Draft;

import React from "react";
import { heroes } from "dotaconstants";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Heading from "../../Heading/Heading";
import { IconRadiant, IconDire } from "../../Icons";
import { getTeamName } from "../../../utility";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { buildDraft, DraftStep, DraftTiming, PickBan } from "./buildDraft";
import styles from "./Draft.module.css";

// time over this comes from the team's reserve time
const STEP_TIME = 30;

const TimeTracker = ({ step }: { step: DraftStep }) => (
  <div className={styles.timeTracker}>
    {step.timeTaken !== undefined && (
      <span className={styles.taken}>
        <span
          className={
            step.timeTaken > STEP_TIME ? `extra-used ${styles.extraUsed}` : ""
          }
        >
          {step.timeTaken}s
        </span>{" "}
        used
      </span>
    )}
  </div>
);

const DraftHero = ({ step }: { step: DraftStep }) => {
  const hero = heroes[String(step.heroId) as keyof Heroes];
  return (
    <div
      className={`${styles.draftCell} ${step.isRadiant ? styles.draftCellRadiant : styles.draftCellDire}`}
    >
      <TimeTracker step={step} />
      <div className={styles.heroIcon}>
        <img
          src={hero && config.VITE_IMAGE_CDN + hero.img}
          alt={hero ? hero.localized_name : ""}
          data-ispick={step.isPick}
        />
        {!step.isPick && <div className={styles.ban} />}
      </div>
    </div>
  );
};

const DraftRow = ({ step }: { step: DraftStep }) => (
  <tr
    className={`${step.isRadiant ? "radiant" : "dire"} draft-row ${styles.draftRow}`}
  >
    <td style={{ paddingLeft: 0 }}>
      {step.isRadiant && <DraftHero step={step} />}
    </td>
    <td>
      <span
        className={`${styles.pickBan} ${step.isPick ? styles.pick : styles.banLabel}`}
      >
        <KeyboardArrowLeftIcon
          style={{
            color: "inherit",
            visibility: step.isRadiant ? "visible" : "hidden",
          }}
        />
        {step.isPick ? "Pick" : "Ban"} {step.order}
        <KeyboardArrowRightIcon
          style={{
            color: "inherit",
            visibility: step.isRadiant ? "hidden" : "visible",
          }}
        />
      </span>
    </td>
    <td style={{ paddingRight: 0 }}>
      {!step.isRadiant && <DraftHero step={step} />}
    </td>
  </tr>
);

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
    <div className={styles.styled}>
      <section className={styles.teams}>
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
    </div>
  );
};

export default Draft;

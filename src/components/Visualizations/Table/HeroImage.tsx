import React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { Tooltip } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { player_colors as playerColors } from "dotaconstants";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SyncIcon from "@mui/icons-material/Sync";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StraightenIcon from "@mui/icons-material/Straighten";
import styled from "styled-components";
import { subTextStyle, IMAGESIZE_ENUM } from "../../../utility";
import TableLink from "../../Table/TableLink";
import {
  IconDice,
  IconCrystalBall,
  IconCheckCircle,
  IconContributor,
  IconBloodDrop,
  IconWand,
  IconBattle,
} from "../../Icons";
import constants from "../../constants";
import AttrStrength from "../../Icons/AttrStrength";
import AttrIntelligent from "../../Icons/AttrIntelligent";
import AttrAgility from "../../Icons/AttrAgility";
import AttrUniversal from "../../Icons/AttrUniversal";
import HeroImage from "../HeroImage";
import HeroFacet from "./HeroFacet";
import useStrings from "../../../hooks/useStrings.hook";
import HowToRegIcon from "@mui/icons-material/HowToReg";

// hero to use as background image in tooltip
const backgroundMapping = {
  str: "2", // Axe
  agi: "47", // Viper
  int: "10", // Morphling
  all: "91", // Io
};

const heroTooltipAccentMap = {
  str: {
    color: constants.colorAttributeStr,
    surface: "rgba(244, 67, 54, 0.12)",
    glow: "rgba(244, 67, 54, 0.35)",
  },
  agi: {
    color: constants.colorAttributeAgi,
    surface: "rgba(57, 212, 2, 0.12)",
    glow: "rgba(57, 212, 2, 0.35)",
  },
  int: {
    color: constants.colorAttributeInt,
    surface: "rgba(1, 169, 244, 0.12)",
    glow: "rgba(1, 169, 244, 0.35)",
  },
  all: {
    color: "#26e030",
    surface: "rgba(38, 224, 48, 0.12)",
    glow: "rgba(38, 224, 48, 0.35)",
  },
};

const formatTooltipNumber = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-";
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(1).replace(/\.0$/, "");
};

const Styled = styled.div`
  .hero-tooltip .__react_component_tooltip {
    opacity: 1 !important;
    padding: 0px !important;
    background-color: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .hero-tooltip .__react_component_tooltip::after {
    display: none !important;
  }

  .subTextContainer {
    position: relative;

    & svg {
      color: currentcolor !important;
      height: 13px !important;
      width: 13px !important;
      vertical-align: top;
      padding: 1px 0;
    }

    & section {
      margin-left: -2px;
      margin-right: 4px;
      display: inline-block;
    }
  }

  .textContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    width: 105px;
    text-align: left;

    & > span {
      position: relative;
      white-space: nowrap;

      & a {
        display: inline-block;
        width: 88%;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: sub;
      }
    }
  }

  .image {
    position: relative;
    height: 29px;
    box-shadow: 0 0 5px ${constants.defaultPrimaryColor};
  }

  .abandoned {
    position: absolute;
    bottom: 8px;
    height: 15px;

    &[data-hint] {
      &::before,
      &::after {
        left: 40%;
      }
    }
  }

  .abandoned img {
    width: 51px;
  }

  .parsed {
    position: relative;
    left: -14px;
    width: 2px;
    height: 29px;
    background-color: ${constants.primaryLinkColor};

    /* Material-ui icon */
    & svg {
      position: relative !important;
      left: -10px !important;
      fill: ${constants.primaryLinkColor} !important;
    }
  }

  .unparsed {
    position: relative;
    left: -24px;
    width: 2px;
    height: 29px;
    background-color: ${constants.colorMuted};

    /* Material-ui icon */
    & svg {
      position: relative !important;
      left: -10px !important;
      fill: transparent !important;
    }
  }

  .badge {
    display: inline-block;

    & svg {
      width: 10px !important;
      height: 10px !important;
      margin-right: 5px;
    }
  }

  .logo {
    display: inline-block;

    & svg {
      width: 14px !important;
      height: 14px !important;
      margin-right: 5px;
      -webkit-filter: drop-shadow(0 0 4px rgba(102, 187, 255, 1));
      filter: drop-shadow(0 0 4px rgba(102, 187, 255, 1));
    }
    width: 14px;
    height: 14px;
    margin-right: 2px;
    position: relative;
    top: 3px;
    right: 2px;
  }

  .registered {
    display: inline-block;

    & svg {
      width: 14px !important;
      height: 14px !important;
      margin-right: 5px;
    }
    color: ${constants.colorSuccess};
  }

  .imageContainer {
    position: relative;
    display: flex;
    justify-content: center;
    z-index: 1;
  }

  .playerSlot {
    width: 2px;
    height: 29px;
    position: absolute;
  }

  .golden {
    fill: ${constants.colorGolden} !important;
  }

  .party {
    position: absolute;
    overflow: hidden;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    width: 13px;
    height: 29px;
    left: -13px;

    & .group {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      &.group0 {
        background: #a73411;
      }
      &.group1 {
        background: #107e79;
      }
      &.group2 {
        background: #a71164;
      }
      &.group3 {
        background: #a76411;
      }

      & .numerals {
        color: rgba(255, 255, 255, 0.9);
        white-space: nowrap;
        font-weight: bold;
        transform: rotate(-90deg);
      }
    }
  }

  .hoverIcon {
    margin-left: 4px;
  }

  .hoverIcon:first-child {
    margin-left: 8px;
  }

  .guideContainer {
    margin: auto;
  }

  .guideIcon {
    max-width: 24px;
    max-height: 24px;
  }
`;

const attributeAccentMap = {
  str: heroTooltipAccentMap.str,
  agi: heroTooltipAccentMap.agi,
  int: heroTooltipAccentMap.int,
};

const HeroImageContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
`;

const HeroToolTip = styled.div`
  width: 278px;
  overflow: hidden;
  position: relative;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%);
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  .backdrop {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .backdrop::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 85% 18%, var(--tooltip-accent-soft) 0%, rgba(0, 0, 0, 0) 40%),
      linear-gradient(180deg, rgba(2, 6, 23, 0.15) 0%, rgba(2, 6, 23, 0.88) 100%);
  }

  .backdrop img {
    position: absolute;
    top: 24px;
    left: -44px;
    opacity: 0.22;
    filter: blur(9px);
    transform: scale(1.3);
  }

  .content {
    position: relative;
    z-index: 1;
  }

  .hero-top {
    display: flex;
    gap: 10px;
    padding: 10px 12px 8px;
  }

  .portrait {
    position: relative;
    width: 68px;
    min-width: 68px;
    height: 84px;
    overflow: hidden;
    border: 1px solid rgba(148, 163, 184, 0.14);
    background: rgba(2, 6, 23, 0.92);
    box-shadow: inset 0 0 36px rgba(2, 6, 23, 0.92);
  }

  .portrait::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 -22px 26px rgba(2, 6, 23, 0.96);
    pointer-events: none;
  }

  .portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(18%) brightness(0.88);
  }

  .portrait-attribute {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 22px;
    height: 22px;
    padding: 3px;
    background: rgba(15, 23, 42, 0.42);
    border-left: 1px solid rgba(255, 255, 255, 0.14);
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(3px);
  }

  .portrait-attribute svg {
    width: 100%;
    height: 100%;
    filter:
      drop-shadow(0 0 6px var(--tooltip-accent-glow))
      drop-shadow(0 0 2px rgba(255, 255, 255, 0.18));
  }

  .hero-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .hero-name {
    color: ${constants.primaryTextColor};
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    word-break: break-word;
  }

  .role-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 5px;
  }

  .role-tag {
    border: 1px solid rgba(148, 163, 184, 0.14);
    background: rgba(15, 23, 42, 0.82);
    color: rgba(255, 255, 255, 0.62);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 3px 6px;
    text-transform: uppercase;
  }

  .attribute-stack {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 6px;
  }

  .attribute-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 4px 7px;
    background: rgba(15, 23, 42, 0.76);
    border: 1px solid rgba(148, 163, 184, 0.08);
  }

  .attribute-row.primary {
    border-color: rgba(255, 255, 255, 0.06);
    border-left: 2px solid var(--tooltip-accent);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  }

  .attribute-meta {
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
  }

  .attribute-icon {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  .attribute-label {
    color: rgba(255, 255, 255, 0.58);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .attribute-value {
    display: flex;
    align-items: baseline;
    gap: 3px;
    white-space: nowrap;
  }

  .attribute-value strong {
    color: ${constants.primaryTextColor};
    font-size: 13px;
    font-weight: 700;
  }

  .attribute-row.primary .attribute-value strong {
    color: var(--tooltip-accent);
    text-shadow: 0 0 10px var(--tooltip-accent-glow);
  }

  .attribute-gain {
    color: rgba(255, 255, 255, 0.58);
    font-size: 8px;
    font-weight: 500;
  }

  .resource-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: rgba(148, 163, 184, 0.12);
  }

  .resource-card {
    padding: 7px 8px 8px;
    text-align: center;
    background: rgba(17, 24, 39, 0.96);
  }

  .resource-label {
    display: block;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.12em;
    margin-bottom: 2px;
    text-transform: uppercase;
  }

  .resource-value {
    font-size: 18px;
    font-weight: 800;
    line-height: 1;
  }

  .resource-card.health .resource-label,
  .resource-card.health .resource-value {
    color: ${constants.colorGreen};
  }

  .resource-card.mana .resource-label,
  .resource-card.mana .resource-value {
    color: ${constants.colorMana};
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: rgba(148, 163, 184, 0.12);
  }

  .stat-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 9px;
    background: rgba(11, 17, 32, 0.98);
  }

  .stat-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .stat-icon {
    width: 12px;
    height: 12px;
    color: rgba(255, 255, 255, 0.6);
    fill: rgba(255, 255, 255, 0.6);
    flex-shrink: 0;
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.58);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .stat-value {
    color: ${constants.primaryTextColor};
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

const expand: React.CSSProperties = {
  display: "flex",
  position: "relative",
  height: "100%",
  left: "-10px",
};

type TableHeroImageProps = {
  parsed?: number;
  image?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  registered?: string;
  subscriber?: boolean;
  contributor?: boolean;
  accountId?: number;
  playerSlot?: number;
  hideText?: boolean;
  party?: React.ReactNode;
  confirmed?: boolean;
  heroName?: string;
  randomed?: boolean;
  repicked?: boolean;
  predictedVictory?: boolean;
  leaverStatus?: number;
  strings: Strings;
  hero?: Hero;
  heroID?: string;
  facet?: number;
  showGuide?: boolean;
  guideUrl?: string;
  guideType?: string;
};

class TableHeroImage extends React.Component<
  TableHeroImageProps,
  { tooltipVisible: boolean }
> {
  state = { tooltipVisible: false };

  setTooltipVisibility = (value: boolean) => {
    this.setState({ tooltipVisible: value });
  };

  render() {
    const {
      parsed,
      image,
      registered,
      contributor,
      subscriber,
      title,
      subtitle,
      accountId,
      playerSlot,
      hideText,
      confirmed,
      party,
      heroName,
      heroID,
      facet,
      showGuide,
      guideUrl,
      guideType,
      randomed,
      repicked,
      predictedVictory,
      leaverStatus,
      strings,
      hero,
    } = this.props;
    const { tooltipVisible } = this.state;
    const primaryAttr = hero?.primary_attr as keyof typeof heroTooltipAccentMap;
    const primaryAccent =
      heroTooltipAccentMap[primaryAttr] || heroTooltipAccentMap.all;
    const PrimaryAttributeIcon =
      hero?.primary_attr === "str"
        ? AttrStrength
        : hero?.primary_attr === "agi"
          ? AttrAgility
          : hero?.primary_attr === "int"
            ? AttrIntelligent
            : AttrUniversal;
    const roleTags = [
      hero?.attack_type,
      ...(hero?.roles ? hero.roles.slice(0, 2) : []),
    ].filter(Boolean) as string[];
    const attributeRows = [
      {
        key: "str",
        label: "STR",
        Icon: AttrStrength,
        value: hero?.base_str,
        gain: hero?.str_gain,
        isPrimary: hero?.primary_attr === "str" || hero?.primary_attr === "all",
        accent: attributeAccentMap.str,
      },
      {
        key: "agi",
        label: "AGI",
        Icon: AttrAgility,
        value: hero?.base_agi,
        gain: hero?.agi_gain,
        isPrimary: hero?.primary_attr === "agi" || hero?.primary_attr === "all",
        accent: attributeAccentMap.agi,
      },
      {
        key: "int",
        label: "INT",
        Icon: AttrIntelligent,
        value: hero?.base_int,
        gain: hero?.int_gain,
        isPrimary: hero?.primary_attr === "int" || hero?.primary_attr === "all",
        accent: attributeAccentMap.int,
      },
    ];
    const stats = [
      {
        label: "Attack",
        Icon: IconBattle,
        value:
          hero?.base_attack_min !== undefined && hero?.base_attack_max !== undefined
            ? `${formatTooltipNumber(hero.base_attack_min)} - ${formatTooltipNumber(hero.base_attack_max)}`
            : "-",
      },
      {
        label: "Armor",
        Icon: ShieldOutlinedIcon,
        value: formatTooltipNumber(hero?.base_armor),
      },
      {
        label: "Range",
        Icon: StraightenIcon,
        value: formatTooltipNumber(hero?.attack_range),
      },
      {
        label: "Speed",
        Icon: DirectionsRunIcon,
        value: formatTooltipNumber(hero?.move_speed),
      },
    ];
    const tooltipStyle = {
      "--tooltip-accent": primaryAccent.color,
      "--tooltip-accent-soft": "rgba(102, 187, 255, 0.12)",
      "--tooltip-accent-glow": primaryAccent.glow,
    } as React.CSSProperties;

    const heroImageEventProps = {
      onMouseEnter: () => {
        this.setTooltipVisibility(true);
      },
      onMouseLeave: () => {
        this.setTooltipVisibility(false);
      },
    };

    return (
      <Styled style={expand}>
        <HeroImageContainer>
          {parsed !== undefined && (
            <div
              className={parsed ? "parsed" : "unparsed"}
              data-hint={parsed && strings.tooltip_parsed}
            >
              <DoneAllIcon />
            </div>
          )}
          {party && <div className="party">{party}</div>}
          {(heroID || image) && (
            <div className="imageContainer">
              {image ? (
                <img
                  src={image}
                  alt={heroName}
                  className="image"
                  data-tip={hero?.id === undefined && null}
                  data-for={heroName}
                  style={{ marginRight: facet ? "12px" : "7px" }}
                  {...heroImageEventProps}
                />
              ) : (
                <HeroImage
                  id={heroID}
                  className="image"
                  data-tip={hero?.id === undefined && null}
                  data-for={heroName !== undefined && heroName}
                  style={{ marginRight: facet ? "12px" : "7px" }}
                  heroImageEventProps={heroImageEventProps}
                />
              )}
              {leaverStatus !== undefined && leaverStatus > 1 && (
                <span
                  className="abandoned"
                  style={{ right: facet ? "12px" : "7px" }}
                  data-hint={
                    strings[`leaver_status_${leaverStatus}` as keyof Strings]
                  }
                  data-hint-position="top"
                >
                  <img src="/assets/images/dota2/disconnect_icon.png" alt="" />
                </span>
              )}
              <HeroFacet heroID={heroID} facet={facet} />
              {playerSlot !== undefined && (
                <div
                  className="playerSlot"
                  style={{
                    backgroundColor:
                      playerColors[
                        playerSlot as unknown as keyof typeof playerColors
                      ],
                    right: facet ? "12px" : "7px",
                  }}
                />
              )}
            </div>
          )}
          {!hideText && (
            <div className="textContainer">
              <span>
                {registered && !contributor && !subscriber && (
                  <div
                    className="registered"
                    data-hint={strings.tooltip_registered_user}
                    data-hint-position="top"
                  >
                    <HowToRegIcon />
                  </div>
                )}
                {subscriber && (
                  <div
                    className="logo"
                    data-hint={strings.app_subscriber}
                    data-hint-position="top"
                  >
                    <IconContributor dColor="#FFD700" oColor="#212121" />
                  </div>
                )}
                {contributor && (
                  <div
                    className="logo"
                    data-hint={strings.app_contributor}
                    data-hint-position="top"
                  >
                    <IconContributor dColor="#21be93" oColor="#212121" />
                  </div>
                )}
                {confirmed && (
                  <div
                    className="badge"
                    data-hint={`${strings.app_confirmed_as} ${title}`}
                    data-hint-position="top"
                  >
                    <IconCheckCircle className="golden" />
                  </div>
                )}
                {accountId ? (
                  <TableLink to={`/players/${accountId}`}>{title}</TableLink>
                ) : (
                  title
                )}
              </span>
              {subtitle && (
                <span style={subTextStyle} className="subTextContainer">
                  {subtitle}
                  <span>
                    {randomed && (
                      <span
                        className="hoverIcon"
                        data-hint={strings.general_randomed}
                        data-hint-position="top"
                      >
                        <IconDice fill="currentcolor" />
                      </span>
                    )}
                    {repicked && (
                      <span
                        className="hoverIcon"
                        data-hint={strings.general_repicked}
                        data-hint-position="top"
                      >
                        <SyncIcon />
                      </span>
                    )}
                    {predictedVictory && (
                      <Tooltip title={strings.general_predicted_victory}>
                        <span style={{ marginLeft: "4px" }}>
                          <IconCrystalBall fill="currentcolor" />
                        </span>
                      </Tooltip>
                    )}
                  </span>
                </span>
              )}
            </div>
          )}
          {tooltipVisible && (
            <div className="hero-tooltip">
              <ReactTooltip id={heroName} effect="solid" place="right">
                <HeroToolTip style={tooltipStyle}>
                  <div className="backdrop">
                    <HeroImage
                      id={
                        backgroundMapping[
                          hero?.primary_attr as keyof typeof backgroundMapping
                        ]
                      }
                      imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix}
                    />
                  </div>
                  <div className="content">
                    <div className="hero-top">
                      <div className="portrait">
                        <HeroImage
                          id={heroID}
                          imageSizeSuffix={IMAGESIZE_ENUM.VERT.suffix}
                        />
                        <div className="portrait-attribute">
                          <PrimaryAttributeIcon />
                        </div>
                      </div>
                      <div className="hero-main">
                        <div className="hero-name">
                          {hero?.localized_name || heroName}
                        </div>
                        {roleTags.length > 0 && (
                          <div className="role-tags">
                            {roleTags.map((tag) => (
                              <span className="role-tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="attribute-stack">
                          {attributeRows.map((attribute) => {
                            const AttributeIcon = attribute.Icon;
                            return (
                              <div
                                className={`attribute-row${attribute.isPrimary ? " primary" : ""}`}
                                key={attribute.key}
                                style={
                                  attribute.isPrimary
                                    ? ({
                                        backgroundColor: attribute.accent.surface,
                                        borderLeftColor: attribute.accent.color,
                                      } as React.CSSProperties)
                                    : undefined
                                }
                              >
                                <div className="attribute-meta">
                                  <AttributeIcon className="attribute-icon" />
                                  <span className="attribute-label">
                                    {attribute.label}
                                  </span>
                                </div>
                                <div className="attribute-value">
                                  <strong
                                    style={
                                      attribute.isPrimary
                                        ? ({
                                            color: attribute.accent.color,
                                            textShadow: `0 0 10px ${attribute.accent.glow}`,
                                          } as React.CSSProperties)
                                        : undefined
                                    }
                                  >
                                    {formatTooltipNumber(attribute.value)}
                                  </strong>
                                  <span className="attribute-gain">
                                    +{formatTooltipNumber(attribute.gain)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="resource-grid">
                      <div className="resource-card health">
                        <span className="resource-label">
                          Health
                        </span>
                        <span className="resource-value">
                          {Math.floor(hero?.base_health ?? 0)}
                        </span>
                      </div>
                      <div className="resource-card mana">
                        <span className="resource-label">
                          Mana
                        </span>
                        <span className="resource-value">
                          {Math.floor(hero?.base_mana ?? 0)}
                        </span>
                      </div>
                    </div>
                    <div className="stats-grid">
                      {stats.map((stat) => {
                        const StatIcon = stat.Icon;
                        return (
                        <div className="stat-card" key={stat.label}>
                          <div className="stat-meta">
                            <StatIcon className="stat-icon" />
                            <span className="stat-label">{stat.label}</span>
                          </div>
                          <span className="stat-value">{stat.value}</span>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </HeroToolTip>
              </ReactTooltip>
            </div>
          )}
        </HeroImageContainer>
      </Styled>
    );
  }
}

// If need party or estimated, just add new prop with default val = solo and change icons depending what needs
export const Mmr = ({ number }: { number: number }) => {
  const strings = useStrings();
  return (
    <span>
      <section data-hint={strings.th_solo_mmr} data-hint-position="bottom">
        <MilitaryTechIcon />
      </section>
      {number || strings.general_unknown}
    </span>
  );
};

export const CompetitiveRank = ({
  rankTier,
  computedMmr,
}: {
  rankTier: string;
  computedMmr?: number;
}) => {
  const strings = useStrings();
  return (
    <span className="rank">
      <section data-hint={strings.th_rank} data-hint-position="bottom">
        <MilitaryTechIcon />
      </section>
      {rankTier}
      {computedMmr ? ` (${Math.floor(computedMmr)})` : null}
    </span>
  );
};

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(TableHeroImage);

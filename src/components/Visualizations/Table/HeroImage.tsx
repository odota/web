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
import { subTextStyle, IMAGESIZE_ENUM } from "../../../utility";
import styles from "./HeroImage.module.css";
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

const attributeAccentMap = {
  str: heroTooltipAccentMap.str,
  agi: heroTooltipAccentMap.agi,
  int: heroTooltipAccentMap.int,
};

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
      ...(hero?.roles ? hero.roles.slice(0, 6) : []),
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
      <div className={styles.styled} style={expand}>
        <div className={styles.heroImageContainer}>
          {parsed !== undefined && (
            <div
              className={parsed ? styles.parsed : styles.unparsed}
              data-hint={parsed && strings.tooltip_parsed}
            >
              <DoneAllIcon />
            </div>
          )}
          {party && <div className={styles.party}>{party}</div>}
          {(heroID || image) && (
            <div className={`${styles.imageContainer} imageContainer`}>
              {image ? (
                <img
                  src={image}
                  alt={heroName}
                  className={styles.image}
                  data-tip={hero?.id === undefined && null}
                  data-for={heroName}
                  style={{ marginRight: facet ? "12px" : "7px" }}
                  {...heroImageEventProps}
                />
              ) : (
                <HeroImage
                  id={heroID}
                  className={styles.image}
                  data-tip={hero?.id === undefined && null}
                  data-for={heroName !== undefined && heroName}
                  style={{ marginRight: facet ? "12px" : "7px" }}
                  heroImageEventProps={heroImageEventProps}
                />
              )}
              {leaverStatus !== undefined && leaverStatus > 1 && (
                <span
                  className={styles.abandoned}
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
                  className={`${styles.playerSlot} playerSlot`}
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
            <div className={`${styles.textContainer} textContainer`}>
              <span>
                {registered && !contributor && !subscriber && (
                  <div
                    className={`${styles.registered} registered`}
                    data-hint={strings.tooltip_registered_user}
                    data-hint-position="top"
                  >
                    <HowToRegIcon />
                  </div>
                )}
                {subscriber && (
                  <div
                    className={styles.logo}
                    data-hint={strings.app_subscriber}
                    data-hint-position="top"
                  >
                    <IconContributor dColor="#FFD700" oColor="#212121" />
                  </div>
                )}
                {contributor && (
                  <div
                    className={`${styles.logo} contributor`}
                    data-hint={strings.app_contributor}
                    data-hint-position="top"
                  >
                    <IconContributor dColor="#21be93" oColor="#212121" />
                  </div>
                )}
                {confirmed && (
                  <div
                    className={`${styles.badge} badge`}
                    data-hint={`${strings.app_confirmed_as} ${title}`}
                    data-hint-position="top"
                  >
                    <IconCheckCircle className={styles.golden} />
                  </div>
                )}
                {accountId ? (
                  <TableLink to={`/players/${accountId}`}>
                    {title}
                  </TableLink>
                ) : (
                  title
                )}
              </span>
              {subtitle && (
                <span style={subTextStyle} className={styles.subTextContainer}>
                  {subtitle}
                  <span>
                    {randomed && (
                      <span
                        className={styles.hoverIcon}
                        data-hint={strings.general_randomed}
                        data-hint-position="top"
                      >
                        <IconDice fill="currentcolor" />
                      </span>
                    )}
                    {repicked && (
                      <span
                        className={styles.hoverIcon}
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
                <div className={styles.heroToolTip} style={tooltipStyle}>
                  <div className={styles.backdrop}>
                    <HeroImage
                      id={
                        backgroundMapping[
                          hero?.primary_attr as keyof typeof backgroundMapping
                        ]
                      }
                      imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix}
                    />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.heroTop}>
                      <div className={styles.portrait}>
                        <HeroImage
                          id={heroID}
                          imageSizeSuffix={IMAGESIZE_ENUM.VERT.suffix}
                        />
                        <div className={styles.portraitAttribute}>
                          <PrimaryAttributeIcon />
                        </div>
                      </div>
                      <div className={styles.heroMain}>
                        <div className={styles.heroName}>
                          {hero?.localized_name || heroName}
                        </div>
                        {roleTags.length > 0 && (
                          <div className={styles.roleTags}>
                            {roleTags.map((tag) => (
                              <span className={styles.roleTag} key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className={styles.attributeStack}>
                          {attributeRows.map((attribute) => {
                            const AttributeIcon = attribute.Icon;
                            return (
                              <div
                                className={`${styles.attributeRow}${attribute.isPrimary ? ` ${styles.primary}` : ""}`}
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
                                <div className={styles.attributeMeta}>
                                  <AttributeIcon className={styles.attributeIcon} />
                                  <span className={styles.attributeLabel}>
                                    {attribute.label}
                                  </span>
                                </div>
                                <div className={styles.attributeValue}>
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
                                  <span className={styles.attributeGain}>
                                    +{formatTooltipNumber(attribute.gain)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={styles.resourceGrid}>
                      <div className={`${styles.resourceCard} ${styles.health}`}>
                        <span className={styles.resourceLabel}>
                          Health
                        </span>
                        <span className={styles.resourceValue}>
                          {Math.floor(hero?.base_health ?? 0)}
                        </span>
                      </div>
                      <div className={`${styles.resourceCard} ${styles.mana}`}>
                        <span className={styles.resourceLabel}>
                          Mana
                        </span>
                        <span className={styles.resourceValue}>
                          {Math.floor(hero?.base_mana ?? 0)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.statsGrid}>
                      {stats.map((stat) => {
                        const StatIcon = stat.Icon;
                        return (
                        <div className={styles.statCard} key={stat.label}>
                          <div className={styles.statMeta}>
                            <StatIcon className={styles.statIcon} />
                            <span className={styles.statLabel}>{stat.label}</span>
                          </div>
                          <span className={styles.statValue}>{stat.value}</span>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ReactTooltip>
            </div>
          )}
        </div>
      </div>
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

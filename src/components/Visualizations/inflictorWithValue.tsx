import React from "react";
import ReactTooltip from "react-tooltip";
import { nanoid } from "nanoid";
import ItemTooltip from "../ItemTooltip/ItemTooltip";
import AbilityTooltip from "../AbilityTooltip/AbilityTooltip";
import config from "../../config";
import useStrings from "../../hooks/useStrings.hook";
import { useAbilities } from "../../hooks/useAbilities.hook";
import { ability_ids as abilityIds } from "dotaconstants";
import { items } from "dotaconstants";
import styles from "./inflictorWithValue.module.css";

const getInflictorImage = (inflictor: string) => {
  if (inflictor.includes("recipe")) {
    return "recipe";
  }
  return inflictor;
};

const customImageIcon = ["refresher_shard"];

type Props = {
  inflictor: string;
  value: keyof typeof items;
  type: string;
  ptooltip?: React.ReactNode;
  abilityId: keyof typeof abilityIds;
  strings: Strings;
  charges: number;
  abilities: Record<string, any>;
};

class InflictorWithValue extends React.Component<Props> {
  state = {
    showTooltip: false,
    imageError: false,
  };
  constructor(props: Props) {
    super(props);
  }
  setShowTooltip = () => {
    if (!this.state.showTooltip) {
      this.setState({ showTooltip: true });
    }
  };
  setImageError = (state: boolean) => {
    this.setState({ imageError: state });
  };

  render() {
    const { inflictor, value, type, ptooltip, abilityId, strings, charges } =
      this.props;

    const { imageError } = this.state;

    const resolvedInflictor = ((abilityId &&
      abilityIds &&
      abilityIds[abilityId]) ||
      String(inflictor)) as keyof typeof items;
    if (resolvedInflictor) {
      const abilities = this.props.abilities;
      const ability = abilities && abilities[resolvedInflictor];
      // const neutralAbility = neutralAbilities && neutralAbilities[resolvedInflictor];
      const item = items[resolvedInflictor];
      let image;
      let tooltip: string | React.ReactNode = strings.tooltip_autoattack_other;
      const ttId = nanoid();

      if (ability) {
        if (resolvedInflictor.includes("attribute_bonus")) {
          image = "/assets/images/stats.png";
        } else if (resolvedInflictor.includes("special_bonus")) {
          image = "/assets/images/dota2/talent_tree.svg";
        } else if (
          [
            "ability_lamp_use",
            "ability_pluck_famango",
            "twin_gate_portal_warp",
          ].includes(resolvedInflictor)
        ) {
          image = `/assets/images/dota2/abilities/${resolvedInflictor}.png`;
        } else {
          image = `${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/abilities/${resolvedInflictor}.png`;
        }
        tooltip = (
          <AbilityTooltip ability={ability} inflictor={resolvedInflictor} />
        );
      } else if (item) {
        if (customImageIcon.includes(resolvedInflictor)) {
          image = `/assets/images/dota2/${resolvedInflictor}.png`;
        } else {
          image = `${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/${getInflictorImage(resolvedInflictor)}.png`;
        }
        tooltip = (
          <ItemTooltip
            item={item}
            value={value}
            inflictor={resolvedInflictor}
          />
        );
      } else {
        image = "/assets/images/default_attack.png";
      }
      if (ptooltip) {
        tooltip = ptooltip;
      }

      const fallbackImage = "/assets/images/Dota2Logo.svg";

      return (
        <div className={styles.styledDiv}>
          <div
            className={`${styles.inflictorWithValue}${type && styles[type] ? ` ${styles[type]}` : ""}`}
            data-tip={tooltip && true}
            data-for={ttId}
            onMouseEnter={this.setShowTooltip}
          >
            {(!type ||
              type === "purchase" ||
              type === "backpack" ||
              type === "neutral") && (
              <img
                src={imageError ? fallbackImage : image}
                alt={imageError ? "Dota 2 Logo" : ""}
                height="27px"
                style={{
                  filter: imageError ? "grayscale(60%)" : undefined,
                }}
                width={ability || imageError ? "27px" : "37px"}
                onError={() => this.setImageError(true)}
              />
            )}
            {type === "buff" && (
              <div
                className={styles.buff}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
            )}
            {!type && <div className={styles.overlay}>{value}</div>}
            {type === "buff" && (
              <div className={styles.buffOverlay}>
                {Number(value) > 0 && value}
              </div>
            )}
            {charges && <div className={styles.chargeOverlay}>{charges}</div>}
            {type === "backpack" && (
              <div className={styles.backpackOverlay}>
                <span>{value}</span>
              </div>
            )}
            {tooltip && (
              <div className="tooltip">
                {this.state.showTooltip && (
                  <ReactTooltip id={ttId} effect="solid" place="left">
                    {tooltip}
                  </ReactTooltip>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

function withHooks(Component: any) {
  return (props: any) => {
    const strings = useStrings();
    const abilities = useAbilities();
    return <Component {...props} strings={strings} abilities={abilities} />;
  };
}

const InflictorWithValueAndHooks = withHooks(InflictorWithValue);

export default (
  inflictor?: string,
  value?: string,
  type?: string,
  ptooltip?: string,
  abilityId?: keyof typeof abilityIds,
  charges?: number,
) => {
  return (
    <InflictorWithValueAndHooks
      inflictor={inflictor}
      value={value}
      type={type}
      ptooltip={ptooltip}
      abilityId={abilityId}
      charges={charges}
    />
  );
};

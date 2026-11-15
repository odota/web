import React from "react";
import { styleValues } from "../../utility";
import config from "../../config";
import AbilityBehaviour from "../AbilityTooltip/AbilityBehaviour";
import { usePatchnotes } from "../../hooks/usePatchnotes.hook";
import { items } from "dotaconstants";
import styles from "./ItemTooltip.module.css";

// Get patchnotes from up to two last letter patches
function getRecentChanges(item?: keyof Items, patchnotes?: PatchNotes) {
  const changes: { patch: any; note: string }[] = [];
  if (!patchnotes) {
    return changes;
  }
  const patches = Object.keys(patchnotes);
  const latest = patches[patches.length - 1];
  const previous = patches[patches.length - 2];
  // Latest patch wasn't a major patch e.g. 7_35b, return more entries
  if (latest.length > 4) {
    patchnotes[previous].items?.[item!]?.forEach((note: string) =>
      changes.push({ patch: previous, note }),
    );
  }
  patchnotes[latest].items?.[item!]?.forEach((note: string) =>
    changes.push({ patch: latest, note }),
  );
  return changes;
}

const textHighlightColors = {
  use: "#95c07a",
  active: "#9f9fcf",
  passive: "#7e8c9d",
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Ability = (
  item: any,
  type: keyof typeof abilityType,
  title: string,
  description: string,
  hasNonPassive: boolean,
) => {
  const styleType: keyof typeof textHighlightColors =
    abilityType[type] || "passive";
  const highlightStyle = `font-weight:500;color:${textHighlightColors[styleType]};text-shadow:2px 2px 0 #00000090;`;
  return (
    <div className={styles.abilityComponent}>
      <div className={styles[styleType]}>
        <div className={styles.abilityHeader}>
          <span
            className={styles.abilityName}
          >{`${capitalizeFirstLetter(type)}: ${title}`}</span>
          <div>
            {item.mc && styleType !== "passive" && (
              <span className={styles.entry}>
                <img
                  className={styles.resourceIcon}
                  src="/assets/images/dota2/ability_manacost.png"
                  alt="Mana icon"
                />
                <span className="values">{item.mc}</span>
              </span>
            )}
            {item.hc && styleType !== "passive" && (
              <span className={styles.entry}>
                <img
                  className={styles.resourceIcon}
                  src="/assets/images/dota2/ability_healthcost.png"
                  alt="Health icon"
                />
                <span className="values">{item.hc}</span>
              </span>
            )}
            {item.cd &&
              ((!hasNonPassive && styleType === "passive") ||
                styleType !== "passive") && (
                <span className={styles.entry}>
                  <img
                    className={styles.resourceIcon}
                    src="/assets/images/dota2/ability_cooldown.png"
                    alt="Cooldown icon"
                  />
                  <span className="values">{item.cd}</span>
                </span>
              )}
          </div>
        </div>
        <div className={styles.content}>
          <div
            className="ability-text"
            ref={(el) => styleValues(el, highlightStyle)}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

const AttributeContainer = ({ stats = [] }: any) => (
  <div className={styles.attributes}>
    {stats?.map((attrib: any) => (
      <div key={attrib.key}>
        <div id="header" ref={(el) => styleValues(el)}>
          {attrib.display.replace("{value}", attrib.value)}
        </div>
      </div>
    ))}
  </div>
);

const EnhancementContainer = ({ enhancement }: any) => (
  <div className={styles.enhancement}>
    <div className={styles.enhancementHeader}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <hr />
        <span className={styles.enhancementTitle}>{`Enchantment`}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          id="enhancement-img"
          src={`${config.VITE_IMAGE_CDN}${enhancement.img}`}
          alt={enhancement.dname}
        />
        <span className={styles.enhancementName}>{enhancement.dname}</span>
      </div>
    </div>
    <AttributeContainer stats={itemStats(enhancement)[0]} />
  </div>
);

// How each type should be styled
const abilityType: Record<string, keyof typeof textHighlightColors> = {
  active: "active",
  toggle: "active",
  passive: "passive",
  upgrade: "passive",
  use: "use",
};

const itemStats = (item: any) => {
  const upperCaseStats: string[] = [];
  const stats = item?.attrib
    .filter((a: any) => a.hasOwnProperty("display"))
    .filter((a: any) => {
      if (!/[a-z]/.test(a.display.replace("{value}", ""))) {
        upperCaseStats.push(a);
        return false;
      }
      return true;
    });
  return [stats, upperCaseStats];
};

const ItemTooltip = ({
  item,
  inflictor,
  value,
}: {
  item: Items["blink"] & any;
  inflictor?: keyof Items;
  value?: keyof Items;
}) => {
  const patchnotes = usePatchnotes();
  const recentChanges = getRecentChanges(inflictor, patchnotes);
  const enhancement = items[value!] || null;
  const [stats, upperCaseStats] = itemStats(item);
  const abilities = item.abilities || [];
  const hasNonPassive = abilities.some((a: { type: string }) =>
    ["active", "use"].includes(a.type),
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div
          className={`${styles.headerContent} ${styles[`neutral_tier_bg_${item.tier}`] || ""}`}
        >
          <img
            id="item-img"
            src={`${config.VITE_IMAGE_CDN}${item.img}`}
            alt={item.dname}
          />
          <div className={styles.headerText}>
            <div>{item.dname}</div>
            {item.tier ? (
              <div className={styles.neutralHeader}>
                <span className={styles[`neutral_tier_${item.tier}`]}>
                  {`Tier ${item.tier} `}
                </span>
                <span>Artifact</span>
              </div>
            ) : (
              <div id="gold">
                <img
                  src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
                  alt="Gold"
                />
                {item.cost}
              </div>
            )}
          </div>
        </div>
      </div>
      {(item.behavior ||
        item.dmg_type ||
        item.bkbpierce ||
        item.dispellable) && (
        <div>
          <AbilityBehaviour ability={item} />
          <hr />
        </div>
      )}
      {stats && stats.length > 0 && <AttributeContainer stats={stats} />}
      {abilities.map(
        ({
          type,
          title,
          description,
        }: {
          type: keyof typeof abilityType;
          title: string;
          description: string;
        }) => Ability(item, type, title, description, hasNonPassive),
      )}
      {enhancement && <EnhancementContainer enhancement={enhancement} />}
      {item.hint?.map((hint: React.ReactNode) => (
        <div className={styles.hint}>{hint}</div>
      ))}
      {upperCaseStats.length > 0 && (
        <AttributeContainer stats={upperCaseStats} />
      )}
      {item.lore && <div className={styles.lore}>{item.lore}</div>}
      {recentChanges.length > 0 && (
        <div className={styles.gameplayChanges}>
          {recentChanges.map(({ patch, note }) => (
            <div className={styles.gameplayChange}>
              <span className={styles.patch}>{`${patch.replace("_", ".")}:`}</span>
              <span className={styles.note}>{note}</span>
            </div>
          ))}
        </div>
      )}
      {item.components && (
        <div className={styles.components}>
          <div id="header">Components:</div>
          {item.components
            .concat(
              (items[`recipe_${inflictor}` as keyof typeof items] && [
                `recipe_${inflictor}`,
              ]) ||
                [],
            )
            .filter(Boolean)
            .map(
              (component: keyof typeof items) =>
                items[component] && (
                  <div className={styles.component}>
                    <img
                      src={`${config.VITE_IMAGE_CDN}${items[component].img}`}
                      alt=""
                    />
                    <div id="cost">{items[component].cost}</div>
                  </div>
                ),
            )}
        </div>
      )}
    </div>
  );
};

export default ItemTooltip;
